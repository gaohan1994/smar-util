import React from 'react';
import ReactDom from 'react-dom';
import request from '../lib/src/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    // request.interceptors.request.use(this.addLoginFix);
    // request.interceptors.response.use(this.responseInterceptor);
  }
  addLoginFix(url, options) {
    console.log('url:', url);
    return {
      url: '',
      options: options,
    };
  }

  responseInterceptor(res, options) {
    console.log('res', res);
    console.log('options:', options);

    return res;
  }

  requestOnError(error) {
    console.log('error', error.type);
  }

  componentDidMount = () => {
    request
      .get('https://huibaifen.rup-china.com/index/meetingany/getButtonImg', {
        data: {},
        headers: {
          unionid: 'oZL5w1qyW4cN2i8h0ElLClyPBkrg',
          withCredentials: true,
        },
        timeout: 1,
        onError: this.requestOnError,
      })
      .then((res) => {
        console.log('res', res);
      });
  };

  render() {
    return <div>helloaaa</div>;
  }
}
ReactDom.render(<App />, document.getElementById('root'));
