export const treeData = [
  {
    id: 1,
    cnName: '江苏省',
    children: [
      { id: 2, cnName: '常州市' },
      { id: 3, cnName: '淮安市' },
      { id: 4, cnName: '连云港' },
      {
        id: 5,
        cnName: '南京市',
        children: [
          { id: '5-1', cnName: '高淳区' },
          { id: '5-2', cnName: '鼓楼区' },
          { id: '5-3', cnName: '建邺区' },
          { id: '5-4', cnName: '江宁区' },
          { id: '5-5', cnName: '溧水区' },
          { id: '5-6', cnName: '六合区' },
          { id: '5-7', cnName: '栖霞区' },
          { id: '5-8', cnName: '雨花台区' },
          { id: '5-9', cnName: '玄武区' }
        ]
      },
      { id: 6, cnName: '南通市' },
      { id: 7, cnName: '宿迁市' },
      { id: 8, cnName: '苏州市' }
    ]
  }
]

export const areaTypeOptions = [
  { value: '10010001', label: '省' },
  { value: '10010002', label: '市' },
  { value: '10010003', label: '区(县)' }
]

export const rules = {
  areaNameCn: [
    { required: true, message: '请输入区域名称(中)', trigger: 'blur' }
  ],
  areaNameNo: [{ required: true, message: '请输入区域编号', trigger: 'blur' }],
  areaNameType: [
    { required: true, message: '请输入区域类型', trigger: 'change' }
  ]
}
