import { h } from 'preact';
import { Spin } from 'antd';

import LoadingOutlinedIcon from './loading-outlined-icon';

const SpinContainer = ({ children, fetchingData }) => (
  <Spin
    spinning={fetchingData}
    indicator={LoadingOutlinedIcon}
    delay={700}
    size="large"
  >
    {children}
  </Spin>
);

export default SpinContainer;
