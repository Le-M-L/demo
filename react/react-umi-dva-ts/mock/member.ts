import { Request, Response } from 'express';

export default {
  /** 获取用户信息 */
  'GET /api/admin/member': (req: Request, res: Response) => {
    res.send({
      success: true,
      data: [
        {
          name: '1',
          id: 1,
        },
        {
          name: '2',
          id: 2,
        },
      ],
      total: 100,
    });
  },
};
