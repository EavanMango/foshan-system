<template>
  <div class="dialog-content">
    <a-transfer
      class="base-tree-transfer"
      show-search
      :dataSource="data"
      :titles="titles"
      :target-keys="targetKeysCopy"
      :render="(item) => item.label"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    targetKeys: {
      type: Array,
      default() {
        return []
      }
    },
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      targetKeysCopy: []
    }
  },
  watch: {
    targetKeys: {
      handler(nv) {
        this.targetKeysCopy = JSON.parse(JSON.stringify(nv))
      },
      immediate: true
    }
  },
  methods: {
    handleChange(targetKeys) {
      this.targetKeysCopy = targetKeys
      this.$emit('change', targetKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 100%;
}
</style>
