import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'
import { Nodes } from './data/node'
import { Sports, Course, sportsDay } from './data/sports'
import { Arrives, ArrivesList } from './data/school'
import { Wristband } from './data/wristband'
/* eslint-disable */
let _Users = Users
let _Nodes = Nodes
let _Sports = Sports
let _Course = Course
let _sportsDay = sportsDay
let _Arrives = Arrives
let _ArrivesList = ArrivesList
let _Wristband = Wristband
export default {
  /**
   * mock start
   */
  start() {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 登录
    mock.onPost('/login').reply(config => {
      const {username, password} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }])
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }])
          }
        }, 1000)
      })
    })

    //获取节点列表（分页）
    mock.onPost('/node/listPage').reply(config => {
      const {curPage, pageSize,name, nodeConfig} = JSON.parse(config.data)
      let mockNodes = _Nodes.filter(node => {
        if ((name && node.name.indexOf(name) == -1) || (nodeConfig && Number(nodeConfig) === node.nodeConfig)) return false
        return true
      })
      let total = mockNodes.length
      mockNodes = mockNodes.filter((u, index) => index < pageSize * curPage && index >= pageSize * (curPage - 1))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            list: mockNodes
          }])
        }, 1000)
      })
    })

    //获取节点列表（分页）
    mock.onPost('/sports/attendance/page').reply(config => {
      console.log('config :', config)
      const {page, limit, name, studentId} = JSON.parse(config.data)
      let mockSports = _Sports.filter(node => {
        if ((name && node.name.indexOf(name) == -1) || (studentId && Number(studentId) === node.studentId)) return false
        return true
      })
      let total = mockSports.length
      mockSports = mockSports.filter((u, index) => index < limit * page && index >= limit * (page - 1))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            data: {
              total: total,
              list: mockSports
            }
          }])
        }, 1000)
      })
    })

    //体育课 历史课程 列表（分页）
    mock.onGet('/sports/history/page').reply(config => {
      const {page, limit, name} = config.params
      let mockCourse = _Course.filter(node => {
        if ((name && node.name.indexOf(name) == -1)) return false
        return true
      })
      let total = mockCourse.length
      mockCourse = mockCourse.filter((u, index) => index < limit * page && index >= limit * (page - 1))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            data: {
              total: total,
              list: mockCourse
            }
          }])
        }, 1000)
      })
    })

    //体育课 今日课程 列表（分页）
    mock.onGet('/sports/day/page').reply(config => {
      const {page, limit} = config.params
      let mocksportsDay = _sportsDay
      let total = mocksportsDay.length
      mocksportsDay = mocksportsDay.filter((u, index) => index < limit * page && index >= limit * (page - 1))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            data: {
              total: total,
              list: mocksportsDay
            }
          }])
        }, 1000)
      })
    })

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      const {name} = config.params
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }])
        }, 1000)
      })
    })

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      const {page, name} = config.params
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false
        return true
      })
      let total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }])
        }, 1000)
      })
    })

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      const { id } = config.params
      _Users = _Users.filter(u => u.id !== id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      const { ids } = config.params
      ids = ids.split(',')
      _Users = _Users.filter(u => !ids.includes(u.id))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      const { id, name, addr, age, birth, sex } = config.params
      _Users.some(u => {
        if (u.id === id) {
          u.name = name
          u.addr = addr
          u.age = age
          u.birth = birth
          u.sex = sex
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }])
        }, 500)
      })
    })

    //新增用户
    mock.onGet('/user/add').reply(config => {
      const { name, addr, age, birth, sex } = config.params
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }])
        }, 500)
      })
    })

    // 到校查询 进出记录表
    mock.onGet('/school/arriverecord/page').reply(config => {
      const {page, limit, name, studentId} = config.params
      let mockArrives = _Arrives.filter(node => {
        if ((name && node.name.indexOf(name) == -1) || (studentId && Number(studentId) === node.studentId)) return false
        return true
      })
      let total = mockArrives.length
      mockArrives = mockArrives.filter((u, index) => index < limit * page && index >= limit * (page - 1))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            data: {
              total: total,
              list: mockArrives
            }
          }])
        }, 1000)
      })
    })

    mock.onGet('/school/arrive/list').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            data: _ArrivesList
          }])
        }, 1000)
      })
    })
  

    //手环列表（分页）
    mock.onGet('/handManage/page').reply(config => {
      const {page, limit, id} = config.params
      let mockWristband = _Wristband.filter(node => {
        if ((id && node.id.indexOf(id) == -1)) return false
        return true
      })
      let total = mockWristband.length
      mockWristband = mockWristband.filter((u, index) => index < limit * page && index >= limit * (page - 1))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: '查询成功',
            data: {
              total: total,
              list: mockWristband
            }
          }])
        }, 1000)
      })
    })
  }
}
