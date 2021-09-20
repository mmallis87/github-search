/* eslint-disable no-undef */
import { h } from 'preact';
import { mount } from 'enzyme';
import MessageCenter from './message-center';

describe('<MessageCenter />', () => {
  it('should reflect MessageCenter initial state', () => {
    const wrapper = mount(<MessageCenter />);

    expect(wrapper.text()).toBe('');
  });

  it('should show an error message in the MessageCenter', () => {
    const errorMessage = 'Fatal Error!';
    const wrapper = mount(<MessageCenter errorMessage={errorMessage} />);

    expect(wrapper.text()).toContain(errorMessage);
  });
});
