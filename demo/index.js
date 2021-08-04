import React from 'react';
import ReactDom from 'react-dom';
import request from '../lib/src/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    request.interceptors.request.use(this.addLoginFix);
    request.interceptors.response.use(this.responseInterceptor);
  }
  addLoginFix(url, options) {
    console.log('url:', url);
    return {
      url: url + '/login',
      options: options,
    };
  }

  responseInterceptor(res, options) {
    console.log('res', res);
    console.log('options:', options);
  }

  componentDidMount = () => {
    request.get('/v1', { suffix: '/asd' }).then((res) => {
      console.log('res', res);
    });
  };

  render() {
    return <div>helloaaa</div>;
  }
}
ReactDom.render(<App />, document.getElementById('root'));
