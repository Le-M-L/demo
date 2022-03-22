// @ts-nocheck
import { isObject, isString } from '@/config/utils/is';


export function createNow (join, restful = false) {
    if (!join) {
        return restful ? '' : {};
    }
    const now = new Date().getTime();
    if (restful) {
        return `?_t=${now}`;
    }

    return {
        timestamp: now,
    };
}
// 生成随机字符串
export function randomString () {
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let randomStr = '';
    for (let i = 0; i < 32; i++) {
        randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return randomStr;
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
/**
 * @description: 格式化请求参数时间
 */
export function formatRequestDate (params) {
    for (const key in params) {
        if (params[key] && params[key]._isAMomentObject) {
            params[key] = params[key].format(DATE_TIME_FORMAT);
        }
        if (isString(key)) {
            const value = params[key];
            if (value) {
                try {
                    params[key] = isString(value) ? value.trim() : value;
                } catch (error) {
                    throw new Error(error);
                }
            }
        }
        if (isObject(params[key])) {
            formatRequestDate(params[key]);
        }
    }
}
