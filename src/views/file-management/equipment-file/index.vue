<!--
 * @Description  : 设备档案
 * @Author       : 陈凯
 * @Date         : 2023-08-14 18:25:10
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-28 09:12:38
 * @FilePath     : \foushan-system\src\views\file-management\equipment-file\index.vue
-->

<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <div ref="form">
      <el-form
        :model="queryParams"
        :inline="true"
        label-width="7.5rem"
        class="query-container relative card-container"
        @submit.native.prevent
      >
        <el-form-item label="设备名称/编号" prop="equipNo">
          <el-input
            v-model="queryParams.equipNo"
            placeholder="请输入设备名称/编号"
            clearable
            @input="onInput()"
            @clear="handleEmpty"
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>

        <el-form-item label="用户名称" prop="consName">
          <el-input
            v-model="queryParams.consName"
            placeholder="请输入用户名称"
            clearable
            @keyup.enter.native="handleSearch"
          />
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select
            v-model="queryParams.type"
            placeholder="请选择设备类型"
            clearable
          >
            <el-option
              v-for="dict in dev_type_options"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
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
                @click="handleEdit(scope.row)"
                >详情</el-button
              >
              <el-button
                size="mini"
                style="margin-right: 10px"
                icon="el-icon-edit"
                class="tableBtn"
                @click="handleEdit(scope.row)"
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
      :title="title"
      v-model="showDialog"
      ref="elementDialog"
      @submit="handleSubmit"
    >
      <el-form
        ref="myform"
        :model="form"
        :rules="rules"
        label-width="8.75rem"
        class="flex_row_a flex_wrap dialogForm"
      >
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备编号" prop="equipNo">
          <el-input v-model="form.equipNo" placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="用户名称" prop="consName">
          <!-- <el-input v-model="form.consName" placeholder="请输入户名" /> -->
          <el-select
            v-model="form.consName"
            placeholder="请选择户名"
            filterable
            @change="changeByNameOptions"
          >
            <el-option
              v-for="item in getConsByNameOptions"
              :key="item.consNo"
              :label="item.name"
              :value="item.consNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户编号" prop="consNo">
          <el-input
            type="number"
            disabled
            v-model="form.consNo"
            placeholder="请输入户号"
          />
        </el-form-item>

        <el-form-item label="上级设备">
          <el-select
            v-model="form.parentId"
            placeholder="请选择上级设备"
            filterable
            clearable
          >
            <el-option
              v-for="item in equipsByConsIdOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择设备类型" clearable>
            <el-option
              v-for="dict in dev_type_options"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="量测模型">
          <el-select
            v-model="form.equipMeasTmplId"
            placeholder="请选择量测模型"
            clearable
          >
            <el-option
              v-for="dict in dev_tem_options"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="档案状态" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择档案状态"
            clearable
          >
            <el-option
              v-for="dict in archives_status_options"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="额定功率(kW)" prop="ratedPower">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.ratedPower"
            placeholder="请输入额定功率(kW)"
          />
        </el-form-item>
        <el-form-item label="额定电压(kV)" prop="ratedVoltage">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.ratedVoltage"
            placeholder="请输入额定电压(kV)"
          />
        </el-form-item>
        <el-form-item label="额定电流(A)">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.ratedCurrent"
            placeholder="请输入额定电流(A)"
          />
        </el-form-item>
        <el-form-item label="容量(kW)" prop="ratedCapacity">
          <el-input
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="form.ratedCapacity"
            placeholder="请输入容量(kW)"
          />
        </el-form-item>
        <el-form-item label="数据来源" prop="dataChannelType">
          <el-select
            v-model="form.dataChannelType"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="dict in data_channal_type_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="安装位置">
          <el-input v-model="form.installAddr" placeholder="请输入安装位置" />
        </el-form-item>
        <el-form-item label="生产厂家">
          <el-input v-model="form.manufacturer" placeholder="请输入生产厂家" />
        </el-form-item>
        <el-form-item label="出厂日期">
          <el-date-picker
            :picker-options="pickerOptions"
            placeholder="请选择日期"
            v-model="form.factoryDate"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </el-form-item>
        <el-form-item label="是否可控" prop="isControl">
          <el-select v-model="form.isControl" placeholder="请选择" clearable>
            <el-option
              v-for="dict in yes_or_no_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否总表设备" prop="isAdjust">
          <el-select v-model="form.isAdjust" placeholder="请选择" clearable>
            <el-option
              v-for="dict in yes_or_no_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否计算总负荷" prop="isSum">
          <el-select v-model="form.isSum" placeholder="请选择" clearable>
            <el-option
              v-for="dict in yes_or_no_options"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item> </el-form-item>
        <el-form-item label="备注" style="width: 95%">
          <el-input
            type="textarea"
            autosize
            placeholder="无"
            v-model="form.isAsPart"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </element-dialog>
  </div>
</template>

