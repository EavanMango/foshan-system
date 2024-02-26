import axios from 'axios';
import { Message } from 'element-ui';
import { UserUtil } from '@/utils/user-utils';
import { loginApiObj } from './login';
import { AesUtil } from '@/utils/aes-util';

const instance = axios.create({
  timeout: '60000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// const noNeedTokenApi = [loginApiObj.AppLogin];

instance.interceptors.request.use(
  config => {
    // noNeedTokenApi.forEach(item => {
    //   需要加上token的接口
    //   if (!item.url.includes(config.url)) {
    //     config.headers.Authorization = UserUtil.getToken();
    //     // config.headers.roleIds = `'910900000001'`;
    //     // 加密
    //     // if (config.data) {
    //     //   config.data = AesUtil.encryptPassword(JSON.stringify(config.data));
    //     // }
    //   }
    // });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response) {
      // 解密
      // if (!response.request.responseURL.includes('queryResources')) {
      //   response.data = JSON.parse(AesUtil.decryptPassword(response.data));
      // }
      if (response.headers['content-disposition']) {
        response.data.contentDisposition = response.headers['content-disposition']
      }
      let code = response?.data?.code,
        msg = response?.data?.msg;
      if (code === 500) {
        if (msg) {
          Message.error(msg);
        }
        return Promise.reject(msg);
      }

      if (code === '401' || code === 401) {
        if (msg) {
          // Message.error(msg);
          UserUtil.removeToken();
          // window.location.reload();
          return;
        }
      }

      if (code === '403' || code === 403) {
        if (msg) {
          Message.error('当前操作没有权限');
          UserUtil.removeToken();
          window.location.reload();
          return;
        }
      }
      return Promise.resolve(response?.data);
    }
  },
  error => {
    // console.log(error);
    return Promise.reject(error);
  }
);

export function getHttpService(HttpRequest) {
  let httpObj = {};
  for (let [key, value] of Object.entries(HttpRequest)) {
    let { url, method } = value;
    httpObj[key] = (params, cb, config = {}) => {
      let requestParams = paramsHandleObj[method](params);
      let requestUrl = cb ? cb(url) : url;
      return new Promise((resolve, reject) => {
        instance[method](requestUrl, requestParams, config)
          .then(res => {
            resolve(res);
          })
          .catch(err => reject(err));
      });
    };
  }
  return httpObj;
}

const paramsHandleObj = {
  get(params) {
    return { params };
  },
  post(params) {
    return params;
  },
  delete(params) {
    return { params };
  },
  put(params) {
    return params;
  },
};

export default instance;
