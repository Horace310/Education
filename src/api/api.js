import axios from "axios";
import qs from "qs"; // 根据需求是否导入qs模块
import router from "../router";

axios.defaults.timeout = 5000;

// axios.defaults.baseURL = 'http://114.115.142.58:82';// 配置接口地址
axios.defaults.baseURL = "http://data.ikeshen.com"; // 配置接口地址
//axios.defaults.baseURL = "http://api.ikeshen.com"; // 配置接口地址

// axios.defaults.baseURL = 'http://192.168.1.38:82';// 配置接口地址
// axios.defaults.headers.common["Content-Type"] =
//   "application/json;charset=UTF-8";
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');
    // config.data = JSON.stringify(config.data);
    // if (sessionStorage.getItem("type") == 2) {
    if (config.headers["JSON-TYPE"]) {
      config.headers = {
        "Content-Type": "application/json"
      };
    } else {
      config.headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      };
    }
    // config.headers = {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    // };
    // } else if (sessionStorage.getItem("type") == 1) {
    //   config.headers = {
    //     "Content-Type": "application/json;charset=UTF-8"
    //   };
    // }

    if (sessionStorage.getItem("token")) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = window.sessionStorage.getItem("token");
    } else {
      if (config.url === "/auth/oauth/token") {
        config.headers.Authorization = "Basic ZmViczoxMjM0NTY=";
      }
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    // if (response.data.code == "5003" || response.data.code == "5002") {
    //   router.push({
    //     path: "/login",
    //     querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
    //   });
    // } else {
    // }

    return response;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          router.push({
            path: "/login"
          });
          error.message = "请求出错(404)";
        //   break;
        // default: error.message = `连接出错(${error.response.status})!`;
      }
    }
    return Promise.reject(error.response.data);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deletes(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if (
          url == "http://data.ikeshen.com/auth/oauth/token" ||
          url == "/auth/oauth/token"
        ) {
          this.$message.error(err);
        }
        console.log(err);
        reject(err.data);
      });
  });
}

export function posts(url, params) {
  console.log(params);
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/json;"
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err.data);
      });
  });
}
