<template>
  <div style="text-align: center; width: 100%; height: 100%">
    <el-transfer
      class="flex_row_a"
      style="text-align: left; width: 100%; height: 100%"
      v-model="rigthData"
      filterable
      :left-default-checked="leftChecked"
      :right-default-checked="rightChecked"
      :titles="title"
      :button-texts="['到左边', '到右边']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      @change="handleChange"
      :data="data"
    >
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
    </el-transfer>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 13; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
        });
      }
      return data;
    };
    return {
      leftChecked: [], //左侧已勾选
      rightChecked: [], //右侧已勾选
      data: generateData(),
      rigthData: [1], //右边数据
      title: ['未参与用户', '已参与用户'], //标题
    };
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-transfer-panel {
  width: 35%;
  height: 100% !important;
}
::v-deep .el-transfer-panel__body,
::v-deep .el-checkbox-group {
  height: calc(100% - 40px) !important;
}
::v-deep .el-input--small {
  width: 90% !important;
  margin: 10px auto;
}
::v-deep .el-icon-arrow-right {
  display: inline-block;
  margin-left: 5px;
}
</style>
