import qs from 'qs';
import { isFunction } from '@/config/utils/is';
import { cloneDeep } from 'lodash-es'; //深拷贝
import { errorResult } from './const';
import { ContentTypeEnum, RequestEnum } from '@/config/enums/httpEnum'; //请求类型

/**
 * @description:  fetch模块
 */
export class VFetch {
    constructor(options) {
        this.options = options;
        // fetch实例
    }

    //处理方式
    getTransform() {
        const { transform } = this.options;
        return transform;
    }

    /**
     * @description:   请求方法
     */
    request(config, options) {
        let conf = cloneDeep(config);
    }
}


