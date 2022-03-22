import { VFetch } from './Fetch';
//请求方式
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/config/enums/httpEnum';
//将对象作为参数添加到url  和 拷贝
import { setObjToUrlParams, deepMerge } from '@/config/utils';
// error状态值
import { errorResult } from './const';
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
    },
};

function createFetch(opt) {
    return new VFetch(
        deepMerge(
            {
                timeout: 10 * 1000,
                // 基础接口地址
                baseURL: 'http://117.161.29.125:8084',
                // 接口可能会有通用的地址部分，可以统一抽取出来
                prefixUrl: '',
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
                    apiUrl: '',
                    //  是否加入时间戳
                    joinTime: true,
                },
            },
            opt || {}
        )
    );
}
