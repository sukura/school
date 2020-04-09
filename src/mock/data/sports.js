import Mock from 'mockjs'

const Sports = []

for (let i = 0; i < 86; i++) {
  Sports.push(Mock.mock({
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

export { Sports }
