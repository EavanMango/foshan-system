<template>
  <div class="flex radioList">
    <div v-for="item in radioList" :key="item.id"
         :class="item.id === curActive?'active':'noActive'" class="radioItem"
         @click="handleRadio(item)">
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "element-radio",
    data() {
      return {
        curActive: 0,
      }
    },
    model: {
      prop: 'modelValue',
      event: 'change'
    },
    props: {
      radioList: {
        type: Array,
        default: () => []
      },
      modelValue: {
        type: [Number, String]
      },
      isDotClick: {
        type: Boolean,
        default: false
      },
      /** 是否路由 */
      isPathRadio: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      modelValue: {
        handler(newValue) {
          this.curActive = newValue
        },
        immediate: true
      },
      '$route.path': {
        handler(newValue) {
          if (!this.isDotClick) {
            if (this.radioList && this.radioList.length) {
              let isPath = this.radioList.some(item => {
                if (item.path) return true
              })
              if (isPath) {
                this.radioList.forEach(item => {
                  if (item.path === newValue) {
                    this.$emit('change', item.id)
                  }
                })
              }
            }
          }

        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      /** 单选按钮点击 */
      handleRadio(item) {
        this.$emit('change', item.id)
        if (!this.isDotClick) {
          if (item.path && item.path !== this.$route.path) this.$router.push(item.path)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/css-theme/handle.scss";

  .radioList {
    .radioItem {
      padding: 10px 18px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .active {
      border-radius: 1px;
      color: #ffffff;
      @include background_color('tabRadioColor');
    }

    .noActive {
      @include font_color('primary_titleColor')
    }

  }

</style>
