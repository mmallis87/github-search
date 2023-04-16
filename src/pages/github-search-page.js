import React from 'preact/compat';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { Input, Pagination } from 'antd';
import 'antd/dist/antd.css';
import debounce from 'lodash.debounce';

import {
  DEFAULT_SEARCH_QUERY,
  NO_BIO,
  SEARCH_QUERY_DEBOUNCE,
  UNKNOWN_USER,
} from '../util/consts';
import {
  lastThreeCommits,
  lastFork,
  ownerBio,
  hisBio,
} from '../util/templates';
import {
  listFormatPolyfill,
  toggleRepoDetailsVisibleEx,
  twoLevelsUniqFlatMap,
} from '../util/helpers';

import {
  getLastRepoFork,
  getRepoCommits,
  getRepos,
  getUser,
} from '../services/github-rest';
import SpinContainer from '../components/spinner/spin-container';
import MessageCenter from '../components/message/message-center';
import GithubRepoTable from '../components/table/github-repo-table';
import '../style/index.css';

const GithubSearchPage = () => {
  const [fetchingData, setFetchingData] = useState(false);
  const [repos, setRepos] = useState({ total_count: 0 });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');
  const [repoDetails, setRepoDetails] = useState({});
  const [repoDetailsVisible, setRepoDetailsVisible] = useState({});
  let [searchQuery, setSearchQuery] = useState('');
  setSearchQuery = debounce(setSearchQuery, SEARCH_QUERY_DEBOUNCE);

  const toggleRepoDetailsVisible = toggleRepoDetailsVisibleEx(
    setRepoDetailsVisible,
  );

  const handlePaginationChange = useCallback(
    (newPage, newPerPage) => {
      setPage(newPage);
      setPerPage(newPerPage);
    },
    [setPage, setPerPage],
  );

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const displayDetails = useCallback(
    async (repo) => {
      setFetchingData(true);
      setRepoDetails([]);
      setErrorMessage('');
      try {
        const [commits, lastRepoFork, ownerUser] = await Promise.all([
          getRepoCommits(repo.commits_url),
          getLastRepoFork(repo.forks_url),
          getUser(repo.owner.url),
        ]);
        const { owner } = lastRepoFork;
        const { bio } = ownerUser;

        const formattedCommitUsers = listFormatPolyfill(
          twoLevelsUniqFlatMap(commits, 'author', 'login', UNKNOWN_USER),
        );
        const formattedBio = bio ? hisBio(bio) : NO_BIO;
        const repoDetailsMessages = [
          lastThreeCommits(formattedCommitUsers),
          lastFork(owner),
          ownerBio(formattedBio),
        ];

        setRepoDetails((oldRepoDetails) => {
          const newRepoDetails = {
            ...oldRepoDetails,
          };
          newRepoDetails[repo.id] = repoDetailsMessages;
          return newRepoDetails;
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
      toggleRepoDetailsVisible(repo.id, true);
      setFetchingData(false);
    },
    [setFetchingData, setRepoDetails, setErrorMessage],
  );

  useEffect(async () => {
    setErrorMessage('');
    setFetchingData(true);
    window.scrollTo(0, 0);
    try {
      if (!searchQuery) {
        searchQuery = DEFAULT_SEARCH_QUERY;
      }
      const newRepos = await getRepos(searchQuery, page, perPage);
      setRepos(newRepos);
    } catch (error) {
      setRepos((oldRepos) => ({
        ...oldRepos,
        items: [],
      }));
      setErrorMessage(error.message);
    }

    setFetchingData(false);
  }, [searchQuery, page, perPage]);

  return (
    <div className="container">
      <SpinContainer fetchingData={fetchingData}>
        {/* Sticky error messages center in the top of the page */}
        <div className={errorMessage ? 'box' : ''}>
          <MessageCenter errorMessage={errorMessage} />
        </div>

        {/* Search query input box */}
        <div className="box">
          <Input
            placeholder={DEFAULT_SEARCH_QUERY}
            onChange={handleQueryChange}
          />
        </div>

        {/* Result Set table */}
        <div className="box">
          <GithubRepoTable
            repoDetails={repoDetails}
            displayDetails={displayDetails}
            repoDetailsVisible={repoDetailsVisible}
            toggleRepoDetailsVisible={toggleRepoDetailsVisible}
            dataSource={repos.items}
          />
        </div>

        {/* Pagination section: previous, next, jump to and page size */}
        <div className="box">
          <Pagination
            total={repos.total_count}
            showSizeChanger
            showQuickJumper
            current={page}
            showTotal={(total) => `Total ${total} repos`}
            onChange={handlePaginationChange}
          />
        </div>
      </SpinContainer>
    </div>
  );
};

export default GithubSearchPage;
