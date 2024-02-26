/** 设备模板 */
import { getHttpService } from '@/api/request'
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/rsEquipment/'
class APIConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url
        this.method = method || 'post'
        this.notNeedToken = notNeedToken
    }
}

export const HttpUrl = {
    /** 查询离线设备的用户 */
    queryOutLineCons: new APIConfig('queryOutLineCons'),
    /** 查询某个用户下的离线设备 */
    queryOutLineEquipByConsId: new APIConfig('queryOutLineEquipByConsId'),
    /** 离线设备数量 */
    getOutLineEquipNum: new APIConfig('getOutLineEquipNum'),

}

export default getHttpService(HttpUrl)
