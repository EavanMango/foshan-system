import { getHttpService } from '@/api/request';
const baseUrl = process.env.VUE_APP_SERVER_PERFORM_API + '/RS/yewu/';
class ApiConfig {
    constructor(url, method, notNeedToken = false) {
        this.url = baseUrl + url;
        this.method = method || 'post';
        this.notNeedToken = notNeedToken;
    }
}

export const HttpUrl = {


    // 业务视图信息
    queryAllDrAndAsInfo: new ApiConfig('queryAllDrAndAsInfo'),



};
export default getHttpService(HttpUrl);
