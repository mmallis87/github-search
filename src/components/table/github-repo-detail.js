import { h } from 'preact';
import React from 'preact/compat';
import { Drawer } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const GithubRepoDetails = ({
  repo,
  repoDetails,
  displayDetails,
  repoDetailsVisible,
  toggleRepoDetailsVisible,
}) => {
  const repoId = repo.id;
  const visible = repoDetailsVisible[repoId] || false;
  const repoDetailsMessages = repoDetails[repoId] || [];

  const displayRepoDetails = () => {
    displayDetails(repo);
  };

  const hideRepoDetails = () => {
    toggleRepoDetailsVisible(repoId, false);
  };

  return (
    <div className="site-drawer-render-in-current-wrapper">
      <div
        className="ant-dropdown-link"
        role="link"
        tabIndex={0}
        onClick={displayRepoDetails}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            displayRepoDetails();
          }
        }}
      >
        {'Details '}
        <DownOutlined />
        <Drawer
          width={600}
          placement="right"
          closable={false}
          getContainer={false}
          className="drawer"
          visible={visible}
          onBlur={hideRepoDetails}
          onClose={hideRepoDetails}
        >
          {repoDetailsMessages.map((repoDetailsMessage, i) => (
            <p key={`key${i * i}`}>{repoDetailsMessage}</p>
          ))}
        </Drawer>
      </div>
    </div>
  );
};

export default GithubRepoDetails;
