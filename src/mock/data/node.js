import Mock from 'mockjs'

const Nodes = []

for (let i = 0; i < 86; i++) {
  Nodes.push(Mock.mock({
    id: Mock.Random.id(),
    code: /[a-z][A-Z][0-9]/,
    name: Mock.Random.province(),
    address: Mock.Random.ip(),
    'domain|2-3': 2,
    'version|1-10': 1,
    type: Mock.Random.integer(0, 1),
    status: Mock.Random.integer(0, 9),
    nodeConfig: Mock.Random.integer(0, 9),
    updateTime: Mock.Random.date(),
    createTime: Mock.Random.date()
  }))
}

export { Nodes }
