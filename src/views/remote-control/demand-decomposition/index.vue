<!--
 * @Description  : 需求分解
 * @Author       : 陈凯
 * @Date         : 2023-11-27 17:37:53
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-01 11:01:08
 * @FilePath     : \init-project\src\views\remote-control\demand-decomposition\index.vue
-->

<template>
  <div class="app-container">
    <!-- 控制事件信息 -->
    <div class="topBox margin-bottom-10 border-radius-10 padding-15">
      <div class="headerTitle relative">
        需求分解信息
        <el-button
          style="position: absolute; right: 0; top: -5px"
          type="primary"
          size="mini"
          @click="handleGenerate"
          >需求分解</el-button
        >
      </div>
      <el-form
        :model="form"
        label-width="7.25rem"
        class="flex_row_a flex_wrap"
        style="height: calc(100% - 30px)"
      >
        <el-form-item label="需求功率(kW)" prop="loadValue">
          <el-input
            v-model="form.loadValue"
            placeholder="请输入需求功率"
            clearable
          />
        </el-form-item>

        <el-form-item label="开始时间">
          <hourMinuteSecond
            style="width: 13.75rem"
            :atDate="form.startTime"
            @handleDate="handleStartDate"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <hourMinuteSecond
            style="width: 13.75rem"
            :atDate="form.endTime"
            @handleDate="handleEndDate"
          />
        </el-form-item>
        <el-form-item label="地市">
          <el-select v-model="form.city" placeholder="请选择" clearable>
            <el-option
              v-for="dict in cityList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottomBox border-radius-10 padding-15" v-loading="loading">
      <div class="headerTitle margin-bottom-20">分解用户详情</div>
      <div class="cardInforBottom flex_row_c">
        <control-table
          v-if="tableData.length != 0"
          style="width: 100%"
          ref="userTable"
          :showSelect="true"
          :pagination="false"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :paginationConfig="queryParams"
          :loadValue="form.loadValue"
          @page-current-change="handlePageCurrentChange"
          @pageNum-current-change="handleNumChange"
          @selectionChange="selectionChange"
          @refreshActionData="refreshActionData"
        >
        </control-table>
        <img
          v-else
          src="../../../assets/demand-response/请选择用户@2.png"
          height="60%"
        />
      </div>
      <div class="margin-top-10 flex_row_c">
        <el-button type="primary" size="mini" @click="handleActionCommand"
          >群组生成</el-button
        >
      </div>
    </div>

    <!-- 新增编辑弹窗 -->
    <element-dialog
      title="新增"
      width="30%"
      v-model="showDialog"
      @submit="handleSubmit"
    >
      <el-form
        class="dialogForm"
        ref="formRef"
        :rules="rules"
        label-width="6.25rem"
        :model="formData"
      >
        <el-form-item label="群组编码" prop="groupCode">
          <el-input v-model="formData.groupCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="群组名称" prop="groupName">
          <el-input v-model="formData.groupName" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </element-dialog>
  </div>
</template>

<script>
import elementTransfer from '@/components/ElementTransfer/transferTable.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import HourMinuteSecond from '../components/hourMinuteS.vue';
import HttpUrl from '@/api/remote-control/group-issued';
import ControlTable from '../components/controlTable.vue';

