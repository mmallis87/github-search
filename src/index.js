import App from './components/app';

if (process.env.NODE_ENV === 'development') {
  // Note: putting an "import" statement inside an "if" block is forbidden
  // eslint-disable-next-line global-require
  require('preact/debug');
}

export default App;
