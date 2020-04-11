import Mock from 'mockjs'

const Arrives = []
for (let i = 0; i < 86; i++) {
  Arrives.push(Mock.mock({
    id: Mock.Random.id(),
    name: Mock.mock('@name'),
    avatar: Mock.Random.image('32x32', '#4A7BF7', '头像'),
    sex: Mock.Random.integer(0, 1),
    status: Mock.Random.integer(0, 1),
    code: /[a-z][A-Z][0-9]/,
    address: Mock.Random.ip(),
    studentId: Mock.mock('@increment(1000000)'),
    type: Mock.Random.integer(0, 1),
    updateTime: Mock.Random.date(),
    createTime: Mock.Random.date()
  }))
}

const ArrivesList = []
for (let i = 0; i < 86; i++) {
  ArrivesList.push(Mock.mock({
    id: Mock.Random.id(),
    // avatar: Mock.Random.image('32x32', '#4A7BF7', '头像'),
    name: Mock.mock("@pick(['李墨雪', '李小龙', '李鹏宇', '凌风', '凌音', '董文娟', '刘贺', '杨洋', '夏葵', '司辰'])"),
    studentId: Mock.mock('@increment(1000000)'),
    avatar: Mock.Random.image('32x32', '#4A7BF7', '头像'),
    sex: Mock.Random.integer(0, 1),
    status: Mock.Random.integer(1, 5),
    updateTime: Mock.Random.date(),
    createTime: Mock.Random.date()
  }))
}

export { Arrives, ArrivesList }
