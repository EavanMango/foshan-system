export const tableColumns = [
  {
    label: '测点编码',
    prop: 'id',
  },
  {
    label: '测点名称',
    prop: 'name',
  },
  {
    label: '当前值',
    prop: 'nowVal',
  },
  {
    label: '测点分类',
    prop: 'ycyxType',
  },
  {
    label: '英文编码',
    prop: 'code',
  },
  {
    label: '单位',
    prop: 'unit',
  },
];
// 数据模拟
export const tableData = Array(5)
  .fill('')
  .map((d, i) => {
    return {
      id: i,
      name: i,
    };
  });
