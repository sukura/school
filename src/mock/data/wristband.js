import Mock from 'mockjs';
const Wristband = [];

for (let i = 0; i < 60; i++) {
  Wristband.push(Mock.mock({
    id: Mock.Random.id(),
    BraceletCode: /\d{3}/,
    'Mac|6': /[A-Z][0-9]\:/,
    CardNo: Mock.mock('@increment(1000000)'),
    BraceletStatus: Mock.Random.integer(0, 3),
    BraceletColor: Mock.mock('@color'),
    CreateTime: Mock.Random.date(),
    EquipmentType: Mock.Random.integer(0, 1),
    AnotherName: Mock.mock('@pick(["手表", "手环", "watch", "手机", "平板"])'),
  }));
}

console.log(Wristband)
export { Wristband };