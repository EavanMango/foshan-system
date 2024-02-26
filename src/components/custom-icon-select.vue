<template>
  <div id="custom-icon-select">
    <el-popover
      ref="popover"
      popper-class="comp-popver"
      placement="bottom-start"
      width="30%"
      trigger="click"
    >
      <custom-icon
        :cur-active="modelValue"
        @icon-click="handleIconClick"
      ></custom-icon>
      <template #reference>
        <el-input v-model="modelValue" readonly>
          <template #prefix>
            <i :class="modelValue" class="icon"></i>
          </template>
        </el-input>
      </template>
    </el-popover>
  </div>
</template>

<script>
/**
 *
 * @author txh
 * @Date 2022/3/28 9:42
 */
import CustomIcon from './custom-icon'

export default {
  name: 'custom-icon-select',
  components: { CustomIcon },
  data() {
    return {}
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  model: {
    event: 'change',
    prop: 'modelValue'
  },
  created() {},
  methods: {
    handleIconClick(iconName) {
      this.$emit('change', iconName)
      this.$refs.popover.doClose()
    }
  }
}
</script>
<style scoped lang="scss">
.el-custom-icon {
  display: inline-block;
  width: 32px;
  height: 32px;
}

.el-custom-icon-home {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: url('../assets/custom-icon/home.png') no-repeat;
}

.el-custom-icon-nyjc {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: url('../assets/custom-icon/nyjc.png') no-repeat;
}

.el-custom-icon-bbgl {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: url('../assets/custom-icon/bbgl.png') no-repeat;
}

.el-custom-icon-system {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: url('../assets/custom-icon/system.png') no-repeat;
}

.el-custom-icon {
  margin-top: 8px;
}
</style>
