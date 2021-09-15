import React from 'react';
import ReactDom from 'react-dom';
import { request, quickSort } from '../dist/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    request.interceptors.request.use(this.addLoginFix);
    request.interceptors.response.use(this.responseInterceptor);
  }
  addLoginFix(url, options) {
    // console.log('url:', url);
    return {
      url: '',
      options: options,
    };
  }

  responseInterceptor(res, options) {
    // console.log('res', res);
    // console.log('options:', options);

    return res;
  }

  requestOnError(error) {
    console.log('error', error.type);
  }

  componentDidMount = () => {
    // request
    //   .get('http://101.132.24.127:9090/api/getimmortal', {
    //     onError: this.requestOnError,
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('data', data);
    //   });
  };

  render() {
    return <div>helloaaa</div>;
  }
}
ReactDom.render(<App />, document.getElementById('root'));
