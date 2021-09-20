import React from 'react';
import ReactDom from 'react-dom';
import { request, debounce, throttle } from '../dist/index';
import './index.css';

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

  scrollCallback(event) {
    console.log('event', event);
    console.log('hello');
  }

  componentDidMount = () => {
    document.addEventListener(
      'scroll',
      throttle(this.scrollCallback, 1000)
      // this.scrollCallback
    );

    // initImgLazyLoad();
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
    return (
      <div className="imgs">
        <img src="https://www.baidu.com/img/bd_logo1.png" />
        <img src="https://www.baidu.com/img/flexible/logo/pc/result.png" />
        <img src="https://www.baidu.com/img/flexible/logo/pc/result@2.png" />
        <img src="https://himg.bdimg.com/sys/portraitn/item/public.1.e3394a67.Hpd7xpJGQ6TnCsXMtOOYeQ" />
        <img src="https://t10.baidu.com/it/u=2967197763,1499753582&fm=58" />
        <img src="https://t11.baidu.com/it/u=2477613277,471706849&fm=58" />
      </div>
    );
  }
}
ReactDom.render(<App />, document.getElementById('root'));
