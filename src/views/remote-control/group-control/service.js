export const tableColumns = [
  {
    label: '户号',
    // sortable: 'custom',
    prop: 'consNo',
  },
  {
    label: '用户名称',
    // sortable: 'custom',
    prop: 'consName',
  },
  {
    label: '地市',
    // sortable: 'custom',
    prop: 'city',
  },
  {
    label: '行业',
    // sortable: 'custom',
    prop: 'trade',
  },
  {
    label: '总表设备名称',
    // sortable: 'custom',
    prop: 'equipName',
  },
];
// 数据模拟
export const tableData = Array(0)
  .fill('')
  .map((d, i) => {
    return {
      consId: i,
    };
  });

export const treeData = [];
