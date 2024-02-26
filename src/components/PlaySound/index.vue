<template>
  <div>
    <svg-icon v-show="isSound" class-name="sound-icon" icon-class="sound" @click="handlePlay"/>
    <svg-icon v-show="isCloseSound" class-name="sound-close-icon" icon-class="sound-close" @click="handleClose" />
  </div>
</template>

<script>
  import Speech from 'speak-tts'
  import {Bus} from '@/utils/bus.js';

  export default {
    name: "PlaySound",
    data() {
      return {
        speech: null,
        isSound: true,
        isCloseSound: false,
        /** 播报的文本 */
        content: '',
      }
    },
    mounted() {
      this.speechInit()
      this.getAlarmInfo()
    },
    /** 离开页面取消语音，不取消可能会造成奇妙的bug */
    destroyed() {
      this.speech.cancel();
    },
    methods: {
      /** 接收到传过来的告警消息 */
      getAlarmInfo() {
        Bus.$on('alarmInfoSingle', msg => {
          for (let i = 0; i < msg.length ; i++) {
            this.content = msg[i].content
            this.handleOpen()
          }
        })
      },
      speechInit() {
        this.speech = new Speech();
        this.speech.setLanguage("zh-CN");
        this.speech.init().then(() => {});
      },

      handleOpen() {
        this.speech.speak({
          text: this.content
        }).then(() => {
          console.log("读取成功, 开始播放")
        })
      },
      /** 播放图标 */
      handlePlay() {
        this.speech.pause();
        this.isSound = false
        this.isCloseSound = true
      },
      /** 关闭图标 */
      handleClose() {
        /** 从暂停处继续播放 */
        this.speech.resume();
        this.isSound = true
        this.isCloseSound = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/css-theme/handle.scss";

  .sound-icon {
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
    @include font_color('primary_titleColor')
  }

  .sound-close-icon {
    cursor: pointer;
    font-size: 25px;
    vertical-align: middle;
  }
</style>