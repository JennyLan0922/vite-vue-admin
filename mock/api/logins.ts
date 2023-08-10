import { config } from '../apis'
import { listPaging } from '../utils'
import { lists, tokenValue, deleteLists } from '../data/list'

type userType = {
  [s: string]: { password: number; token: string }
}
const users: userType = {
  admin: {
    password: 123456,
    token: 'admin-token',
  },
  ordinary: {
    password: 123456,
    token: 'ordinary-token',
  },
  test: {
    password: 123456,
    token: 'test-token',
  },
}

export default [
  {
    url: 'admin/login',
    type: 'post',
    response: (config: config) => {
      const index = Object.keys(users).indexOf(config.body.username)
      if (index !== -1) {
        if (config.body.password == 123456) {
          return {
            data: {
              token: users[config.body.username].token,
              // tokenHead: "Bearer ",
              tokenHead: '',
            },
            code: 200,
          }
        } else {
          return {
            code: 502,
            message: '密码错误',
          }
        }
      } else {
        return {
          code: 502,
          message: '用户名错误',
        }
      }
    },
  },
  {
    url: 'admin/info*',
    type: 'get',
    response: (config: config) => {
      const data = lists.tokens.filter(
        (item) => item.token == config.query.token
      )[0]

      return {
        code: 200,
        data,
        message: '操作成功',
      }
    },
  },
  // 获取用户列表
  {
    url: 'admin/userList',
    response: (config: config) => {
      const pageSize = Number(config.query.pageSize)
      const pageNum = Number(config.query.pageNum)
      const username = config.query.username

      const list = username
        ? lists.tokens.filter(
            (item: tokenValue) => item.username.indexOf(username) !== -1
          )
        : lists.tokens

      return {
        code: 200,
        data: listPaging<tokenValue>(pageNum, pageSize, list),
        message: '操作成功',
      }
    },
  },
  // 删除用户列表
  {
    url: 'admin/remove',
    type: 'delete',
    response: (config: config) => {
      return {
        code: 200,
        data: deleteLists('tokens', config.body.ids),
      }
    },
  },
  // 获取角色列表
  {
    url: 'admin/roleList',
    response: (config: config) => {
      const pageSize = Number(config.query.pageSize)
      const pageNum = Number(config.query.pageNum)
      return {
        code: 200,
        data: listPaging<tokenValue>(pageNum, pageSize, lists.roleLists),
        message: '操作成功',
      }
    },
  },
]
