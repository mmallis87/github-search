/* eslint-disable no-undef */
import { h } from 'preact';
import { mount } from 'enzyme';
import GithubRepoTable from './github-repo-table';

const repoDetailsVisible = {
  '1': true,
  '2': false,
};
const repoDetails = {
  '1': ['message1', 'message2'],
};
const dataSource = [
  {
    id: 1,
    name: 'spark',
    full_name: 'apache/spark',
    stargazers_count: 100000,
    owner: { login: 'apache' },
  },
  {
    id: 2,
    name: 'spark-csv',
    full_name: 'databricks/spark-csv',
    stargazers_count: 10000,
    owner: { login: 'databricks' },
  },
];

describe('<GithubRepoTable />', () => {
  it('should reflect empty GithubRepoTable state', () => {
    const wrapper = mount(
      <GithubRepoTable
        repoDetailsVisible={repoDetailsVisible}
        repoDetails={repoDetails}
      />,
    );
    const bodyRow = wrapper.find('tbody').find('tr');
    expect(bodyRow).toHaveLength(0);
  });

  it('should display a GithubRepoTable with 2 rows', () => {
    const wrapper = mount(
      <GithubRepoTable
        dataSource={dataSource}
        repoDetailsVisible={repoDetailsVisible}
        repoDetails={repoDetails}
      />,
    );
    const bodyRow = wrapper.find('tbody').find('tr');
    expect(bodyRow).toHaveLength(2);

    expect(bodyRow.at(0).find('td').get(0).props.children).toBe('spark');
    expect(bodyRow.at(1).find('td').get(0).props.children).toBe('spark-csv');
  });
});
