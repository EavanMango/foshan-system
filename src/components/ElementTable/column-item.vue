<template>
  <!-- <el-table-column
    :prop="col.attribute"
    :label="col.title"
    :sortable="!col.children||col.children.length==0?'custom':false"
    align="center">
    <template v-if="col.children">
      <column-item v-for="(item, index) of col.children" :key="index" :col="item"></column-item>
    </template>
    <template slot-scope="scope">
      <span :class="{can_click:scope.row[col.attribute].statisticsType==1}">{{ scope.row[col.attribute].valueStr }}</span>
    </template>
  </el-table-column> -->

  <el-table-column
    :key="col.prop"
    :prop="col.prop"
    :width="col.width"
    :label="col.unit ? col.label + '(' + col.unit + ')' : col.label"
    :align="col.align || 'center'"
    :show-overflow-tooltip="true"
    :render-header="renderHeader"
  >
    <template #defalut="scope" v-if="scope.row.children">
      <column-item
        v-for="(item, index) of scope.row.children"
        :key="index"
        :col="item"
      ></column-item>
    </template>
    <template #default="{ row, $index }">
      <slot :name="scope.row.prop" :rowData="{ row, $index }">
        <span
          :class="
            scope.row.color === 'max'
              ? 'font-class-orange'
              : scope.row.color === 'min'
              ? 'font-class-green'
              : ''
          "
        >
          {{
            col.formatter
              ? handleFormatter(row, col.prop, col.formatter)
              : getValueData(row, col)
          }}
        </span>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "columnItem",
  props: {
    col: {
      type: Object,
    },
  },
  methods: {
    renderHeader(h, data) {
      return h("span", [
        h(
          "el-tooltip",
          {
            attrs: {
              class: "item",
              effect: "dark",
              content: data.column.label,
              placement: "top",
            },
          },
          [h("span", data.column.label)]
        ),
      ]);
    },
    handleRowValue(rowData, columnInfo) {
      if (rowData[columnInfo.prop] !== 0 && !rowData[columnInfo.prop]) {
        return "-";
      }
      if (
        rowData[columnInfo.prop] &&
        typeof rowData[columnInfo.prop] === "object"
      ) {
        if (columnInfo.subProp) {
          return rowData[columnInfo.prop][columnInfo.subProp];
        }
        return rowData[columnInfo.prop]?.name;
      }
      return rowData[columnInfo.prop];
    },
  },
};
</script>

<style scoped>
</style>

