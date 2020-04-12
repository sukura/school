import Mock from 'mockjs'

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

export { Sports, Course }
