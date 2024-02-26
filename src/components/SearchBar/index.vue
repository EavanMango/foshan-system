<template>
  <div ref="serch" class="searchBox">
    <div class="left flex_row_l">
      <div class="flex_row_l">
        <div v-for="item in formItem" :key="item.prop" class="flex_row_l">
          <!-- input -->
          <div class="Search-box" style="margin-right: 10px"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type==='Input'">
            <span class="title" :class="classObject(item.required)">{{item.label}}</span>
            <div class="box box1">
              <el-input size="medium"
                        :clearable="false"
                        v-model="formData[item.prop]"
                        placeholder="请输入"
                        :style="{width:item.width}"
              ></el-input>
            </div>
          </div>
          <!-- checkbox 复选框 -->
          <div class="Search-box" style="margin-right: 3rem"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type==='checkbox'">
            <div class=" flex_row_l">
              <div v-for="(check, index) in item.checkboxList" :key="check.id" class="margin-left-5">
                <el-checkbox-group v-model="formData[item.prop]" @change="changeBox">
                  <el-checkbox :key="index" :label="check.name">{{check.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>

          <!--select 单选-->
          <div class="Search-box"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type==='Select'">
            <span class="title" :class="classObject(item.required)">{{item.label}}</span>
            <el-select v-model="formData[item.prop]"
                       :filterable="item.filterable"
                       :clearable="false"
                       :disabled="item.disabled"
                       :placeholder="item.placeholder"
                       size="medium"
                       style="width: 62%"
            >
              <el-option v-for="select in item.options"
                         :label="select.label"
                         :key="select.value+select.label"
                         :value="select.value"></el-option>
            </el-select>
            <span class="title margin-left-10" :class="classObject(item.required)">{{item.labelEnd}}</span>
          </div>
          <!--select 多选-->
          <div class="Search-box"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type==='Selects'">
            <span class="title" :class="classObject(item.required)">{{item.label}}</span>
            <div class="box">
              <el-select v-model="formData[item.prop]"
                         :filterable="item.filterable"
                         :clearable="false"
                         :disabled="item.disabled"
                         :placeholder="item.placeholder"
                         multiple
                         collapse-tags
                         size="medium"
                         style="width: 62%"
              >
                <el-option v-for="select in item.options"
                           :label="select.label"
                           :key="select.value+select.label"
                           :value="select.value"></el-option>
              </el-select>
            </div>
          </div>
          <!-- Date -->
          <div class="Search-box"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type=='Date'">
            <span class="title" :class="classObject(item.required)">{{item.label}}</span>
            <el-date-picker size="medium"
                            :clearable="false"
                            v-model="formData[item.prop]"
                            :picker-options="pickerOptions"
                            :value-format="item.dateFormate"
                            :type="item.timeType"
                            align="right"
                            :placeholder="$t('placeholder.select')"
                            style="width: 62%"
            >

            </el-date-picker>
          </div>
          <!-- 年月 -->
          <div class="Search-box"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type=='month'">
            <span class="title" :class="classObject(item.required)">{{item.label}}</span>
            <div class="box">
              <el-date-picker size="medium"
                              :clearable="false"
                              v-model="formData[item.prop]"
                              :picker-options="pickerOptions"
                              :value-format="item.dateFormate"
                              type="month"
                              align="right"
                              :placeholder="$t('placeholder.select')"
                              style="width: 62%"
              >
              </el-date-picker>
            </div>
          </div>
          <!-- 年 -->
          <div class="Search-box"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type=='year'">
            <span class="title" :class="classObject(item.required)">{{item.label}}</span>
            <div class="box">
              <el-date-picker size="medium"
                              :clearable="false"
                              v-model="formData[item.prop]"
                              :picker-options="pickerOptions"
                              type="year"
                              align="right"
                              :placeholder="$t('placeholder.select')"
                              style="width: 62%"
              >
              </el-date-picker>
            </div>
          </div>

          <!-- 时间段 -->
          <div class="Search-box"
               v-show="item.showFlag==false?item.showFlag:true"
               v-if="item.type=='Time_feame'">
            <span class="title" :class="classObject(item.required)">{{item.label}}</span>
            <div class="box">
              <el-date-picker size="medium"
                              :clearable="false"
                              v-model="formData[item.prop]"
                              :picker-options="pickerOptions"
                              :value-format="item.dateFormate"
                              :type="item.timeType"
                              :default-time="item.defaultTime"
                              align="right"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"></el-date-picker>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(item) in formHandler" style=" margin-right: 10px;">
        <el-button v-show="item.isShow"
                   size="medium"
                   :key="item.key"
                   :type="item.type"
                   :icon="item.icon"
                   @click="item.handler && item.handler()"
        >
          <span >{{item.label}}</span>
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    props: {
      labelWidth: {
        type: String,
        default: "120px"
      },
      /** hover提示语 */
      hint: {
        type: String,
        default: ""
      },
      /** 是否显示 */
      showFlag: {
        type: Boolean,
        default: true
      },
      /** 表单数据 */
      formData: {
        type: Object,
        default: () => {}
      },
      /** 表单配置 */
      formItem: {
        type: Array,
        default: () => []
      },
      /** 按钮 */
      formHandler: {
        type: Array,
        default: () => {}
      },
      /** 自定义按钮图标 */
      icon: {
        type: String,
        default: ''
      },
      /** 显示隐藏 */
      isShow: {
        type: Boolean,
        default: true,
      },
      /** 验证 */
      verification: {
        default() {
          return () => {};
        },
        type: Function
      }
    },
    /** props: ['child1Info'], */
    data() {
      return {
        selectedData: {},
        /** 提示信息 */
        type_msg: {
          Input: "请输入",
          Radio: "请选择",
          Checkbox: "请选择",
          Select: "请选择",
          Date: "请选择",
          month: "请选择",
          year: "请选择"
        },
        /** 时间限制 */
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
      };
    },
    methods: {
      /** 必填标识 */
      classObject(flag) {
        return {
          mustInput: flag
        };
      },
      /** 初始化 */
      initFormData() {
        const formData = {};
        this.formItem.forEach(item => {
          if (item.required) {
            this.rules(item);
          }
          /** 自定义验证规则 */
          if (item.validator) {
            item.rules = item.validator;
          }
        });
        this.form = formData;
      },
      /** 规则 */
      rules(item) {
        const requiredRules = [
          {
            required: true,
            message: item.required || `${this.type_msg[item.type]}${item.label}`,
            trigger: "blur"
          }
        ];
        /** 其他规则 */
        if (item.rules && item.rules.length > 0) {
          item.rules = requiredRules.concat(item.rules);
        } else {
          item.rules = requiredRules;
        }
        return requiredRules;
      },
      /** 复选框checkbox点击 */
      changeBox() {
        this.$emit('change')
      }
    },
    mounted() {
      /** 直接传回到最外层父组件 */
      this.$emit("test1", "儿子组件啊啊啊");
    },
    watch: {
      formItem: {
        handler(newValue) {
          this.initFormData();
        },
        immediate: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~@/styles/css-theme/handle.scss";

  .searchBox {
    border-radius: 3px;
    align-items: center;
    padding: 0px 10px;
    height: auto;
    /*height: 3.7rem;*/

    .left {
      display: flex;
      /*width: 100%;*/
      height: 100%;
      flex-wrap: wrap;

      .Search-box {
        height: 100%;
        /*width: 100%;*/
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .title {
          text-align: right;
          @include font_color('primary_titleColor');
          display: inline-block;
          white-space: nowrap;
        }

        .box {
          /*width: 62%;*/
        }


      }
    }
  }

  ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 62% !important;
  }



</style>
