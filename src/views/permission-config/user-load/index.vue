<!--
 * @Description  : 现货交易-用户负荷
 * @Author       : 陈凯
 * @Date         : 2023-11-16 10:52:44
 * @LastEditors  : 陈凯
 * @LastEditTime : 2023-12-12 16:55:37
 * @FilePath     : \init-project\src\views\permission-config\user-load\index.vue
-->

<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="5.625rem"
        class="query-container relative card-container"
      >
        <el-form-item label="区域" label-width="3.4rem">
          <el-select
            v-model="param"
            placeholder="请选择"
            size="small"
            @change="getPowerConsList"
          >
            <el-option
              v-for="dict in regionOption"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="电力用户" prop="uniqueIdentifications">
          <el-select
            v-model="queryParams.uniqueIdentifications"
            placeholder="请选择电力用户"
            clearable
            multiple
            collapse-tags
            @change="getList"
          >
            <el-option
              v-for="dict in userOptions"
              :key="dict.uniqueIdentification"
              :label="dict.consName"
              :value="dict.uniqueIdentification"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            :picker-options="pickerOptions"
            @change="getList"
            v-model="queryParams.date"
            placeholder="选择时间"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <div class="absolute-top-right-10">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            class="inline-block margin-row-10"
            :http-request="handleImportUser"
            :before-upload="handleBeforeUpload"
          >
            <el-button icon="el-icon-download" size="mini" class="commonBtn"
              >用户导入</el-button
            >
          </el-upload>
          <el-button
            icon="el-icon-upload2"
            size="mini"
            class="commonBtn"
            @click="handleExport"
            >导出</el-button
          >
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="getList"
            @keyup.enter="getList"
            >查询</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 表格 -->
    <div
      class="card-container margin-top-10 flex_row_c"
      style="height: calc(100% - 4.5rem)"
      v-loading="loading"
    >
      <echarts-chart
        v-if="lineOption.series"
        id="echart"
        style="width: 100%; height: calc(100%)"
        :option="lineOption"
      />
      <el-empty v-else description="暂无数据"></el-empty>
    </div>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import echartsChart from '@/components/EchartsChart/index.vue';
import HttpUrl from '@/api/permission/userLoad';

export default {
  name: 'dictionaryManagement',
  components: { elementTable, elementDialog, echartsChart },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      queryParams: {
        uniqueIdentifications: [],
        date: this.getYearMonthDay(new Date()),
      },
      userOptions: [],
      lineOption: {},
      loading: false,
      regionOption: [],
      param: '0',
    };
  },

  mounted() {
    // 区域
    this.getSelectOptons('region').then(res => {
      this.regionOption = res.data;
    });
    window.addEventListener('setItem', () => {
      this.getList();
    });
    this.getPowerConsList();
  },
  methods: {
    // 电力用户下拉
    getPowerConsList() {
      this.queryParams.uniqueIdentifications = [];
      HttpUrl.queryPowerConsList({ param: this.param }).then(res => {
        this.userOptions = res.data;
      });
    },
    // 请求表格数据
    getList() {
      this.lineOption = {};
      this.loading = true;
      HttpUrl.queryConsPowerCurveDetail(this.queryParams).then(res => {
        if (res.data.length > 0) {
          let xData = res.data[0].timeStamp;
          let series = res.data.map(e => {
            return {
              name: e.consName,
              type: 'line',
              smooth: 0.5,
              symbol: null,
              symbolSize: 0,
              data: e.powerLineLoad,
              connectNulls: true,
            };
          });
          this.lineOption = {
            color: [
              '#F4A651',
              '#F4D951',
              '#425AED',
              '#429EED',
              '#A349A4',
              '#15796A',
              '#583c87',
            ],
            tooltip: {
              trigger: 'axis',
              color: this.fontColor,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderColor: 'gray',
              textStyle: {
                color: '#fff',
                fontSize: this.echartFontSize(14),
              },
              formatter: function (params) {
                var relVal = params[0].axisValueLabel;
                for (var i = 0, l = params.length; i < l; i++) {
                  if (typeof params[i].value === 'undefined') {
                    params[i].value = ' ';
                  }
                  relVal +=
                    '<br/>' +
                    params[i].marker +
                    params[i].seriesName +
                    ' : ' +
                    params[i].value +
                    '(MWh)';
                }
                return relVal;
              },
            },
            grid: {
              left: '2%',
              right: '5%',
              bottom: '5px',
              top: '10%',
              containLabel: true,
            },
            legend: {
              top: -10,
              right: 'center',
              padding: [20, 0, 0, 0],
              icon: 'rect',
              itemHeight: this.echartFontSize(5), //修改icon图形大小
              itemWidth: this.echartFontSize(16), //修改icon图形大小
              itemGap: this.echartFontSize(10),
              textStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(14),
              },

              // data: ['实际负荷', '基线负荷', '调节计划', '响应负荷'],
            },
            xAxis: {
              type: 'category',
              data: xData,
              splitLine: {
                show: false,
                lineStyle: {
                  opacity: 0.2,
                  color: this.fontColor,
                },
              },
              axisLabel: {
                interval: 7,
                color: this.fontColor,
                fontSize: this.echartFontSize(14),
                margin: this.echartFontSize(15),
              },
              nameTextStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(14),
              },
            },
            yAxis: {
              type: 'value',
              name: '单位:MWh',
              splitLine: {
                show: false,
                lineStyle: {
                  opacity: 0.2,
                  color: this.fontColor,
                },
              },
              axisLabel: {
                formatter: '{value}',
                color: this.fontColor,
                fontSize: this.echartFontSize(14),
              },
              nameTextStyle: {
                color: this.fontColor,
                fontSize: this.echartFontSize(14),
              },
            },
            dataZoom: {
              type: 'inside',
            },
            series: series,
          };
          this.loading = false;
        } else {
          this.$message.error('暂无数据');
          this.loading = false;
        }
      });
    },

    // 用户导入
    handleImportUser(option) {
      const fileForm = new FormData();
      fileForm.append('file', option.file);
      document.querySelector('.el-upload-list').style.display = 'none';
      HttpUrl.importPowerCons(fileForm, url => url, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('电力用户导入成功');
          this.getList();
        }
      });
    },
    // 表格导出
    handleExport() {
      HttpUrl.exportToExcel(this.queryParams, '', {
        responseType: 'blob',
      }).then(res => {
        this.exportExcel(
          res,
          decodeURIComponent(res.contentDisposition.split('=')[1]),
          ''
        );
        this.$message.success('导出成功');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload,
::v-deep .el-upload-dragger {
  width: 100% !important;
}

::v-deep .query-container .el-form-item {
  width: 22%;
}

::v-deep .query-container .el-form-item__content {
  width: calc(100% - 5.625rem);
}
</style>
