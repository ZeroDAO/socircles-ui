// import axios from 'axios';
import qs from 'qs';
import router from '../router';

// this.$message('这是一条消息提示');

// axios 配置
axios.defaults.timeout = 15000;

axios.defaults.baseURL = '/cir';
const whiteList = [];
const noCacheList = ['/user/get-msg-count', '/list/new', '/list/active'];
// 白名单外的请求验证登录，并带上token
// Cache-Control: max-age=31536000
axios.interceptors.request.use(
    function(config) {

        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.status != 200) {
            // Toast.error(response.data.message);
            return false;
        } else if (response.data.code != 1000) {
            return false;
        }
        return response.data;
    },
    error => {
        return Promise.reject(error);
    });

export default axios;

/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * del 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/**
 * get 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
              params: params
          })
          .then(response => {
              resolve(response.data);
          }, err => {
              reject(err);
          })
    })
}