export default {
  name: 'eventCalendar',
  components: {
    ControlTable,
    elementDialog,
    elementTransfer,
    HourMinuteSecond,
  },

  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      form: {
        startTime: this.getYearMonthDay(new Date()) + ' 00:00:00',
        endTime: this.getYearMonthDay(new Date()) + ' 00:00:00',
      },
      // 表格
      loading: false,
      userNum: 0,
      tableData: [],
      actionData: [],
      tableColumns: [
        {
          label: '用户名称',
          prop: 'consName',
          width: '230',
        },
        {
          label: '户号',
          prop: 'consNo',
        },
        {
          label: '地市',
          prop: 'city',
        },
        {
          label: '基线负荷(kW)',
          prop: 'loadValue',
        },

        {
          label: '本次调节负荷(kW)',
          prop: 'downLoad',
        },
        {
          label: '调节占比(%)',
          prop: 'rate',
        },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      chooseNum: '',
      chooseNameName: [],
      chooseCurveNum: '',
      groupResps: [],
      title: '事件',
      showDialog: false,
      formData: { groupCode: '', groupName: '' },
      rules: {
        groupCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        groupName: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
    };
  },
  mounted() {
    this.getCityList();
  },

  methods: {
    // 重置
    reset() {
      this.form = {};
      this.tableData = [];
    },

    // 生成下发数据
    handleGenerate() {
      if (!this.form.loadValue) {
        this.$message.warning('请输入需求功率');
        return;
      }
      if (!this.form.city) {
        this.$message.warning('请选择地市');
        return;
      }
      this.loading = true;
      HttpUrl.breakConsLoads(this.form).then(res => {
        this.tableData = res.data.allData;
        if (this.tableData.length == 0) {
          this.$message.error('抱歉，暂无数据');
        }
        // this.form = res.data.ctrlEvent;
        // this.tableData.forEach(val => {
        //   val.rate =
        //     Number((val.downLoad / this.form.loadValue) * 100).toFixed(2) + '%';
        // });
        this.actionData = res.data.actionData;
        this.$message.success('数据获取成功');
        this.loading = false;
        this.$nextTick(() => {
          if (this.actionData) {
            this.actionData.forEach(item => {
              this.deleteUser(item.id);
            });
          }
        });
      });
    },
    // 指令下发
    handleActionCommand() {
      if (this.tableData.length == 0) {
        this.$message.error('请先选择用户');
        return;
      }
      this.$confirm('确定生成吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.showDialog = true;
        // HttpUrl.brakeToGenGroup({
        //   consIds: this.chooseNameName,
        //   actionData: this.groupResps,
        //   allData: [],
        // })
        //   .then(res => {
        //     if (res.code == 200) {
        //       this.$message.success('下发成功');
        //     }
        //   })
        //   .catch(err => {
        //     this.$message.error('下发失败');
        //   });
      });
    },

    handleStartDate(date) {
      this.form.startTime = date;
    },
    handleEndDate(date) {
      this.form.endTime = date;
    },
    // 表格选中
    selectionChange(val) {
      this.chooseNum = val.length;
      this.actionData = val;
      this.chooseNameName = val.map(item => item.id);
      let chooseCurve = 0;
      val.forEach(e => {
        chooseCurve += Number(e.downLoad);
      });
      this.chooseCurveNum = chooseCurve.toFixed(2);
    },
    // 刷新勾选数据
    refreshActionData(row) {
      this.$nextTick(() => {
        document.querySelector('.el-table__body-wrapper').scrollTop =
          this.scrollTop;
        this.tableData.forEach(val => {
          val.rate =
            Number((val.downLoad / this.form.loadValue) * 100).toFixed(2) + '%';
        });
        if (this.actionData) {
          this.actionData.forEach(element => {
            this.deleteUser(element.id);
          });
        }
      });
    },
    // 删除已勾选用户
    deleteUser(val) {
      let delIndex = this.tableData.findIndex(item => item.id == val);
      this.$refs.userTable.toggleSelection([this.tableData[delIndex]]);
    },

    handleSubmit() {
      this.$refs['formRef'].validate(valid => {
        if (valid) {
          HttpUrl.brakeToGenGroup({
            consIds: this.chooseNameName,
            groupCode: this.formData.groupCode,
            groupName: this.formData.groupName,
          }).then(res => {
            if (res.code == 200) {
              this.showDialog = false;
              this.$message.success('群组生成成功');
              this.$router.push('/remote-control/group-control');
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.topBox {
  width: 100%;
  height: 7rem;
  @include background_color('layout_menu_submenu_item_bg');
  .eachCardInfor {
    width: 25%;
  }
}
.bottomBox {
  width: 100%;
  height: calc(100% - 7.625rem);
  @include background_color('layout_menu_submenu_item_bg');
}
.dialogForm {
  .el-form-item {
    width: 100% !important;
  }
}
.cardInforBottom {
  height: calc(100% - 5rem);
}
::v-deep .el-form-item {
  width: 24%;
  .el-input {
    width: calc(100% - 1.25rem);
  }
}
::v-deep .el-table__body-wrapper {
  height: calc(100% - 3.75rem);
  overflow-y: scroll;
}
::v-deep .el-input--suffix .el-input__inner {
  padding-left: 0.6rem !important;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 1.3rem !important;
}
</style>