<script>
import elementTable from '@/components/ElementTable/index_d.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import HttpUrl from '@/api/file-management/equipmentFile';
import dev_tmp_api from '@/api/measure-model/deviceTemplate';
import dict_api from '@/api/dictManage';

export default {
  name: 'EquipmentFile',
  components: { elementTable, elementDialog },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      isFold: true,
      loading: false,
      // 表格
      tableDataSelectOptions: [],
      tableData: [],
      tableColumns: [
        {
          label: '设备名称',
          prop: 'name',
          sortable: 'custom',
        },
        {
          label: '设备编号',
          prop: 'equipNo',

          sortable: 'custom',
        },
        {
          label: '用户名称',
          prop: 'consName',
          sortable: 'custom',
        },
        {
          label: '设备类型',
          prop: 'type',
          sortable: 'custom',
        },

        {
          label: '档案状态',
          prop: 'status',
          sortable: 'custom',
        },
        {
          label: '额定功率(kW)',
          prop: 'equipMeasTmplId',
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
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        equipNo: [{ required: true, message: '请输入', trigger: 'blur' }],
        consName: [{ required: true, message: '请输入', trigger: 'change' }],
        eleSales: [{ required: true, message: '请输入', trigger: 'blur' }],
        ownerKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        powerTypeKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        volLevelKey: [{ required: true, message: '请输入', trigger: 'blur' }],
        consNo: [{ required: true, message: '请输入', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择', trigger: 'change' }],
        type: [{ required: true, message: '请选择', trigger: 'change' }],
        equipMeasTmplId: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        status: [{ required: true, message: '请选择', trigger: 'change' }],
        ratedPower: [{ required: true, message: '请输入', trigger: 'blur' }],
        ratedVoltage: [{ required: true, message: '请输入', trigger: 'blur' }],
        ratedCurrent: [{ required: true, message: '请输入', trigger: 'blur' }],
        ratedCapacity: [{ required: true, message: '请输入', trigger: 'blur' }],
        dataChannelType: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
        installAddr: [{ required: true, message: '请输入', trigger: 'blur' }],
        manufacturer: [{ required: true, message: '请输入', trigger: 'blur' }],
        factoryDate: [{ required: true, message: '请选择', trigger: 'change' }],
        isControl: [{ required: true, message: '请选择', trigger: 'change' }],
        isAdjust: [{ required: true, message: '请选择', trigger: 'change' }],
        isSum: [{ required: true, message: '请选择', trigger: 'change' }],
      },
      dev_tem_options: [], //量测模型
      dev_type_options: [], //设备类型
      archives_status_options: [], //档案状态
      getConsByNameOptions: [],
      data_channal_type_options: [], //数据来源
      yes_or_no_options: [], //是否
      equipsByConsIdOptions: [],
    };
  },
  created() {
    this.getMeasOptions();
    this.getDevTypeOptions();
    this.getEquipTypeOptions();
  },
  mounted() {
    // 数据来源
    this.getSelectOptons('data_channal_type').then(res => {
      this.data_channal_type_options = res.data;
    });
    // 是否
    this.getSelectOptons('yes_or_no').then(res => {
      this.yes_or_no_options = res.data;
    });
    this.getConsByName();
    this.getList();
  },

  methods: {
    // 获取用户下拉
    getConsByName(param) {
      HttpUrl.getConsByName({ param }).then(res => {
        this.getConsByNameOptions = res.data;
      });
    },
    // 获取上级设备下拉
    queryEquipsByConsId(param) {
      HttpUrl.queryEquipsByConsId({ param }).then(res => {
        this.equipsByConsIdOptions = res.data;
      });
    },
    // 设备类型
    async getDevTypeOptions() {
      const res = await dict_api.getSysDictDataByDictType({
        param: 'equip_type',
      });
      if (res.code !== 200) return;
      this.dev_type_options = res.data.map(d => {
        return {
          value: d.dictValue,
          label: d.dictLabel,
        };
      });
    },
    // 档案状态
    async getEquipTypeOptions() {
      const res = await dict_api.getSysDictDataByDictType({
        param: 'archives_status',
      });
      if (res.code !== 200) return;
      this.archives_status_options = res.data.map(d => {
        return {
          value: d.dictValue,
          label: d.dictLabel,
        };
      });
    },
    // 量测模型
    async getMeasOptions() {
      const res = await dev_tmp_api.queryAllEquipMeasTmpl({
        name: '',
      });
      if (res.code !== 200) return;
      this.dev_tem_options = res.data.map(d => {
        return {
          value: d.id,
          label: d.name,
        };
      });
    },
    // 请求表格数据
    getList() {
      // if (this.$route.query.equipNo) {
      //   this.queryParams.equipNo = this.$route.query.equipNo;
      // }
      // if (this.dateRange) {
      //   this.queryParams.createStartDate = this.dateRange[0];
      //   this.queryParams.createEndDate = this.dateRange[1];
      // }
      // this.loading = true;
      // HttpUrl.equipList(this.queryParams).then(res => {
      //   this.tableData = res.data.data ?? [];
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
          total: 5253,
          data: [
            {
              id: 160000000009,
              equipNo: '080100000712',
              name: '设备1',
              consName: '',
              consNo: '3200155862993',
              consId: '100000000198',
              ratedPower: '7200.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-11-29',
              status: '已入库',
            },
            {
              id: 160000000010,
              equipNo: '080100000704',
              name: '设备2',
              consName: '',
              consNo: '3200155862993',
              consId: '100000000198',
              ratedPower: '7200.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-11-03',
              status: '已入库',
            },
            {
              id: 160000000011,
              equipNo: '080100000705',
              name: '设备3',
              consName: '',
              consNo: '3200155862993',
              consId: '100000000198',
              ratedPower: '7200.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-11-03',
              status: '已入库',
            },
            {
              id: 160000000012,
              equipNo: '080100000711',
              name: '设备4',
              consName: '',
              consNo: '3200155862993',
              consId: '100000000198',
              ratedPower: '7200.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-10-18',
              status: '已入库',
            },
            {
              id: 160000000013,
              equipNo: '080100001321',
              name: '设备5',
              consName: '',
              consNo: '3200157122930',
              consId: '100000000106',
              ratedPower: '2500.0',
              type: '储能设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-10-18',
              status: '已入库',
            },
            {
              id: 160000000014,
              equipNo: '080100000466',
              name: '设备6',
              consName: '',
              consNo: '3200157059676',
              consId: '100000000110',
              ratedPower: '6300.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-10-18',
              status: '已入库',
            },
            {
              id: 160000000015,
              equipNo: '080100001443',
              name: '设备7',
              consName: '',
              consNo: '3203002128205',
              consId: '100000000109',
              ratedPower: '2000.0',
              type: '储能设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-12-13',
              status: '已入库',
            },
            {
              id: 160000000016,
              equipNo: '080100000709',
              name: '设备8',
              consName: '',
              consNo: '3200155862993',
              consId: '100000000198',
              ratedPower: '7200.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-10-18',
              status: '已入库',
            },
            {
              id: 160000000017,
              equipNo: '080100000707',
              name: '设备9',
              consName: '',
              consNo: '3200155862993',
              consId: '100000000198',
              ratedPower: '7200.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-10-18',
              status: '已入库',
            },
            {
              id: 160000000018,
              equipNo: '080100001059',
              name: '设备10',
              consName: '',
              consNo: '3200156983437',
              consId: '100000000108',
              ratedPower: '7200.0',
              type: '其他设备',
              typeKey: null,
              equipMeasTmplId: '通用功率模板',
              equipMeasTmplIdKey: '1006',
              createDate: '2023-09-19',
              status: '已入库',
            },
          ],
        },
      };
      this.tableData = res.data.data ?? [];
      this.$nextTick(() => {
        this.queryParams.total = res.data.total;
      });
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
      HttpUrl.equipDetail({ param }).then(res => {
        if (res.code == 200) {
          this.form = res.data;
          this.queryEquipsByConsId(res.data.consId);
        }
      });
    },
    // 表格新增
    handleAdd() {
      this.title = '新增';
      this.form = {
        isAdjust: '0',
        isSum: '0',
      };
      this.showDialog = true;
    },
    // 表格修改
    handleEdit(row) {
      this.handleTableData(String(row.id));
      this.title = row.equipName || '修改';

      this.showDialog = true;
    },
    // 表格确认
    handleSubmit() {
      this.$refs['myform'].validate(valid => {
        if (valid) {
          HttpUrl.addOrUpdateEquip(this.form).then(res => {
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
        HttpUrl.deleteEquip({ params: [row.id] }).then(res => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.getList();
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
        HttpUrl.deleteEquip({ params: this.tableDataSelectOptions }).then(
          res => {
            if (res.code == 200) {
              this.$message.success('删除成功');
              this.getList();
            }
          }
        );
      });
    },
    // 表格导入
    handleImport(option) {
      const fileForm = new FormData();
      fileForm.append('file', option.file);
      document.querySelector('.el-upload-list').style.display = 'none';
      HttpUrl.importExcel(fileForm, url => url, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('设备信息导入成功');

          this.getList();
        }
      });
    },
    // 表格导出
    handleExport() {
      HttpUrl.exportEquip(this.queryParams, '', {
        responseType: 'blob',
      }).then(res => {
        this.exportExcel(res, '设备档案');
        this.$message.success('导出成功');
      });
    },
    handleTemplate() {
      HttpUrl.downloadFileRsEquip('', '', {
        responseType: 'blob',
      }).then(res => {
        this.exportExcel(res, '设备档案模板', '');
        this.$message.success('下载成功');
      });
    },
    changeByNameOptions(id) {
      this.form.consNo = id;
    },
    onInput() {
      this.$forceUpdate();
    },
    handleEmpty() {
      if (this.$route.query) {
        this.$router.push(this.$route.path);
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
  width: calc(100% - 7.5rem);
}
</style>
