/* eslint-disable no-undef */
import { h } from 'preact';
import { mount } from 'enzyme';
import GithubRepoDetails from './github-repo-detail';

const repo = { id: 1 };
const repoDetailsVisible = {
  '1': true,
};
const repoDetails = {
  '1': ['message1', 'message2'],
};

describe('<GithubRepoDetails />', () => {
  it('should display a drawer with the following details:\nmessage1\nmessage2\n', () => {
    const wrapper = mount(
      <GithubRepoDetails
        repo={repo}
        repoDetailsVisible={repoDetailsVisible}
        repoDetails={repoDetails}
      />,
    );
    const drawer = wrapper.find('Drawer');

    expect(drawer.props().visible).toBe(true);
    expect(wrapper.text()).toContain('message1');
    expect(wrapper.text()).toContain('message2');
  });

  it('should not display the details', () => {
    repoDetailsVisible[1] = false;
    const wrapper = mount(
      <GithubRepoDetails
        repo={repo}
        repoDetailsVisible={repoDetailsVisible}
        repoDetails={repoDetails}
      />,
    );
    const drawer = wrapper.find('Drawer');

    expect(drawer.props().visible).toBe(false);
  });
});
