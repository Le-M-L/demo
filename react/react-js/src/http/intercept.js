//导入axios
import axios from "axios";

const instance = axios.create({
    timeout: 10000,
    responseType: "json",
});

if (process.env.NODE_ENV === "development") { //开发环境

    instance.defaults.baseURL = 'http://47.105.124.53:8883/XAM';

} else if (process.env.NODE_ENV === "production") { //生产环境

    instance.defaults.baseURL = 'http://47.105.124.53:8883/XAM'; //测试服务器地址
}

//设计为一个方法调用，method默认值为“get“，data为数据，config为上传图片时的加载进度
export function request(url, method = "get", data = {}, config = {}) {
    return axiosRequest(url, method, data, config);
}
//get
export const $get  = (url, data = {}) => axiosRequest(url, "get", data);
//post
export const $post = (url, data = {}) => axiosRequest(url, "post", data);





//重复请求接口过滤
const pending = [];
const CancelToken = axios.CancelToken;
const filtration = (request) => {
    switch (request.url) {
        case "": break;
        default:
            removePending(request);
            request.cancelToken = new CancelToken((c) => {
                pending.push({
                    url: request.url,
                    method: request.method,
                    params: request.params, // get
                    data: request.data,     // post
                    cancel: c,
                });
            });
            break;
    }
};

// 移除重复请求
const removePending = (config) => {
    for (const key in pending) {
        const item = +key;
        const list = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && list.data === config.data) {
            // 执行取消操作
            list.cancel('请勿重复操作');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
};

//请求拦截
instance.interceptors.request.use(
    (request) => {
        console.log(request)
        filtration(request);

        //请求头中携带token
        request.headers["token"] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiIsInVzZXJOYW1lIjoiZXZlbnRfamQiLCJleHAiOjE2MTA3OTM4NTYsInVzZXJJZCI6IjdhMzMwYTI1OGNjYzQ3ODU4YWU3ZjZmMzlkNjAzMGFmIiwiaWF0IjoxNjEwNjIxMDU2fQ.KiqLLM3wtqXpzrU2dsVCHuKQt9TTl1yjgAcfemr-dGc';

        return request;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// 响应拦截
instance.interceptors.response.use(
    (res) => {
        console.log(res)
        filtration(res.config);
        return Promise.resolve(res);
    },
    (err) => {
        console.log(err)
        // 错误状态1-请求有返回响应，但响应码不是2xx等不正确的状态码。
        return Promise.reject(err);
    }
);

/**
 *
 * @param {String} url 请求地址
 * @param {String} method 请求方式
 * @param {Object} data 请求参数
 * @param {Object} config 上传的文件
 */
function axiosRequest(url, method, data, config) {
    //接收后改为小写
    let methods = method.toLocaleLowerCase();
    if (methods === "post") {
        //设一个key-value接收格式，然后遍历出来  用于转换数据form格式
        let params = new URLSearchParams();
        if (data instanceof Object) {
            for (let key in data) {
                params.append(key, data[key]);
            }
            data = params;
        }
        //当接收的method为上传文件时，将其设为post，并将文件的key-value加入data数据流。
    } else if (methods === "file") {
        method = "post";
        let params = new FormData();
        if (data instanceof Object) {
            for (let key in data) {
                params.append(key, data[key]);
            }
            data = params;
        }
    }
    //将参数都放在axiosConfig变量里面。
    let axiosConfig = {
        method: methods,
        url: url,
    };
    methods === 'get' ? axiosConfig.params = data : axiosConfig.data = data;

    //将上传文件的进度加入data数据流
    if (config instanceof Object) {
        for (let key in config) {
            axiosConfig[key] = config[key];
        }
    }
    //直接调用请求然后返回即可
    return instance(axiosConfig).then((res) => res.data);
}
