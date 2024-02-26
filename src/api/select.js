import request from '@/api/request'
// 根据字典类型查询字典数据信息
export function getSelectOptons(dictType) {
    return request({
        url: process.env.VUE_APP_SERVER_PERFORM_API + '/SYS/sysDataDict/getSysDictDataByDictType',
        method: 'post',
        data: { param: dictType }
    })
}
// 查询地市接口
export function getAreaList() {
    return request({
        url: process.env.VUE_APP_SERVER_PERFORM_API + '/sysArea/getJSAreaList',
        method: 'post',
    })
}
// 根据地市查询区县
export function getAreaListByParentId(data) {
    return request({
        url: process.env.VUE_APP_SERVER_PERFORM_API + '/sysArea/getAreaListByParentId',
        method: 'post',
        data: data
    })
}
