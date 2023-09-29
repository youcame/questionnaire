/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from '@@/core/history';
import { stringify } from 'querystring';
const loginPath = '/user/login';
const WHITE_LIST = ['/user/register', loginPath];

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'development' ? undefined : 'http://flandre.ltd',
  // requestType: 'form',
});

/**
 * 所有请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`执行了请求拦截器 url={}`, url);
  return {
    url,
    options: {
      ...options,
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 0) {
    return res.data;
  } else if (res.code == 40000) {
    message.error(res.description);
  } else if (res.code === 40100) {
    if (WHITE_LIST.includes(location.pathname)) {
    } else {
      message.error('还木有登录哦~');
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: location.pathname,
        }),
      });
    }
  } else {
    message.error(res.description);
  }
  return res.data;
});

export default request;
