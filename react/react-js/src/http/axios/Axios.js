// @ts-nocheck
import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { isFunction } from '@/config/utils/is';
import { cloneDeep } from 'lodash-es'; //深拷贝

import { errorResult } from './const';
import { ContentTypeEnum, RequestEnum } from '@/config/enums/httpEnum'; //请求类型


/**
 * @description:  axios模块
 */
export class VAxios {
    axiosInstance;
    options;
    constructor(options) {
        this.options = options;
        //axios 实例
        this.axiosInstance = axios.create(options);
        //设置拦截器
        this.setupInterceptors();
    }

    /**
     * @description:  创建axios实例
     */
    createAxios (config) {
        this.axiosInstance = axios.create(config);
        // this.request = this.axiosInstance.request;
    }

    //处理方式
    getTransform () {
        const { transform } = this.options;
        return transform;
    }

    getAxios () {
        return this.axiosInstance;
    }

    /**
     * @description: 重新配置axios
     */
    configAxios (config) {
        if (!this.axiosInstance) {
            return;
        }
        this.createAxios(config);
    }

    /**
     * @description: 设置通用header
     */
    setHeader (headers) {
        if (!this.axiosInstance) {
            return;
        }
        Object.assign(this.axiosInstance.defaults.headers, headers);
    }

    /**
     * @description: 拦截器配置
     */
    setupInterceptors () {
        //处理方式
        const transform = this.getTransform();
        if (!transform) {
            return;
        }
        const {
            requestInterceptors,        //请求拦截器处理
            requestInterceptorsCatch,   //请求错误处理
            responseInterceptors,       //响应拦截处理
            responseInterceptorsCatch,  //响应错误处理
        } = transform;

        //创建 取消请求实例
        const axiosCanceler = new AxiosCanceler();

        // 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config) => {
            // 如果“取消重复请求”开启，则禁止“取消重复请求”
            const { headers: { ignoreCancelToken } } = config;

            const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;

            !ignoreCancel && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config);
            }
            return config;
        }, undefined);

        // 请求拦截器错误捕获
        requestInterceptorsCatch &&
            isFunction(requestInterceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

        // 响应结果拦截器处理
        this.axiosInstance.interceptors.response.use((res) => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);

        // 响应结果拦截器错误捕获
        responseInterceptorsCatch &&
            isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
    }

    /**
     * @description:  文件上传
     */
    uploadFile (config, params) {
        const formData = new window.FormData();

        if (params.data) {
            Object.keys(params.data).forEach((key) => {
                if (!params.data) return;
                const value = params.data[key];
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item);
                    });
                    return;
                }

                formData.append(key, params.data[key]);
            });
        }

        formData.append(params.name || 'file', params.file, params.filename);

        return this.axiosInstance.request({
            ...config,
            method: 'POST',
            data: formData,
            headers: {
                'Content-type': ContentTypeEnum.FORM_DATA,
                ignoreCancelToken: true,
            },
        });
    }

    // support form-data
    supportFormData (config) {
        const headers = this.options?.headers;
        const contentType = headers?.['Content-Type'] || headers?.['content-type'];

        if (
            contentType !== ContentTypeEnum.FORM_URLENCODED ||
            !Reflect.has(config, 'data') ||
            config.method?.toUpperCase() === RequestEnum.GET
        ) {
            return config;
        }

        return {
            ...config,
            data: qs.stringify(config.data),
        };
    }

    get (config, options) {
        return this.request({ ...config, method: 'GET' }, options);
    }

    post (config, options) {
        console.log(config)
        return this.request({ ...config, method: 'POST' }, options);
    }

    put (config, options) {
        return this.request({ ...config, method: 'PUT' }, options);
    }

    delete (config, options) {
        return this.request({ ...config, method: 'DELETE' }, options);
    }

    /**
     * @description:   请求方法
     */
    request (config, options) {
        let conf = cloneDeep(config);
        //创建axios的参数配置
        const transform = this.getTransform();
        //配置项
        const { requestOptions } = this.options;
        //合并两个对象内的可枚举的属性
        const opt = Object.assign({}, requestOptions, options);
        //beforeRequestHook 请求之前处理config
        //requestCatchHook 请求捕获
        //transformRequestHook 处理请求数据
        const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt);
        }
        conf = this.supportFormData(conf);
        return new Promise((resolve, reject) => {
            this.axiosInstance.request(conf)
                .then((res) => {
                    if (transformRequestHook && isFunction(transformRequestHook)) {
                        const ret = transformRequestHook(res, opt);
                        ret !== errorResult ? resolve(ret) : reject(new Error('request error!'));
                        return;
                    }
                    resolve(res);
                })
                .catch((e) => {
                    if (requestCatchHook && isFunction(requestCatchHook)) {
                        reject(requestCatchHook(e));
                        return;
                    }
                    reject(e);
                });
        });
    }
}
