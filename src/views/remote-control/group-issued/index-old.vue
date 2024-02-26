<!--
 * @Description  : 群控下发
 * @Author       : 陈凯
 * @Date         : 2023-09-07 15:10:13
 * @LastEditors  : 陈凯
 * @LastEditTime : 2023-11-09 12:07:54
 * @FilePath     : \init-project\src\views\remote-control\group-issued\index-old.vue
-->

<template>
  <div class="app-container">
    <!-- 控制事件信息 -->
    <div class="topBox margin-bottom-15 border-radius-10 padding-15">
      <div class="headerTitle relative">
        控制事件信息
        <el-button
          style="position: absolute; right: 0; top: -5px"
          type="primary"
          size="mini"
          @click="handleGenerate"
          >生成下发数据</el-button
        >
      </div>
      <el-form
        :model="form"
        label-width="6.25rem"
        class="flex_row_a flex_wrap dialogForm"
        style="height: calc(100% - 30px)"
      >
        <el-form-item label="事件名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入事件名称" />
        </el-form-item>
        <el-form-item label="事件编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入事件编码" />
        </el-form-item>

        <el-form-item label="需求类型" prop="commandType">
          <el-select
            style="width: 220px"
            v-model="form.commandType"
            placeholder="请选择需求类型"
            clearable
          >
            <el-option
              v-for="dict in demandTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="群组名称" prop="groupId">
          <el-select
            v-model="form.groupId"
            style="width: 220px"
            placeholder="请选择群组名称"
          >
            <el-option
              v-for="dict in commandStrategyOptions"
              :key="dict.groupId"
              :label="dict.groupName"
              :value="dict.groupId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="需求功率(kW)" prop="loadValue">
          <el-input
            v-model="form.loadValue"
            placeholder="请输入需求功率"
            clearable
          />
        </el-form-item>
        <el-form-item label="参与方式" prop="takePartType">
          <el-select
            v-model="form.takePartType"
            style="width: 220px"
            placeholder="请选择参与方式"
          >
            <el-option
              v-for="dict in respTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
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
        <el-form-item> </el-form-item>
      </el-form>
    </div>
    <div class="bottomBox border-radius-10 padding-15">
      <div class="headerTitle margin-bottom-20">指令下发详情</div>
      <div class="cardInfor flex_row_c">
        <control-table
          v-if="tableData.length != 0"
          style="width: 100%"
          ref="userTable"
          :loading="loading"
          :showSelect="true"
          :pagination="false"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :paginationConfig="queryParams"
          :loadValue="form.loadValue"
          @selectionChange="selectionChange"
          @refreshActionData="refreshActionData"
        />
        <img
          v-else
          src="../../../assets/demand-response/请选择用户@2.png"
          height="60%"
        />
      </div>
    </div>
    <div class="margin-top-10 flex_row_c">
      <el-button type="primary" size="mini" @click="handleActionCommand"
        >指令下发</el-button
      >
    </div>
    <!-- 下发弹窗 -->
    <element-dialog
      width="70%"
      :title="title"
      v-model="showDialog"
      ref="elementDialog"
    >
    </element-dialog>
  </div>
</template>

<script>
import elementTransfer from '@/components/ElementTransfer/transferTable.vue';
import elementDialog from '@/components/ElementDialog/index.vue';
import HourMinuteSecond from '../components/hourMinuteS.vue';
import HttpUrl from '@/api/remote-control/group-issued';
import elementTable from '@/components/ElementTable/index_d.vue';
import ControlTable from '../components/controlTable.vue';

export default {
  name: 'eventCalendar',
  components: {
    ControlTable,
    elementDialog,
    elementTransfer,
    HourMinuteSecond,
    elementTable,
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
      demandTypeOptions: [],
      respTypeOptions: [],
      baselineDayArray: [
        this.getNextDate(new Date(), -4),
        this.getNextDate(new Date(), -3),
        this.getNextDate(new Date(), -2),
        this.getNextDate(new Date(), -1),
        new Date(),
      ], //基线日
      commandStrategyOptions: [],
    };
  },
  mounted() {
    // 需求类型
    this.getSelectOptons('demand_type').then(res => {
      this.demandTypeOptions = res.data;
    });
    // 参与类型
    this.getSelectOptons('resp_type').then(res => {
      this.respTypeOptions = res.data;
    });
    // 群组名称
    HttpUrl.getGroupList({ param: '' }).then(res => {
      this.commandStrategyOptions = res.data;
    });
  },

  methods: {
    // 重置
    reset() {
      this.form = {};
      this.tableData = [];
    },

    // 生成下发数据
    handleGenerate() {
      this.showDialog = true;
      // if (!this.form.name) {
      //   this.$message.warning('请填写事件名称');
      //   return;
      // }
      // if (!this.form.code) {
      //   this.$message.warning('请填写事件编码');
      //   return;
      // }
      // if (!this.form.commandType) {
      //   this.$message.warning('请选择需求类型');
      //   return;
      // }
      // if (!this.form.groupId) {
      //   this.$message.warning('请选择群组名称');
      //   return;
      // }
      // if (!this.form.loadValue) {
      //   this.$message.warning('请输入需求功率');
      //   return;
      // }
      // if (!this.form.takePartType) {
      //   this.$message.warning('请选择参与方式');
      //   return;
      // }
      // this.loading = true;
      // HttpUrl.insCtrlEvent(this.form).then(res => {
      //   this.tableData = res.data.allData;
      //   if (this.tableData.length == 0) {
      //     this.$message.error('抱歉，暂无数据');
      //   }
      //   this.form = res.data.ctrlEvent;
      //   this.tableData.forEach(val => {
      //     val.rate =
      //       Number((val.downLoad / this.form.loadValue) * 100).toFixed(2) + '%';
      //   });
      //   this.actionData = res.data.actionData;
      //   this.loading = false;
      //   this.$nextTick(() => {
      //     if (this.actionData) {
      //       this.actionData.forEach(item => {
      //         this.deleteUser(item.id);
      //       });
      //     }
      //   });
      // });
    },
    // 指令下发
    handleActionCommand() {
      this.groupResps = [];
      this.chooseNameName.forEach(val => {
        this.tableData.forEach(v => {
          if (val == v.id) {
            this.groupResps.push({
              city: v.city,
              consName: v.consName,
              consNo: v.consNo,
              downLoad: v.downLoad,
              id: v.id,
              loadValue: v.loadValue,
            });
          }
        });
      });
      this.$confirm('确定下发吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        HttpUrl.sendCtrlEvent({
          ctrlEvent: this.form,
          actionData: this.groupResps,
          allData: [],
        })
          .then(res => {
            if (res.code == 200) {
              this.$message.success('下发成功');
            }
          })
          .catch(err => {
            this.$message.error('下发失败');
          });
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
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.topBox {
  width: 100%;
  height: 13.75rem;
  @include background_color('layout_menu_submenu_item_bg');
  .eachCardInfor {
    width: 25%;
  }
}
.bottomBox {
  width: 100%;
  height: calc(100% - 16.875rem);
  @include background_color('layout_menu_submenu_item_bg');
}
::v-deep .el-form-item {
  width: 30%;
  .el-input {
    width: 13.75rem;
  }
}
::v-deep .el-table__body-wrapper {
  height: calc(100% - 3.75rem);
  overflow-y: scroll;
}
</style>
