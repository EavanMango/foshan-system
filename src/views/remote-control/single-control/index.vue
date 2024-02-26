<!--
 * @Description  : 空调控制
 * @Author       : 陈凯
 * @Date         : 2023-08-30 16:13:56
 * @LastEditors  : 陈凯
 * @LastEditTime : 2024-02-01 10:51:06
 * @FilePath     : \init-project\src\views\remote-control\single-control\index.vue
-->

<template>
  <div class="app-container relative">
    <div class="changeBtn">
      <div
        class="card flex_row_c"
        :class="{ hasChoose: whichShow == 1 }"
        @click="whichShow = 1"
      >
        <img src="../../../assets/remote-control/卡片-白.png" height="60%" />
      </div>
      <div
        class="table flex_row_c"
        :class="{ hasChoose: whichShow == 2 }"
        @click="whichShow = 2"
      >
        <img src="../../../assets/remote-control/表格-白.png" height="60%" />
      </div>
    </div>
    <!-- 标注 -->
    <div
      class="absolute-top-right-10 flex_row_a"
      style="font-family: 'ysbth'"
      v-if="whichShow == 1"
    >
      <div class="flex_row_s">
        <div
          class="margin-right-10"
          style="width: 0.9rem; height: 0.9rem; background-color: #5e65d1"
        ></div>
        <span>运行</span>
      </div>
      <div class="flex_row_s margin-left-20">
        <div
          class="margin-right-10"
          style="width: 0.9rem; height: 0.9rem; background-color: #ce4343"
        ></div>
        <span>关闭</span>
      </div>
    </div>
    <div class="show-container two-container">
      <transition name="leftBox" :appear="true">
        <div class="leftTree card-container flex_col_c">
          <el-autocomplete
            style="width: 95%"
            v-model="searchKey"
            placeholder="请输入用户名称"
            @select="handleClickTreeNode"
            clearable
            @clear="handleClickTreeNode"
          />

          <div class="treeBox">
            <el-tree
              v-if="renderFlag"
              ref="areaTree"
              :data="treeData"
              node-key="id"
              :props="defaultProps"
              :default-checked-keys="defaultCheckedKeys"
              :default-expanded-keys="defaultCheckedKeys"
              :current-node-key="'' + defaultCheckedKeys"
              @node-click="handleClickTreeNode"
            />
          </div>
        </div>
      </transition>
      <transition name="rightBox" :appear="true">
        <div class="rightCard card-container" v-if="whichShow == 1">
          <div
            class="allBox"
            v-if="cardData.length != 0"
            v-loading="rightCardLoading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <div
              class="eachBox"
              v-for="(item, index) in cardData"
              :key="index"
              @click="handleDetail(item)"
              :class="{ stateActive: item.state == '运行' }"
            >
              <img
                style="position: absolute"
                height="100%"
                width="100%"
                :src="item.state == '运行' ? cardOpenImg : cardCloseImg"
                alt=""
              />

              <div class="top">
                <div class="title">
                  <div
                    class="circle"
                    :class="{ stateOpen: item.state == '运行' }"
                  ></div>
                  {{ item.name }}
                  <img
                    v-if="item.type == 2001 || item.type == 2002"
                    style="height: 1.25rem; right: 1.25rem"
                    class="absolute-top-right-10"
                    src="../../../assets/remote-control/组 25702@2.png"
                  />
                  <img
                    v-if="item.type == 2003"
                    style="height: 1.25rem; right: 1.25rem"
                    class="absolute-top-right-10"
                    src="../../../assets/remote-control/组 25698@2.png"
                  />
                  <img
                    v-if="item.type == 2004"
                    style="height: 1.25rem; right: 1.25rem"
                    class="absolute-top-right-10"
                    src="../../../assets/remote-control/组 25699@2.png"
                  />
                </div>
                <div class="temperature">
                  <div class="tempNum">
                    <div>
                      <span
                        style="
                          font-size: 3.125rem;
                          font-weight: bold;
                          font-family: 'ysbth';
                        "
                        >{{ item.roomTemp ? item.roomTemp : '-' }}</span
                      >
                      &nbsp;℃
                    </div>
                    <div>室内温度</div>
                  </div>
                  <!-- <div
                  class="mianban"
                  :class="{ stateOpen: item.state == '运行' }"
                >
                  <div class="topTemp">
                    {{ item.tempNum ? item.tempNum : "-" }}
                  </div>
                  <div class="bottomTitle">设定温度</div>
                </div> -->
                  <div
                    style="width: 50%"
                    v-if="item.equipTypeName != '分体式空调'"
                  >
                    <tempChart
                      pieTitle="设定温度"
                      :pieData="item.tempNum"
                      :state="item.state"
                    />
                  </div>

                  <div
                    style="width: 50%"
                    v-if="item.equipTypeName == '分体式空调'"
                  >
                    <tempChart
                      pieTitle="当前功率"
                      :pieData="item.loadValue"
                      :state="item.state"
                    />
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div v-if="item.equipTypeName != '分体式空调'">
                  当前功率(kW):&nbsp;<span
                    style="font-size: 1.125rem; font-weight: bold"
                    >{{ item.loadValue ? item.loadValue : '-' }}</span
                  >
                </div>
                <div v-if="item.equipTypeName == '分体式空调'">
                  设定温度(℃):&nbsp;<span
                    style="font-size: 1.125rem; font-weight: bold"
                    >{{ item.tempNum ? item.tempNum : '-' }}</span
                  >
                </div>
                <div style="font-family: 'ysbth'">
                  {{ item.equipTypeName }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="noInforBox"
            v-loading="rightCardLoading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            v-else
          >
            <img
              height="50%"
              src="../../../assets/remote-control/noWord2.png"
              alt=""
            />
          </div>
        </div>
        <div class="rightCard" v-else>
          <el-form
            :model="queryParams"
            :inline="true"
            label-width="6.875rem"
            class="query-container card-container relative two-container flex_row_l"
          >
            <el-form-item label="设备名称/编号">
              <el-input
                v-model="queryParams.equipName"
                placeholder="请输入设备名称或编号"
                clearable
              />
            </el-form-item>

            <!-- <el-form-item label="用户名称/编号">
            <el-input
              v-model="queryParams.consName"
              placeholder="请输入用户名称或编号"
              clearable
            />
          </el-form-item> -->

            <div class="absolute-top-right-10">
              <el-button
                icon="el-icon-search"
                type="primary"
                size="mini"
                @click="handleSearch"
                @keyup.enter="handleSearch"
                >查询</el-button
              >
              <el-button
                icon="el-icon-refresh-right"
                size="mini"
                class="commonBtn"
                >重置</el-button
              >
            </div>
          </el-form>
          <!-- 表格数据 -->
          <div
            class="two-container card-container margin-top-10"
            style="height: calc(100% - 70px)"
          >
            <custom-table
              :loading="loading"
              :tableData="tableData"
              :tableColumns="tableColumns"
              :paginationConfig="queryParams"
              @page-current-change="handlePageCurrentChange"
              @pageNum-current-change="handleNumChange"
            >
              <template #end>
                <el-table-column
                  label="操作"
                  align="center"
                  class-name="small-padding"
                  width="180"
                >
                  <template slot-scope="scope">
                    <el-button
                      v-hasPermi="['system:role:edit']"
                      size="mini"
                      icon="el-icon-setting"
                      @click="handleDetail(scope.row)"
                      class="tableBtn blue"
                      >控制</el-button
                    >
                  </template>
                </el-table-column>
              </template>
            </custom-table>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import customTable from '@/components/ElementTable/index_d.vue';
import customDialog from '@/components/ElementDialog/index.vue';
import tempChart from '../components/tempChart.vue';
import HttpUrl from '@/api/remote-control/single-control';

export default {
  name: 'agreement',
  components: {
    customTable,
    customDialog,
    tempChart,
  },
  data() {
    return {
      whichShow: 1,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // 遮罩层
      loading: true,
      // 表头数据
      tableColumns: [
        {
          label: '用户名称',
          prop: 'consName',
        },
        {
          label: '户号',
          prop: 'consNo',
        },
        {
          label: '设备名称',
          prop: 'equipName',
        },
        {
          label: '设备类型',
          prop: 'typeName',
        },
        {
          label: '当前状态',
          prop: 'runStatus',
        },
        {
          label: '设定温度',
          prop: 'setTemp',
        },
        {
          label: '环境温度',
          prop: 'envTemp',
        },
        // {
        //   label: '额定功率(kW)',
        //   prop: 'ratedPower',
        // },
        {
          label: '当前功率(kW)',
          prop: 'nowVal',
        },
      ],
      // 角色表格数据
      tableData: [],
      // 弹出层标题
      title: '',
      // 查询参数
      queryParams: {
        consName: '',
        consNo: '',
        equipName: '',
        ahuType: '',
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      ahuTypeOptions: [], //空调机组类型
      dialogVisible: false,
      form: {},
      // 模糊查询参数
      searchKey: '',
      restaurants: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
      },
      treeData: [],
      defaultCheckedKeys: [],
      cardData: [],
      cardId: '',
      rightCardLoading: false,
      renderFlag: true,
      cardOpenImg:
        sessionStorage.getItem('themeColor') == 'black'
          ? require('../../../assets/remote-control/组 25787@2.png')
          : require('../../../assets/remote-control/组 25686@2.png'),
      cardCloseImg:
        sessionStorage.getItem('themeColor') == 'black'
          ? require('../../../assets/remote-control/组 25706@2.png')
          : require('../../../assets/remote-control/组 25706@2 (1).png'),
    };
  },

  created() {
    // this.getList();
    // // 空调机组类型
    // this.getDicts('ahu_type').then(response => {
    //   this.ahuTypeOptions = response.data;
    // });
    this.initTree();
  },
  mounted() {
    window.addEventListener('setItem', () => {
      this.cardOpenImg =
        sessionStorage.getItem('themeColor') == 'blue'
          ? require('../../../assets/remote-control/组 25686@2.png')
          : require('../../../assets/remote-control/组 25787@2.png');
      this.cardCloseImg =
        sessionStorage.getItem('themeColor') == 'blue'
          ? require('../../../assets/remote-control/组 25706@2 (1).png')
          : require('../../../assets/remote-control/组 25706@2.png');
    });
  },
  watch: {
    defaultCheckedKeys(newV) {
      this.renderFlag = false;
      this.$nextTick(() => {
        this.renderFlag = true;
      });
    },
  },
  methods: {
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 初始化树
    initTree() {
      HttpUrl.queryAirEquipTree().then(res => {
        this.treeData = res.data;
        if (res.data) {
          if (res.data[0].children) {
            if (sessionStorage.getItem('treeNode')) {
              this.handleClickTreeNode(
                JSON.parse(sessionStorage.getItem('treeNode'))
              );
              this.defaultCheckedKeys = [
                JSON.parse(sessionStorage.getItem('treeNode')).id,
              ];
            } else {
              this.handleClickTreeNode(res.data[4].children[0]);
              this.defaultCheckedKeys = [res.data[4].children[0].id];
            }
          }
        }
      });
    },

    /** 查询角色列表 */
    getList() {
      this.loading = true;
      HttpUrl.queryAirEquipTable(this.queryParams).then(res => {
        this.tableData = res.data.data;
        this.$nextTick(() => {
          this.queryParams.total = res.data.total;
        });
        this.loading = false;
      });
    },

    /** 查询按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 查询重置 */
    handleReset() {
      this.queryParams = {
        consName: '',
        consNo: '',
        equipName: '',
        ahuType: '',
        pageNum: 1,
        pageSize: 10,
        total: 0,
      };
      this.getList();
    },

    /** 点击详情 */
    handleDetail(row) {
      this.$router.push({
        path: 'airConditioning-control-edit',
        query: {
          equipId: row.id,
        },
      });
    },
    // 页码切换
    handlePageCurrentChange(num) {
      this.queryParams.pageNum = num;
      this.getList();
    },
    // 列表展示数量
    handleNumChange(num) {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = num;
      this.getList();
    },

    handleClickTreeNode(node) {
      if (node) {
        this.queryParams.consName = node.name;
        if (node.id.length > 5) {
          this.rightCardLoading = true;
          this.searchKey = node.name;
          this.cardId = node ? node.id : '';
          sessionStorage.setItem('treeNode', JSON.stringify(node));
          HttpUrl.queryAirEquipByCons({ param: this.cardId }).then(res => {
            this.cardData = res.data;
            this.rightCardLoading = false;
          });
          this.getList();
        }
      } else {
        this.rightCardLoading = true;
        HttpUrl.queryAirEquipByCons({ param: '' }).then(res => {
          this.cardData = res.data;
          this.rightCardLoading = false;
        });
      }
    },
    // 远程查询
    async querySearchAsync(queryString, cb) {
      const res = await HttpUrl.selectByName({
        name: queryString,
      });
      if (res.code === 200) {
        this.restaurants = res.data;
        this.restaurants.forEach(item => {
          item.value = item.name;
        });
        var results = queryString
          ? this.restaurants.filter(this.createStateFilter(queryString))
          : this.restaurants;
        cb(results);
      } else {
        cb([]);
      }
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.changeBtn {
  width: 6.025rem;
  height: 1.875rem;
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.625rem;
  overflow: hidden;
  margin-bottom: 10px;
  // border: 2px solid #999;
  // @include border_color('primaryColor');

  div {
    width: 100%;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
    cursor: pointer;
  }
  .hasChoose {
    @include background_color('primaryColor');
  }
}
.show-container {
  width: 100%;
  height: calc(100% - 2.5rem);
}
.two-container {
  @include font_color('fontColor');

  display: flex;
  width: 100%;
  .leftTree {
    width: 23%;
    margin-right: 0.625rem;
    border-radius: 20px;
    .treeBox {
      height: calc(100% - 3.125rem);
      width: 96%;
      margin-top: 10px;
      // @include background_color('layout_menu_bg');
      border-radius: 10px;
      overflow-y: scroll;
    }
  }
  .rightCard {
    width: calc(77% - 15px);
    height: 100%;
    border-radius: 20px;

    .allBox {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      border-radius: 15px;
      // overflow: hidden;

      .eachBox {
        // color: #fff;
        width: 30%;
        height: 15rem;
        border-radius: 15px;
        font-size: 0.75rem;
        margin: 0 3% 3% 0;
        // background-color: rgba(0, 0, 0, 0.1);
        box-shadow: 2.2px 2.4px 2.7px -8px rgba(0, 0, 0, 0.019),
          6px 6.5px 7.5px -8px rgba(0, 0, 0, 0.036),
          14.5px 15.7px 18.1px -8px rgba(0, 0, 0, 0.052),
          48px 52px 60px -8px rgba(0, 0, 0, 0.07);
        cursor: pointer;
        overflow: hidden;
        // background: url('../../../assets/remote-control/stateClose.png')
        //   no-repeat;
        background-size: 100% 100%;
        position: relative;
        .top {
          width: 100%;
          height: 80%;
          padding: 10px;
          position: absolute;
          .title {
            line-height: 1.875rem;
            .circle {
              display: inline-block;
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
              margin-right: 5px;
              background-color: #e03c3b;
            }
            .stateOpen {
              background-color: #52c562;
            }
          }
          .temperature {
            height: calc(100% - 1.875rem);
            display: flex;
            .mianban {
              width: 50%;
              background: url('../../../assets/remote-control/kongtiaoclose.png')
                no-repeat top;
              background-size: contain;
              position: relative;
              display: flex;
              flex-wrap: wrap;
              align-content: center;
              text-align: center;
              .topTemp {
                width: 100%;
                font-size: 1.75rem;
              }

              .bottomTitle {
                width: 100%;
                font-size: 14px;
              }
            }
            .stateOpen {
              background: url('../../../assets/remote-control/kongtiaoopen.png')
                no-repeat top;
              background-size: contain;
            }
            .tempNum {
              width: 50%;
              display: flex;
              flex-wrap: wrap;
              align-content: center;
              font-size: 1rem;
              div {
                width: 100%;
                text-align: center;
              }
            }
          }
        }
        .bottom {
          width: 100%;
          height: 20%;
          padding: 0 20px;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          position: absolute;
          top: 80%;
        }
      }
      // .stateActive {
      //   background: url('../../../assets/remote-control/stateOpen.png')
      //     no-repeat;
      //   background-size: 100% 100%;
      // }
    }
    .noInforBox {
      border-radius: 15px;
      overflow: hidden;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.consumer-form,
.equip-form {
  .form-text {
    color: #0078f3;
  }
  .el-form-item {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .el-divider {
    margin-left: 20px;
    margin-right: 20px;
    border-top: 1px dashed #d8d8d8;
  }
  .el-rate {
    line-height: 46px;
  }
}
.chart-box {
  margin-top: 5px;
  .chart-header {
    text-align: right;
  }
}
.dialogBody {
  width: 100%;
  height: 100%;
  .mainBox {
    width: 100%;
    height: 50%;

    .smallTitle {
      width: 100%;
      height: 30px;
      font-size: 14px;
      line-height: 30px;
    }
    .smallContent {
      width: 100%;
      height: calc(100% - 30px);
    }
    .leftInfo {
      width: 30%;
      .threeContent {
        display: flex;
        flex-wrap: wrap;
        .eachThree {
          width: 100%;
          height: 33.33%;
          display: flex;
          padding-top: 35px;
          font-size: 1.125rem;
          .blueTitle {
            color: #0078f3;
            margin: 0 20px;
          }
          .imgInfo {
            padding-top: 3px;
          }
        }
      }
    }
    .rightInfo {
      width: 70%;
      .circleThree {
        display: flex;
        justify-content: space-between;
        .eachCircle {
          width: 30%;

          .circleMain {
            height: 210px;

            text-align: center;
            background: url('../../../assets/remote-control/组\ 392.png')
              no-repeat;
            background-size: 95% 100%;
            padding-top: 110px;
            padding-right: 5px;
            margin-bottom: 20px;
            position: relative;
            .circleImg {
              position: absolute;
              height: 210px;
              width: 95%;
              top: 0;
              left: 0;
              transition: 0.1s;
            }
            .bottomTitleName {
              width: 95%;
              position: absolute;
              bottom: 14px;
              text-align: center;
              color: #7daeff;
              font-size: 14px;
            }
          }
          .bottomBox {
            width: 97%;
            height: 40px;
          }
          .bottomTemp {
            background: url('../../../assets/remote-control/组\ 399.png')
              no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
            div {
              line-height: 30px;
              text-align: center;
            }
            .addClick {
              height: 30px;
              width: 30px;
              background: url('../../../assets/remote-control/矩形 4564.png')
                no-repeat;
              background-size: 100% 100%;
              cursor: pointer;
            }
            .tempNum {
              width: calc(100% - 60px);
            }
          }
          .bottomTab {
            background: url('../../../assets/remote-control/矩形\ 4571.png')
              no-repeat;
            background-size: 95% 100%;
            padding: 4px;
            cursor: pointer;
            .changeBtn {
              width: 50%;
              height: 100%;
              background: url('../../../assets/remote-control/矩形\ 4572.png')
                no-repeat;
              background-size: 100% 100%;

              transition: 0.3s;
              text-align: center;
              line-height: 30px;
            }
          }
          .bottomMode {
            display: flex;
            justify-content: space-between;
            padding: 5px;
            .eachBox {
              width: 100%;
              cursor: pointer;
              .modeText {
                font-size: 14px;
                display: inline-block;
                height: 25px;
                margin-left: 5px;
                position: relative;
                top: 1px;
              }
            }
          }
        }
      }
    }
  }
}
.el-tree {
  height: 100%;
}

.leftBox-enter,
.leftBox-leave-to {
  transform: translateX(-20rem);
  opacity: 0;
}

.leftBox-enter-to,
.leftBox-leave-from {
  transform: translateX(0px);
  opacity: 1;
}

.leftBox-enter-active,
.leftBox-leave-active {
  transition: 1s;
}

.rightBox-enter,
.rightBox-leave-to {
  transform: translateX(40rem);
  opacity: 0;
}

.rightBox-enter-to,
.rightBox-leave-from {
  transform: translateX(0px);
  opacity: 1;
}

.rightBox-enter-active,
.rightBox-leave-active {
  transition: 1s;
}
</style>
