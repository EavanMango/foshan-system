export const tableColumns = [
  {
    label: '户号',
    sortable: 'custom',
    prop: 'consNo',
  },
  {
    label: '名称',
    sortable: 'custom',
    prop: 'consName',
  },
  {
    label: '地区',
    sortable: 'custom',
    prop: 'city',
  },
  {
    label: '行业',
    sortable: 'custom',
    prop: 'trade',
  },
  {
    label: '容量(KW)',
    sortable: 'custom',
    prop: 'powerReceivingCapacity',
  },
];
// 数据模拟
export const tableData = Array(5)
  .fill('')
  .map((d, i) => {
    return {
      name: i,
    };
  });
