/* eslint-disable react/display-name */
import { h } from 'preact';
import React from 'preact/compat';

import Table from './table';

import GithubRepoDetails from './github-repo-detail';

const GithubRepoTable = ({
  dataSource,
  repoDetails,
  displayDetails,
  repoDetailsVisible,
  toggleRepoDetailsVisible,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value) => value,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: ({ login }) => login,
    },
    {
      title: 'Stars',
      dataIndex: 'stargazers_count',
      key: 'stargazers_count',
      render: (value) => value,
    },
    {
      title: 'Link',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (fullName) => (
        <a
          href={`https://github.com/${fullName}`}
          target="_blank"
          rel="noreferrer"
        >
          {fullName}
        </a>
      ),
    },
    {
      title: 'Details',
      key: 'details',
      render: (_, repo) => (
        <GithubRepoDetails
          repo={repo}
          repoDetails={repoDetails}
          displayDetails={displayDetails}
          repoDetailsVisible={repoDetailsVisible}
          toggleRepoDetailsVisible={toggleRepoDetailsVisible}
        />
      ),
    },
  ];
  columns.forEach((column) => {
    column.align = 'left';
  });

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={({ id }) => id}
      pagination={false}
      bordered
    />
  );
};

export default GithubRepoTable;
