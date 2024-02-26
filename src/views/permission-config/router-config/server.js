export const tableColumnList = [
  { label: '路由名称', prop: 'cnName' },
  { label: '路由地址', prop: 'url' },
  { label: '请求路径', prop: 'paramValue' },
  { label: '重写路径', prop: 'RewriteValue' },
  { label: '操作', prop: 'action' }
]

export const tableDataList = Array(0)
  .fill('')
  .map((v, i) => {
    return {
      cnName: 'baidu',
      id: 911000000001 + i,
      param: {
        Path: { paramValue: '/DataPush/**' },
        Rewrite: { pathValue: '/DataPush/**', RewriteValue: '/DataPush/**' }
      },
      type: 10220001,
      typeName: '',
      url: 'http://www.baidu.com'
    }
  })
