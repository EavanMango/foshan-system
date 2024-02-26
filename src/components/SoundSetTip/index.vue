<template>
  <div class="sound-container">
    <div class="soundDialog" v-show="modelValue">
      <div>
        <i class="el-icon-warning-outline"></i
        ><span class="soundTitle">声音播放设置提醒</span>
      </div>
      <div class="soundContent flex_center_h margin-top-1">
        <div class="content margin-top-10 margin-left-10">
          <div>请您前往设置Chrome声音设置，允许本站</div>
          <div class="margin-top-5">
            自动播放声音,详见
            <span class="helpDown" @click="handleHelpDown">帮助文档</span>
            <span class="margin-top-5 margin-left-10" v-show="isSetUpAudio">
              <el-button type="primary" size="mini" @click="handleSetAudio"
                >已设置</el-button
              >
            </span>
          </div>
        </div>
      </div>
      <div class="close" @click="handleClose">X</div>
    </div>

    <div class="soundDrawer">
      <element-drawer title="帮助文档" v-model="showDrawer">
        <div class="content">
          <div>chrome 66 版本后禁止网页声音自动播放，打开网址：</div>
          <div class="margin-top-5">
            <span style="font-weight: bolder"
              ><i class="el-icon-caret-right"></i
              >chrome://settings/content/sound</span
            >
          </div>
          <div class="margin-top-20">
            <i class="el-icon-s-tools"></i>
            <span style="font-weight: bold">进行设置：</span>
          </div>
          <div class="margin-top-5">
            <i class="el-icon-caret-right"></i
            >进入【隐私设置和安全性】打开【更多内容设置】
          </div>
          <div class="margin-top-5">
            <i class="el-icon-caret-right"></i
            >进入【声音】配置,在【允许播放声音】中添加网页地址：
          </div>
          <div class="margin-top-5" style="font-weight: bolder">
            <i class="el-icon-caret-right"></i> {{ address }}
          </div>
        </div>
        <div class="margin-top-20">
          <img src="@/assets/images/chrome/img_2.png" />
        </div>
      </element-drawer>
    </div>
  </div>
</template>

<script>
import { localStorageUtil } from '@/utils/storage-util';
import ElementDrawer from '@/components/ElementDrawer';

export default {
  name: '',
  components: { ElementDrawer },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  data() {
    return {
      isSetUpAudio: true,
      showDrawer: false,
      address: `${window.origin}/`,
    };
  },
  methods: {
    handleHelpDown() {
      this.showDrawer = true;
    },
    handleSetAudio() {
      this.$emit('change', false);
      localStorageUtil.set('setAudio', true);
    },
    handleClose() {
      this.$emit('change', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/css-theme/handle.scss';

.sound-container {
  .soundDialog {
    position: absolute;
    z-index: 2000;
    right: 8px;
    top: 260px;
    width: 22rem;
    box-sizing: border-box;
    border: 1px solid;
    @include border_color('layout_border');
    border-radius: 5px;
    @include background_color('emphasizeColor');
    padding: 10px;

    .close {
      position: absolute;
      right: 10px;
      top: 3px;
      cursor: pointer;
      @include font_color('primary_titleColor');
    }

    i {
      @include font_color('tree_font');
      font-size: 1.25rem;
    }

    .soundTitle {
      font-size: 1.1rem;
      font-weight: bold;
      margin-left: 5px;
      @include font_color('primary_titleColor');
    }

    .soundContent {
      width: 100%;

      .content {
        width: 18rem;
        @include font_color('right_header_font');
        font-size: 0.95rem;

        .helpDown {
          @include font_color('primary_titleColor');
          cursor: pointer;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
