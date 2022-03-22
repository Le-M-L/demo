// @ts-nocheck
import { useMessage } from '@/config/hooks/web/useMessage';
// import store from "@/store"
const { createMessage } = useMessage();

const error = createMessage.error;
export function checkStatus (status, msg) {
    switch (status) {
        case 400:
            error(`${msg}`);
            break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
            error('401');
            // store.dispatch('user/loginOut', true)
            break;
        case 403:
            error('403');
            break;
        // 404请求不存在
        case 404:
            error('404');
            break;
        case 405:
            error('405');
            break;
        case 408:
            error('408');
            break;
        case 500:
            error('500');
            break;
        case 501:
            error('501');
            break;
        case 502:
            error('502');
            break;
        case 503:
            error('503');
            break;
        case 504:
            error('504');
            break;
        case 505:
            error('505');
            break;
        default:
    }
}
