import {
  GITHUB_COMMITS_DEFAULT_DATASET_SIZE,
  GITHUB_SEARCH_URL,
} from '../util/consts';
import http from './http';

const getRepos = (searchQuery, page, perPage) => {
  return http.get(
    `${GITHUB_SEARCH_URL}?q=${searchQuery}&sort=stars&ord=desc&page=${page}&per_page=${perPage}`,
  );
};

const getRepoCommits = (commitsUrl, commitsDataSetSize) => {
  const perPage =
    typeof commitsDataSetSize === 'number'
      ? commitsDataSetSize
      : GITHUB_COMMITS_DEFAULT_DATASET_SIZE;

  return http.get(
    `${commitsUrl.replace('{/sha}', '')}?ord=desc&per_page=${perPage}`,
  );
};

const getLastRepoFork = async (forksUrl) => {
  const forksList = await http.take(`${forksUrl}?ord=desc`, 1);
  return Promise.resolve(forksList[0]);
};

const getUser = (userUrl) => {
  return http.get(userUrl);
};

export { getRepos, getRepoCommits, getLastRepoFork, getUser };
