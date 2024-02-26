<template>
  <transition name="fade">
    <div>
      <div v-show="!modelValue" class="alarm-icon" @click="handleAlarm">
        <i class="el-icon-s-operation"></i>
      </div>
      <div class="alarm-info" v-show="modelValue">
        <div class="box">
          <div class="box-header flex flex_row_r">
            <i
              class="el-icon-s-operation margin-left-20"
              @click="handleClose"
            ></i>
          </div>
          <div class="box-content" @click="goAlarmQueryAccident">
            <div
              v-for="(detailItem, index) in detailList"
              :key="index"
              class="flex_row_s item"
            >
              <el-button type="danger" size="mini" round>{{
                detailItem.levelName
              }}</el-button>
              <div class="info">
                <div class="time">{{ detailItem.occTime }}</div>
                <div>{{ detailItem.objName }} {{ detailItem.statusName }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { DateUtil } from '@/utils/date-util';

export default {
  name: '',
  components: {},
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    /** 返回数据 */
    newDataInfo: {
      type: Array,
      default: () => [],
    },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  data() {
    return {
      detailObjTime: [{ time: '' }],
      detailList: [],
    };
  },
  watch: {
    newDataInfo: {
      handler(newValue) {
        if (newValue && newValue.length) {
          this.detailList = newValue;
          if (this.detailList && this.detailList.length > 10) {
            this.detailList.pop();
          }
        }
      },
      immediate: true,
    },
    detailList: {
      handler(newValue) {
        newValue.forEach(item => {
          item.occTime = DateUtil.getStampToDate(item.occTime);
        });
      },
      immediate: true,
    },
  },
  methods: {
    /** 关闭 */
    handleClose() {
      this.$emit('change', false);
    },
    handleAlarm() {
      this.$emit('change', true);
    },
    goAlarmQueryAccident() {
      this.$router.push({
        name: 'AlarmQuery',
        params: {
          type: 'accident',
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.el-icon-s-operation {
  @include font_color('primary_titleColor');
  font-size: 1.2rem;
}
.alarm-icon {
  position: absolute;
  z-index: 99;
  bottom: 225px;
  right: 8px;
  border-radius: 5px;
  border: 1px solid;
  @include border_color('layout_border');
  box-sizing: border-box;
  @include background_color('emphasizeColor');
}

.alarm-info {
  position: absolute;
  z-index: 2000;
  bottom: 40px;
  right: 8px;
  width: 340px;
  border-radius: 5px;
  border: 1px solid;
  @include border_color('layout_border');
  box-sizing: border-box;
  @include background_color('emphasizeColor');

  .box {
    .box-content {
      height: 188px;
      overflow: auto;
      margin-left: 8px;
      font-size: 1.05rem;
      cursor: pointer;

      .item {
        margin: 0 0 15px;
        border-bottom: 1px solid;
        @include border_color('layout_border');

        .info {
          font-size: 0.85rem;
          margin-left: 8px;
          @include font_color('primary_titleColor');

          .time {
            opacity: 0.6;
          }
        }
      }
    }
  }
}

.fade-enter-active {
  animation: fadeIn 1s;
}

.fade-leave-active {
  animation: fadeOut 1s;
}

@keyframes fadeIn {
  100% {
    transform: translateY(0);
  }
  0% {
    transform: translateY(100%);
    transition: all 1s ease;
  }
}
</style>
