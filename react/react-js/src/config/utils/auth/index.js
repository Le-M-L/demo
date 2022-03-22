// @ts-nocheck
import { Persistent } from '@/utils/cache/persistent';
import { CacheTypeEnum, TOKEN_KEY } from '@/enums/cacheEnum';
import projectSetting from '@/settings/projectSetting';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken () {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJleHAiOjE2MTY0OTA4NjgsInVzZXJJZCI6IjFjMTIyZTlmMzdmMjRjOTNiNTQ1MWMwMjIwZjFiNTQ4IiwiaWF0IjoxNjE2MzE4MDY4fQ.UpiHAfmtd7xT2M1-RDy_VA4OO-iE1XemxOAYrFJ90iA' || getAuthCache(TOKEN_KEY);
}

export function getAuthCache (key) {
    const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
    return fn(key);
}

export function setAuthCache (key, value) {
    const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
    return fn(key, value);
}
