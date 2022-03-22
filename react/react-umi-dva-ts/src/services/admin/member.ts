// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
/**
 * 获取会员列表
 */
export async function getMemberList(
  params: API.PageParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/admin/member', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
