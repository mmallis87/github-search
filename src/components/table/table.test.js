/* eslint-disable no-undef */
import { h } from 'preact';
import { mount } from 'enzyme';
import Table from './table';

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
];

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

describe('<Table />', () => {
  it('should reflect empty Table state', () => {
    const wrapper = mount(<Table />);
    const bodyRow = wrapper.find('tbody').find('tr');
    expect(bodyRow).toHaveLength(0);
  });

  it('should display a Table with 3 columns', () => {
    const wrapper = mount(<Table dataSource={dataSource} columns={columns} />);
    const bodyRow = wrapper.find('tbody').find('tr');
    expect(bodyRow).toHaveLength(2);

    expect(bodyRow.at(0).find('td')).toHaveLength(3);
    expect(bodyRow.at(1).find('td')).toHaveLength(3);
  });
});
