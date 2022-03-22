// @ts-nocheck
// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';

import { useGlobSetting } from '@/config/hooks/setting'; //全局配置
import { useMessage } from '@/config/hooks/web/useMessage'; //提示框
import { getToken } from '@/config/utils/auth';

//请求方式
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/config/enums/httpEnum';
import { isString } from '@/config/utils/is';
//将对象作为参数添加到url  和 拷贝
import { setObjToUrlParams, deepMerge } from '@/config/utils';

import store from "@/store"
// error状态值
import { errorResult } from './const';
//时间戳 格式化数据
import { createNow, formatRequestDate, randomString } from './helper';
//获取全局配置参数
const globSetting = useGlobSetting();
//获取请求地址
const prefix = globSetting.urlPrefix;
//获取message 和 modal失败弹窗
const { createMessage, createErrorModal } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform = {
    /**
     * @description: 处理请求数据
     */
    transformRequestHook: (res, options) => {
        const { isTransformRequestResult } = options;
        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (!isTransformRequestResult) {
            return res.data;
        }
        // 错误的时候返回

        const { data } = res;
        if (!data) {
            // return '[HTTP] Request has no return value';
            return errorResult;
        }
        //  这里 code，result，message为 后台统一的字段
        const { code, msg: message } = data;
        // 这里逻辑可以根据项目进行修改
        const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;

        if (!hasSuccess) {
            if (message) {
                // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                if (options.errorMessageMode === 'modal') {
                    createErrorModal({ title: 'errorTip', content: message });
                } else if (options.errorMessageMode === 'message') {
                    createMessage.error(message);
                }
            }
            Promise.reject(new Error(message));
            return errorResult;
        }

        // 接口请求成功，直接返回结果
        if (code === ResultEnum.SUCCESS) {
            return data;
        }
        // 接口请求错误，统一提示错误信息
        if (code === ResultEnum.ERROR) {

            if (message) {
                createMessage.error(data.message);
                Promise.reject(new Error(message));
            } else {
                const msg = '请求失败';
                createMessage.error(msg);
                Promise.reject(new Error(msg));
            }
            return errorResult;
        }
        // 登录超时
        if (code === ResultEnum.TIMEOUT) {
            const timeoutMsg = '登录超时,请重试！';
            createErrorModal({
                title: '登录失败',
                content: timeoutMsg,
            });
            Promise.reject(new Error(timeoutMsg));
            return errorResult;
        }
        return errorResult;
    },

    // 请求之前处理config
    /**
     * 
     * @param {*} config 
     * @param {*} options 配置项
     */
    beforeRequestHook: (config, options) => {
        const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;
        //请求接口加前缀
        if (joinPrefix) {
            config.url = `${prefix}${config.url}`;
        }
        //请求接口加前缀
        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }
        const params = config.params || {};
        if (config.method?.toUpperCase() === RequestEnum.GET) {
            if (!isString(params)) {
                // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                config.params = Object.assign(params || {}, { ...createNow(joinTime, false), nonce: randomString() });
            } else {
                // 兼容restful风格
                config.url = config.url + params + `${createNow(joinTime, true)}`;
                config.params = undefined;
            }
        } else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params);
                config.data = Object.assign(params || {}, { ...createNow(joinTime, false), nonce: randomString() });
                config.params = undefined;
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url, config.data);
                }
            } else {
                // 兼容restful风格
                config.url = config.url + params;
                config.params = undefined;
            }
        }
        return config;
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config) => {
        // 请求之前处理config
        const token = getToken();
        if (token) {
            // jwt token
            config.headers.token = token;
        }
        return config;
    },

    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: (error) => {
        store.dispatch('error/setupErrorHandle', error)
        const { response, code, message } = error || {};
        const msg = response?.data?.error?.message ?? '';
        const err = error?.toString?.() ?? '';
        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                createMessage.error('请求超时！请稍后在试！');
            }
            if (err?.includes('Network Error')) {
                createErrorModal({
                    title: '请求失败',
                    content: '网络不可用',
                });
            }
        } catch (error) {
            throw new Error(error);
        }
        checkStatus(error?.response?.status, msg);
        return Promise.reject(error);
    },
};

function createAxios (opt) {
    return new VAxios(
        deepMerge({
            timeout: 10 * 1000,
            // 基础接口地址
            // baseURL: globSetting.apiUrl,
            // baseURL: 'http://192.168.5.56:8083',
            // baseURL: 'http://192.168.5.25:8083',
            baseURL: 'http://117.161.29.125:8084',

            // 接口可能会有通用的地址部分，可以统一抽取出来
            prefixUrl: prefix,
            // headers: { 'Content-Type': ContentTypeEnum.JSON },
            // 如果是form-data格式
            headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
            // 数据处理方式
            transform,
            // 配置项，下面的选项都可以在独立的接口请求中覆盖
            requestOptions: {
                // 默认将prefix 添加到url
                joinPrefix: true,
                // 需要对返回数据进行处理
                isTransformRequestResult: true,
                // post请求的时候添加参数到url
                joinParamsToUrl: false,
                // 格式化提交参数时间
                formatDate: true,
                // 消息提示类型
                errorMessageMode: 'message',
                // 接口地址
                apiUrl: globSetting.apiUrl,
                //  是否加入时间戳
                joinTime: true,
            },
        },
            opt || {}
        ));
}
const defHttp = createAxios();

export const $get = (url, params) => {
    return defHttp.get({ url, params, })
}

export const $post = (url, params) => {
    return defHttp.post({ url, params, })
}

export function setupAxios (app) {
    app.config.globalProperties.$get = $get;
    app.config.globalProperties.$post = $post;
}

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
