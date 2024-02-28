<!--
 * @Description  : 企业档案
 * @Author       : 陈凯
 * @Date         : 2023-08-11 17:32:29
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-28 09:09:36
 * @FilePath     : \foushan-system\src\views\file-management\enterprise-file\index.vue
-->
<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        ref="formDom"
        :model="queryParams"
        :inline="true"
        label-width="5.625rem"
        class="query-container relative card-container"
        @submit.native.prevent
      >
        <el-form-item label="户号/户名" prop="roleName">
          <el-input
            v-model="queryParams.consNo"
            placeholder="请输入户号或户名"
            clearable
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>

        <el-form-item label="地区" prop="roleKey">
          <el-select v-model="queryParams.city" placeholder="请选择" clearable>
            <el-option
              v-for="dict in cityList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型" prop="tradeCate">
          <el-select
            v-model="queryParams.tradeCate"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in consumerTradeCateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="接入日期" prop="createDate">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="dateRange"
            placeholder="选择开始和结束时间"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <div class="float-right padding-top-5">
          <el-button
            icon="el-icon-search"
            type="primary"
            size="mini"
            @click="handleSearch"
            >查询</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            class="commonBtn"
            @click="refreshData"
            >重置</el-button
          >
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            class="inline-block margin-row-10"
            :http-request="handleImport"
            :before-upload="handleBeforeUpload"
          >
            <el-button icon="el-icon-download" size="mini" class="commonBtn"
              >导入</el-button
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
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
            >新增</el-button
          >
        </div>
      </el-form>
    </div>
    <!-- 表格 -->
    <div
      class="card-container margin-top-10"
      :style="{
        height: this.isFold ? 'calc(100% - 4.5rem )' : 'calc(100% - 7.125rem)',
      }"
    >
      <element-table
        :loading="loading"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :paginationConfig="queryParams"
        :showSelect="true"
        @page-current-change="handlePageCurrentChange"
        @pageNum-current-change="handleNumChange"
        @selectionChange="selectionChange"
        @sortChange="sortChange"
        @cell-click="cellClick"
      >
        <template #end>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding"
            :width="echartFontSize(290)"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                style="margin-right: 10px"
                icon="el-icon-view"
                class="tableBtn"
                @click="handleEdit(scope.row, 1)"
                >详情</el-button
              >
              <el-button
                size="mini"
                style="margin-right: 10px"
                icon="el-icon-edit"
                class="tableBtn"
                @click="handleEdit(scope.row, 2)"
                >修改</el-button
              >
              <el-button
                size="mini"
                icon="el-icon-delete"
                class="tableDeleteBtn"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
      </element-table>
    </div>
    <!-- 新增编辑弹窗 -->
    <element-dialog
      width="55%"
      :title="title"
      v-model="showDialog"
      ref="elementDialog"
      @submit="handleSubmit"
      :showFooter="dialogType != 1"
    >
      <el-form
        ref="myform"
        :model="form"
        :rules="rules"
        label-width="9.3rem"
        class="flex_row_s flex_wrap dialogForm"
      >
        <el-form-item label="户号" prop="consNo">
          <el-input
            type="number"
            :disabled="dialogType == 1"
            v-model="form.consNo"
            placeholder="请输入户号"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input
            :disabled="dialogType == 1"
            v-model="form.name"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="社会统一编码" prop="certNo">
          <el-input
            :disabled="dialogType == 1"
            v-model="form.certNo"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="用户类型" prop="tradeCate">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.tradeCate"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in consumerTradeCateOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="档案状态" prop="archiveStatus">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.archiveStatus"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in archivesStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="容量(kW)" prop="powerReceivingCapacity">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            :disabled="dialogType == 1"
            v-model="form.powerReceivingCapacity"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="安保负荷(kW)">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            :disabled="dialogType == 1"
            v-model="form.retainedLoad"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input
            :disabled="dialogType == 1"
            v-model="form.contacts"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            type="number"
            :disabled="dialogType == 1"
            v-model="form.phone"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input
            :disabled="dialogType == 1"
            v-model="form.address"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="用户来源" prop="dataChannalType">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.dataChannalType"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in dataChannalTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="接入时间">
          <el-date-picker
            :disabled="dialogType == 1"
            :picker-options="pickerOptions"
            v-model="form.createDate"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item style="width: 32%" label="省" prop="province">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.province"
            placeholder="请选择"
            clearable
          >
            <el-option label="江苏省" value="320000" />
          </el-select>
        </el-form-item>
        <el-form-item style="width: 32%" label="市" prop="city">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.city"
            placeholder="请选择"
            clearable
            @change="changeCitys"
          >
            <el-option
              v-for="dict in cityList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            /> </el-select
        ></el-form-item>
        <el-form-item style="width: 32%" label="区县" prop="district">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.district"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in areaList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            /> </el-select
        ></el-form-item>
        <el-form-item label="邮编">
          <el-input
            type="number"
            :disabled="dialogType == 1"
            v-model="form.zipcode"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="经度">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            :disabled="dialogType == 1"
            v-model="form.longitude"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="纬度">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            :disabled="dialogType == 1"
            v-model="form.lat"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="调节设备对象" prop="adjustEquipType">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.adjustEquipType"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in adjust_equip_type_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否参与市场化售电">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.isMarketizeSales"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in isMarketizeSalesOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否参与需求响应">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.isDrPart"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in isDrPartOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否参与辅助服务">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.isAsPart"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in isAsPartOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否参与预测">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.isFcst"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in isMarketizeSalesOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否是2023非工项目">
          <el-select
            :disabled="dialogType == 1"
            v-model="form.isNonIndustrial"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in isMarketizeSalesOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </element-dialog>
    <!-- 设备树弹窗 -->
    <element-dialog
      width="70%"
      :title="titleTree"
      v-model="showDialogTree"
      ref="elementDialogTree"
      dialog-class="treeBox"
      :showCloseButton="true"
    >
      <div
        class="flex_row_a width10"
        style="position: absolute; top: 60px; left: 10px"
      >
        <div
          class="flex_row_s"
          v-for="item in tree_colour_options"
          :key="item.dictValue"
        >
          <div
            :style="{
              width: '0.9rem',
              height: '0.9rem',
              backgroundColor: item.dictLabel,
            }"
          ></div>
          <span>{{ item.dictValue == 1 ? '正常' : '离线' }}</span>
        </div>
      </div>
      <div style="height: 500px; overflow-y: scroll" v-loading="treeLoading">
        <echartsChart
          v-if="showChart"
          id="echart"
          :height="treeHeight"
          :option="treeOption"
          @getChartHeight="getChartHeight"
          @echartClick="echartClick"
        />
      </div>
    </element-dialog>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import echartsChart from '../component/echartsChartTree.vue';
