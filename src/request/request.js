/**
 * @Author: centerm.gaohan
 * @Date: 2021-07-30 11:16:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-07-30 14:59:22
 *
 */

const request = (options = {}) => {
  const requestCore = new RequestCore(options);
  return requestCore;
};

export default request({});
