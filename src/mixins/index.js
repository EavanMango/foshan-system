import { DateUtil } from '@/utils/date-util'
import HttpUrl from '@/api/areaManage/index'


let mixin = {
    data() {
        return {
            fontColor:
                sessionStorage.getItem("themeColor") == "black" ? "#D0D6FF" : "#000",
            nowDate: new Date(),
            dateRange: '',
            cityList: [],
            areaList: [],
            formDomHeight: 0,

        }
    },
    mounted() {
        window.addEventListener("setItem", () => {
            this.fontColor = sessionStorage.getItem("themeColor") == "blue" ? "#000" : '#D0D6FF';
        });
    },
    methods: {
        // 重置
        reset() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                total: 0,
            }
            this.getList()
        },
        // 获取地区
        getCityList(key) {
            HttpUrl.getAreaListByParentId({ param: key ? key : 320000 }).then(res => {
                this.cityList = res.data
            });
        },
        // 获取区县
        getAreaList(key) {
            HttpUrl.getAreaListByParentId({ param: key }).then(res => {
                this.areaList = res.data
            });
        },
        // 年
        getYear(date) {
            return DateUtil.getYear(date)
        },
        getYearMonth(date) {
            return DateUtil.getYearMonth(date)
        },
        /** 获取年月  YYYY-MM*/
        getYearMonth(date) {
            return DateUtil.getYearMonth(date)
        },
        // 时间格式 YYYY-MM-DD
        getYearMonthDay(date) {
            return DateUtil.getYearMonthDay(date)
        },
        // 时间格式 YYYY-MM-DD HH:mm:ss
        getDateTimeSecond(date) {
            return DateUtil.getDateTimeSecond(date)
        },
        // 获取前后日期
        getNextDate(date, day) {
            return DateUtil.getNextDate(date, day)
        },
        // 表格页码切换
        handlePageCurrentChange(num) {
            this.queryParams.pageNum = num
            this.getList()
        },
        // 表格列表展示数量
        handleNumChange(num) {
            this.queryParams.pageNum = 1
            this.queryParams.pageSize = num
            this.getList()
        },
        // 表格排序
        sortChange(sortArr) {
            this.queryParams.sortList = sortArr
            this.getList()
        },
        // 弹窗表格页码切换
        handlePageCurrentChangeDialog(num) {
            this.queryParamsDialog.pageNum = num
            this.getListDialog()
        },
        // 弹窗表格列表展示数量
        handleNumChangeDialog(num) {
            this.queryParamsDialog.pageNum = 1
            this.queryParamsDialog.pageSize = num
            this.getListDialog()
        },
        // 弹窗表格排序
        sortChangeDialog(sortArr) {
            this.queryParamsDialog.sortList = sortArr
            this.getListDialog()
        },
        // 限制为xlsx
        handleBeforeUpload(file) {
            const filetype = file.name.toString().replace(/.+\./, "");
            if (filetype.toLowerCase() == "xlsx" || filetype.toLowerCase() == "xls") {
                return true;
            } else {
                this.$message.warning("请上传后缀名为xlsx的附件");
                return false;
            }
        },
        // 限制为PDF
        handleBeforeUploadPdf(file) {
            const filetype = file.name.toString().replace(/.+\./, "");
            if (filetype.toLowerCase() == "pdf" || filetype.toLowerCase() == "PDF") {
                return true;
            } else {
                this.$message.warning("请上传后缀名为pdf的附件");
                return false;
            }
        },
        // 限制为照片
        handleBeforeUploadPhoto(file) {
            const filetype = file.name.toString().replace(/.+\./, "");
            if (filetype.toLowerCase() == "png" || filetype.toLowerCase() == "jpg" || filetype.toLowerCase() == "gif" || filetype.toLowerCase() == "jpeg") {
                return true;
            } else {
                this.$message.warning("请上传后缀名为png、jpg、gif、jpeg的图片格式");
                return false;
            }
        },
        // excel导出
        exportExcel(data, name, time) {
            let filename = name
            let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            let Exp = /[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g;
            let nowTime = this.getYearMonthDay(new Date()).replace(Exp, "");
            a.download = time != null ? filename + time : filename + nowTime
            a.click()
        },
        // 查找数组索引
        getIndex(arr, num) {
            let index = arr.findIndex((element) => {
                return element == num
            })
            return index;
        },
        //两个数组去重
        arrayDeduplicate(e, v) {
            let arr = []
            e.forEach(val => {
                if (JSON.stringify(v).includes(JSON.stringify(val)) === false) {
                    arr.push(val);
                }
            });
            return arr
        },
        // 获取当前时间编码
        getNowDateCode() {
            let Exp = /[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g;
            let nowTime = this.getDateTimeSecond(new Date()).replace(Exp, '');
            return nowTime.replace(/\s+/g, '')
        },

        // 获取前后日期
        getNextDate(date, day) {
            return DateUtil.getNextDate(date, day)
        },
        // echart字体
        echartFontSize(res) {
            const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (!clientWidth) return;
            let fontSize = clientWidth / 1920;
            return res * fontSize;
        },
        // 生成时间段[00:00-23:55]
        generateTimeArray() {
            var times = [];
            for (var hour = 0; hour < 24; hour++) {
                for (var minute = 0; minute < 60; minute += 15) {
                    var formattedHour = ('0' + hour).slice(-2);
                    var formattedMinute = ('0' + minute).slice(-2);
                    times.push(formattedHour + ':' + formattedMinute);
                }
            }
            times.push('24:00')
            return times;
        }
    }
}
export default mixin