import HttpUrl from '@/api/file-management/enterpriseFile';
import areaUrl from '@/api/areaManage/index';

export default {
  name: 'EnterpriseFile',
  components: { elementTable, elementDialog, echartsChart },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      isFold: true,
      loading: false,
      tradeCateOptions: [],
      // 表格
      tableDataSelectOptions: [],
      tableData: [],
      tableColumns: [
        {
          label: '用户名',
          prop: 'name',
          sortable: 'custom',
        },
        {
          label: '户号',
          prop: 'consNo',
          sortable: 'custom',
        },
        {
          label: '地区',
          prop: 'city',
          sortable: 'custom',
        },
        {
          label: '用户类型',
          prop: 'tradeCate',
          sortable: 'custom',
        },
        {
          label: '用户状态',
          prop: 'archiveStatus',
          sortable: 'custom',
        },
        {
          label: '容量(kW)',
          prop: 'powerReceivingCapacity',
          sortable: 'custom',
        },

        {
          label: '设备数量',
          prop: 'num',
          sortable: 'custom',
        },

        {
          label: '接入日期',
          prop: 'createDate',
          sortable: 'custom',
        },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      // 弹窗
      title: '',
      showDialog: false,
      titleTree: '',
      showDialogTree: false,
      treeOption: {},
      form: { consNo: '' },
      // 表单校验
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        consNo: [{ required: true, message: '请输入', trigger: 'blur' }],
        tradeCate: [{ required: true, message: '请选择', trigger: 'change' }],
        ownerKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        province: [{ required: true, message: '请输入', trigger: 'change' }],
        city: [{ required: true, message: '请输入', trigger: 'change' }],
        district: [{ required: true, message: '请输入', trigger: 'change' }],
        certNo: [{ required: true, message: '请输入', trigger: 'blur' }],
        tradeCate: [{ required: true, message: '请选择', trigger: 'change' }],
        archiveStatus: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        powerReceivingCapacity: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        retainedLoad: [{ required: true, message: '请输入', trigger: 'blur' }],
        contacts: [{ required: true, message: '请输入', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入', trigger: 'blur' }],
        address: [{ required: true, message: '请输入', trigger: 'blur' }],
        dataChannalType: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        createDate: [{ required: true, message: '请选择', trigger: 'change' }],
        isMarketizeSales: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        isDrPart: [{ required: true, message: '请选择', trigger: 'change' }],
        isAsPart: [{ required: true, message: '请选择', trigger: 'change' }],
        isFcst: [{ required: true, message: '请选择', trigger: 'change' }],
        isNonIndustrial: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        adjustEquipType: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
      },
      consumerTradeCateOptions: [], //用户类型
      archivesStatusOptions: [], //档案状态
      dataChannalTypeOptions: [], //用户来源
      isDrPartOptions: [], //是否参与需求响应
      isAsPartOptions: [], //是否参与辅助服务
      isMarketizeSalesOptions: [], //是否参与市场化售电
      dialogType: 1,
      tree_colour_options: [],
      adjust_equip_type_options: [],
      showChart: true,
      treeHeight: '100%',
      treeImg: {
        tree1:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree1.png')
            : require('../../../assets/load-monitor/tree11.png'),
        tree2:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree2.png')
            : require('../../../assets/load-monitor/tree22.png'),
      },
      treeLoading: false,
    };
  },
  watch: {
    treeHeight: {
      handler(newVal, oldVal) {
        this.showChart = false;
        setTimeout(() => {
          this.showChart = true;
        }, 100);
      },
    },
  },
  mounted() {
    // 档案状态
    this.getSelectOptons('archives_status').then(res => {
      this.archivesStatusOptions = res.data;
    });
    // 用户来源
    this.getSelectOptons('data_channal_type').then(res => {
      this.dataChannalTypeOptions = res.data;
    });
    // 用户类型
    this.getSelectOptons('consumer_trade_cate').then(res => {
      this.consumerTradeCateOptions = res.data;
    });
    // 是否参与需求响应
    this.getSelectOptons('is_dr_part').then(res => {
      this.isDrPartOptions = res.data;
    });
    // 是否参与辅助服务
    this.getSelectOptons('is_as_part').then(res => {
      this.isAsPartOptions = res.data;
    });
    // 是否参与市场化售电
    this.getSelectOptons('yes_or_no').then(res => {
      this.isMarketizeSalesOptions = res.data;
    });
    // 调节对象
    this.getSelectOptons('adjust_equip_type').then(res => {
      this.adjust_equip_type_options = res.data;
    });
    // 设备数颜色
    this.getSelectOptons('tree_colour').then(res => {
      this.tree_colour_options = res.data;
    });
    window.addEventListener('setItem', () => {
      this.treeImg = {
        tree1:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree1.png')
            : require('../../../assets/load-monitor/tree11.png'),
        tree2:
          sessionStorage.getItem('themeColor') == 'black'
            ? require('../../../assets/load-monitor/tree2.png')
            : require('../../../assets/load-monitor/tree22.png'),
      };
    });
    this.getCityList();
    this.getList();
  },
  methods: {
    // 请求表格数据
    getList() {
      if (this.dateRange) {
        this.queryParams.createStartDate = this.dateRange[0];
        this.queryParams.createEndDate = this.dateRange[1];
      }
      // this.loading = true;
      // HttpUrl.listConsumer(this.queryParams).then(res => {
      //   this.tableData = res.data.data;
      //   this.$nextTick(() => {
      //     this.queryParams.total = res.data.total;
      //   });
      //   this.loading = false;
      //   if (this.tableData.length == 0 && this.queryParams.pageNum > 1) {
      //     this.queryParams.pageNum = this.queryParams.pageNum - 1;
      //     this.getList();
      //   }
      // });

      let res = {
        message: '成功',
        code: 200,
        data: {
          pageNum: 1,
          pageSize: 10,
          total: 878,
          data: [
            {
              id: 10000000004,
              name: '',
              consNo: '3203002625815',
              city: '顺德',
              tradeCate: '商业及服务',
              consStatus: '运营',
              dataChannalType: '物联平台',
              powerReceivingCapacity: 1280.0,
              num: 11,
              archiveStatus: '已入库',
              createTime: null,
              createDate: '2023-09-07',
              accuracy: null,
              fcstDate: null,
              consNowStatus: null,
              adjustEquipType: '空调',
            },
            {
              id: 100000000106,
              name: '',
              consNo: '3200157122930',
              city: '高明',
              tradeCate: '商业及服务',
              consStatus: '运营',
              dataChannalType: '物联平台',
              powerReceivingCapacity: 2500.0,
              num: 3,
              archiveStatus: '已入库',
              createTime: null,
              createDate: '2023-08-14',
              accuracy: null,
              fcstDate: null,
              consNowStatus: null,
              adjustEquipType: '空调',
            },
            {
              id: 100000000107,
              name: '',
              consNo: '3200141008268',
              city: '禅城',
              tradeCate: '电网资源',
              consStatus: '运营',
              dataChannalType: '物联平台',
              powerReceivingCapacity: 9000.0,
              num: 6,
              archiveStatus: '已入库',
              createTime: null,
              createDate: '2022-08-18',
              accuracy: null,
              fcstDate: null,
              consNowStatus: null,
              adjustEquipType: '空调',
            },
            {
              id: 100000000108,
              name: '',
              consNo: '3200156983437',
              city: '南海',
              tradeCate: '商业及服务',
              consStatus: '运营',
              dataChannalType: '物联平台',
              powerReceivingCapacity: 7200.0,
              num: 3,
              archiveStatus: '已入库',
              createTime: null,
              createDate: '2023-07-20',
              accuracy: null,
              fcstDate: null,
              consNowStatus: null,
              adjustEquipType: '空调',
            },
            {
              id: 100000000109,
              name: '',
              consNo: '3203002128205',
              city: '三水',
              tradeCate: '商业及服务',
              consStatus: '运营',
              dataChannalType: '物联平台',
              powerReceivingCapacity: 2000.0,
              num: 3,
              archiveStatus: '已入库',
              createTime: null,
              createDate: '2023-08-14',
              accuracy: null,
              fcstDate: null,
              consNowStatus: null,
              adjustEquipType: '空调',
            },
          ],
        },
      };
      this.$nextTick(() => {
        this.queryParams.total = res.data.total;
      });
      this.tableData = res.data.data;
    },
    // 表格查询
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 刷新
    refreshData() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      };
      this.getList();
    },
    // 表格多选
    selectionChange(e) {
      this.tableDataSelectOptions = e ? e.map(val => val.id) : [];
    },
    // 通过id查询表格详情
    handleTableData(param) {
      HttpUrl.queryConsumer({ param }).then(res => {
        if (res.code == 200) {
          this.getAreaList(res.data.city ? res.data.city : 320100);
          this.form = res.data;
        }
      });
    },
    // 表格新增
    handleAdd() {
      this.dialogType = 3;
      this.title = '新增';
      this.form = {
        isFcst: '0',
      };

      this.showDialog = true;
    },
    // 表格修改
    handleEdit(row, type) {
      this.dialogType = type;
      this.row = {};
      this.handleTableData(row.id);
      this.title = row.name ? row.name : '修改';
      this.showDialog = true;
    },
    // 切换地区查询区县
    changeCitys(param) {
      areaUrl.getAreaListByParentId({ param }).then(res => {
        this.areaList = res.data;
      });
    },
    // 表格确认
    handleSubmit() {
      console.log(this.form);
      this.$refs['myform'].validate(valid => {
        if (valid) {
          HttpUrl.addAndUpdateConsumer(this.form).then(res => {
            if (res.code == 200) {
              let submitText = this.title == '新增' ? '新增成功' : '修改成功';
              this.$message.success(submitText);
              this.getList();
              this.$refs.elementDialog.handleCancel();
            }
          });
        } else {
          this.$message.warning('请按要求填写完整');
        }
      });
    },
    // 表格删除
    handleDelete(row) {
      this.$confirm('是否确认删除该用户信息?').then(() => {
        HttpUrl.deleteBatchConsumer({ params: [row.id] }).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.getList();
            if (this.tableData.length == 0 && this.queryParams.pageNum > 1) {
              this.queryParams.pageNum = this.queryParams.pageNum - 1;
              this.getList();
            }
          }
        });
      });
    },
    // 表格批量删除
    handleMoreDelete() {
      if (this.tableDataSelectOptions.length == 0) {
        this.$message.error('请选择需要删除的用户');
        return;
      }
      this.$confirm('是否确认删除已选中用户信息?').then(() => {
        HttpUrl.deleteBatchConsumer({
          params: this.tableDataSelectOptions,
        }).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.getList();
            if (this.tableData.length == 0 && this.queryParams.pageNum > 1) {
              this.queryParams.pageNum = this.queryParams.pageNum - 1;
              this.getList();
            }
          } else {
            this.$message.error(res.message + '无法删除！');
          }
        });
      });
    },
    // 表格导入
    handleImport(option) {
      const fileForm = new FormData();
      fileForm.append('file', option.file);
      document.querySelector('.el-upload-list').style.display = 'none';
      HttpUrl.importConsumerExcel(fileForm, url => url, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('企业信息导入成功');

          this.getList();
        }
      });
    },
    // 表格导出
    handleExport() {
      HttpUrl.consumerExport(this.queryParams, '', {
        responseType: 'blob',
      }).then(res => {
        this.exportExcel(res, '企业档案');
        this.$message.success('导出成功');
      });
    },
    handleTemplate() {
      HttpUrl.downloadFileRsConsumer('', '', {
        responseType: 'blob',
      }).then(res => {
        this.exportExcel(res, '企业档案模板', '');
        this.$message.success('下载成功');
      });
    },
    // 表格点击
    cellClick(row, col) {
      this.treeOption = {};
      if (col.property == 'num') {
        this.treeLoading = true;
        this.showDialogTree = true;
        this.titleTree = row.name + '设备树 详情';
        HttpUrl.queryEquipTree({ param: row.id }).then(res => {
          let treeData = this.treeRecursion(res.data);

          // treeData[0].label = { backgroundColor: '#f00' };
          this.treeOption = {
            series: [
              {
                name: '账户权限信息一览-数据库',
                type: 'tree',
                emphasis: {
                  scale: true,
                },
                orient: 'horizontal',
                edgeShape: 'polyline',
                top: '0%',
                left: '5%',
                right: '17%',
                bottom: '1%',
                initialTreeDepth: 3,
                expandAndCollapse: true,
                roam: false,
                symbolSize: 11,
                animationDuration: 0,
                label: {
                  padding: [5, 20, 5, 20],
                  fontSize: this.echartFontSize(12),
                  color: this.fontColor,
                  overflow: 'break',
                  position: 'right',
                  verticalAlign: 'middle',
                  lineHeight: this.echartFontSize(24),
                  offset: [-4, 0],
                  formatter: function (params) {
                    return [`{name|${params.data.name}}`, `{padding|}`].join(
                      ''
                    );
                  },
                  rich: {
                    name: {
                      fontSize: this.echartFontSize(12),
                      fontWeight: 'bold',
                      align: 'center',
                      padding: [5, 0, 5, 5],
                    },

                    padding: {
                      padding: [0, 0],
                    },
                  },
                },
                // leaves: {
                //   label: {
                //     position: 'right',
                //     verticalAlign: 'middle',
                //     align: 'left',
                //   },
                // },

                data: treeData,
              },
            ],
          };
          this.treeLoading = false;
        });
      }
    },
    treeRecursion(data) {
      let back1 = {
        backgroundColor: {
          image: this.treeImg.tree1,
        },
      };
      let back2 = {
        backgroundColor: {
          image: this.treeImg.tree2,
        },
      };
      for (let key in data) {
        if (
          data[key].label == null ||
          data[key].label.backgroundColor == '#1976D2'
        ) {
          data[key].label = back1;
          data[key].lineStyle = {
            color: '#1976D2',
          };
          data[key].itemStyle = {
            color: '#1976D2',
            borderWidth: '10',
          };
        }
        if (data[key].label.backgroundColor == '#FFA726') {
          data[key].label = back2;
          data[key].lineStyle = {
            color: '#FFA726',
          };
          data[key].itemStyle = {
            color: '#FFA726',
          };
        }
        if (data[key].children.length > 0) {
          this.treeRecursion(data[key].children);
        }
      }

      return data;
    },
    getChartHeight(val) {
      this.treeHeight = val > 10 ? 8 * val + '%' : '100%';
    },
    echartClick(e) {
      const flag = e.event.target.__proto__.constructor.name;
      console.log(flag);
      if (flag == 'Rect' || flag == 'TSpan') {
        this.$refs.elementDialogTree.handleCancel();
        this.$router.push({
          path: '/file-management/equipment-file',
          query: { equipNo: e.data.name },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .query-container .el-form-item {
  width: 17%;
}

::v-deep .query-container .el-form-item__content {
  width: calc(100% - 5.625rem);
}
</style>

<style>
.treeBox .el-dialog__body {
  padding: 0px !important;
}
</style>
