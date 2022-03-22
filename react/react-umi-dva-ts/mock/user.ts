import { Request, Response } from 'express';

export default {
  /** 获取用户信息 */
  'GET /api/userInfo': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: {
        authType: 1, // 权限类型
        authority: 1, // 当前权限
        avatar:
          'http://thirdqq.qlogo.cn/g?b=oidb&k=584ia13qSKzEWVB0TJ5n2pw&s=100&t=1596971632', // 头像
        createTime: '2022-02-02 22:53:57', // 创建时间
        lastLoginTime: '2022-02-09 21:19:15', // 最后登录时间
        niceName: '昵称',
        loginName: '登录名',
      },
    });
  },
  /** 获取token */
  'Get /api/login': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: {
        token: 123456789, //
      },
    });
  },
};
