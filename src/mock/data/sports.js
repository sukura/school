import Mock from 'mockjs'
/* eslint-disable */

let Sports = []

for (let i = 0; i < 86; i++) {
  Sports.push(Mock.mock({
    id: Mock.Random.id(),
    name: Mock.mock('@name'),
    avatar: Mock.Random.image('32x32', '#4A7BF7', '头像'),
    sex: Mock.Random.integer(0, 1),
    status: Mock.Random.integer(0, 1),
    code:/[a-z][A-Z][0-9]/,
    address: Mock.Random.ip(),
    studentId: Mock.mock('@increment(1000000)'),
    type: Mock.Random.integer(0, 1),
    updateTime: Mock.Random.date(),
    createTime: Mock.Random.date(),
  }))
}

let Course = []

for (let i = 0; i < 86; i++) {
  Course.push(Mock.mock({
    id: Mock.Random.id(),
    name: Mock.mock("@pick(['哲学','经济学','法学','教育学','文学','历史学','理学','体育','工学','农学','医学','军事学','管理学'])"),
    rank: Mock.mock("@pick(['8:00—08:50','9:00—09:50','10:10—11:00','11:10—12:00','13:00—13:50','14:00—14:50','15:10—16:00','16:10—17:00','17:10—18:00','18:40—19:30','19:40—20:30','20:40—21:30'])"),
    teacher: Mock.mock('@cfirst()' + '老师'),
    number: Mock.Random.integer(30, 36),
    type: Mock.mock("@pick(['分科课程','综合课程','学科课程','活动课程'])"),
    content: Mock.mock('@cword(3)'),
    status: Mock.Random.integer(0, 1),
    updateTime: Mock.Random.date(),
    createTime: Mock.Random.date(),
  }))
}

let sportsDay = []

for (let i = 0; i < 86; i++) {
  sportsDay.push(Mock.mock({
    id: Mock.Random.id(),
    className: Mock.mock("@pick(['一年级一班','一年级二班','一年级三班','一年级四班','一年级五班','一年级六班','二年级一班','二年级二班','二年级三班','二年级四班','二年级五班','二年级六班','三年级一班','三年级二班','三年级三班','三年级四班','三年级五班','三年级六班','四年级一班','四年级二班','四年级三班','四年级四班','四年级五班','四年级六班','五年级一班','五年级二班','五年级三班','五年级四班','五年级五班','五年级六班','六年级一班','六年级二班','六年级三班','六年级四班','六年级五班','六年级六班'])"),
    time: Mock.mock("@pick(['8:00—08:50','9:00—09:50','10:10—11:00','11:10—12:00','13:00—13:50','14:00—14:50','15:10—16:00','16:10—17:00','17:10—18:00','18:40—19:30','19:40—20:30','20:40—21:30'])"),
    teacherName: Mock.mock('@cfirst()' + '老师'),
    studentNumber: Mock.Random.integer(30, 36),
    adress: Mock.mock("@pick(['操场','逸思楼','逸夫楼','智远楼','汇知楼','静思楼','知行楼','笃学楼','敏思楼','崇德楼','守正楼','信义楼','兰华楼','听雨轩','思学楼'])"),
    status: Mock.Random.integer(1, 3),
    updateTime: Mock.Random.date(),
    createTime: Mock.Random.date()
  }))
}

export { Sports, Course, sportsDay }
