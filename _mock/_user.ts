import { MockRequest } from '@delon/mock';
import * as Mock from 'mockjs';
import { success } from './_common';

function genData(params: any) {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      id: '@id'.toString(),
      name: '@cname',
      permissions: [0, 1],
      token: 'Bearer xxxxxxx'
    }
  });
}

function getUserList(params) {
  return Mock.mock({
    code: 200,
    msg: 'success',
    data: {
      'results|10': [
        {
          account: '@last',
          create_datetime: '@datetime',
          id: '@id'.toString(),
          name: '@cname',
          permissions: [0, 1],
          'status|0-1': 0
        }
      ],
      total: 40
    }
  });
}

export const USER = {
  'POST user/login': (req: MockRequest) => genData(req.body),
  'GET user/list': (req: MockRequest) => getUserList(req.body),
  'POST user/add': (req: MockRequest) => success(req.body),
  'PUT user/modify/:id': (req: MockRequest) => success(req.body),
  'PUT user/password/modify/:id': (req: MockRequest) => success(req.body),
  'DELETE user/delete/:id': (req: MockRequest) => success(req.body),
  'GET user/logout/:id': (req: MockRequest) => success(req.body)
};
