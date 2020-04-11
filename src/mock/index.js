import Mock from 'mockjs'
// 到校查询 进出记录表
Mock.mock(/api\/school\/record\/list/, {
  'code': 200,
  'message': '查询成功',
  'data|20': [{
    'id|+1': 1,
    'fullName|+1': ['李墨雪', '李小龙', '李鹏宇', '凌风', '凌音', '董文娟', '刘贺', '杨洋', '夏葵', '司辰'],
    'studentId|+1': 20200101,
    'time|1': ['2020-04-01 8:30', '2020-04-01 8:31', '2020-04-01 8:32', '2020-04-01 8:30'],
    'status|1-2': true
  }]
})

// 到校查询表
Mock.mock(/api\/arrive\/list/, {
  'code': 200,
  'message': '查询成功',
  'data|20': [{
    'name|+1': ['李墨雪', '李小龙', '李鹏宇', '凌风', '凌音', '董文娟', '刘贺', '杨洋', '夏葵', '司辰'],
    'studentId|+1': 20200101,
    'status|1': [1, 2, 3, 4, 5]
  }]
})

// 手环列表
Mock.mock(/api\/handManage\/search/, {
  'code': 200,
  'message': '查询成功',
  'data|20': [
    {
      'id|+1': 578,
      'BraceletCode|+1': 479,
      'Mac': 'C8:66:F3:33:04:9D',
      'CardNo': '',
      'BraceletStatus|1': [0, 1, 2, 3],
      'BraceletColor': '',
      'CreateTime': '2019-12-31',
      'EquipmentType': 1,
      'AnotherName': '手表'
    }
  ]
})
