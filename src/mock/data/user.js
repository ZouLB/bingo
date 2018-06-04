import Mock from 'mockjs';

const Users = [];

for (let i = 0; i < 4; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.id(),
    name: Mock.Random.cname(),
    desc: Mock.Random.cparagraph(2),
    formula:'',
    sql:'',
    creator: Mock.Random.cname(),
    create_time: Mock.Random.date(),
    tag:Mock.Random.range(1,3)
  }));
}

const Tags = [];

for (let i = 0; i < 4; i++) {
  Tags.push(Mock.mock({
    cal_id: Mock.Random.id(),
    tag: Mock.Random.cname(),
    project_id:'1'
  }));
}

export { Users , Tags};
