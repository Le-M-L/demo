// @ts-nocheck
import axios from 'axios';

import { isFunction } from '@/config/utils/is';
import qs from "qs"

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map();

export const getPendingUrl = (config) => {
    let params = { ...config.params };
    delete params['nonce'];
    delete params['timestamp'];
    return [config.method, config.url, qs.stringify(params)].join('&')
};

export class AxiosCanceler {
    /**
     * 添加请求
     * @param {Object} config
     */
    addPending (config) {
        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken =
            config.cancelToken ||
            new axios.CancelToken((cancel) => {
                //查找地址是否存在
                if (!pendingMap.has(url)) {
                    // 如果 pending 中不存在当前请求，则添加进去
                    pendingMap.set(url, cancel);
                }
            });
    }

    /**
     * @description: 清空所有pending
     */
    removeAllPending () {
        pendingMap.forEach((cancel) => {
            cancel && isFunction(cancel) && cancel();
        });
        pendingMap.clear();
    }

    /**
     * 移除请求
     * @param {Object} config
     */
    removePending (config) {
        const url = getPendingUrl(config);

        if (pendingMap.has(url)) {
            // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
            const cancel = pendingMap.get(url);
            cancel && cancel(url);
            pendingMap.delete(url);
        }
    }

    /**
     * @description: 重置
     */
    reset () {
        pendingMap = new Map();
    }
}
