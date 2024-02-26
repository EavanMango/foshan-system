export const tableColumnList = [
  { label: '角色编号', prop: 'id' },
  { label: '角色名称', prop: 'cnName' },
  // { label: '权限级别', prop: 'userLevel' },
  { label: '创建时间', prop: 'createTime' },
  // { label: '操作', prop: 'action' },
];

export const tableDataList = Array(0)
  .fill('')
  .map((v, i) => {
    return {
      id: i,
      cnName: '用户' + i,
      userLevel: 'common',
      createTime: '2022-06-20 10:06:28',
    };
  });
