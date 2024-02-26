<template>
  <div>
    <a-transfer
      class="base-tree-transfer"
      :data-source="dataSource"
      :target-keys="targetKeysCopy"
      :render="(item) => item.title"
      :show-select-all="false"
      :titles="titles"
      @change="onChange"
    >
      <template
        slot="children"
        slot-scope="{ props: { direction, selectedKeys }, on: { itemSelect } }"
      >
        <a-tree
          v-if="direction === 'left'"
          blockNode
          checkable
          checkStrictly
          defaultExpandAll
          :checkedKeys="[...selectedKeys, ...targetKeysCopy]"
          :treeData="treeDataCopy"
          @check="
            (_, props) => {
              onChecked(
                _,
                props,
                [...selectedKeys, ...targetKeysCopy],
                itemSelect
              )
            }
          "
          @select="
            (_, props) => {
              onChecked(
                _,
                props,
                [...selectedKeys, ...targetKeysCopy],
                itemSelect
              )
            }
          "
        />
      </template>
    </a-transfer>
  </div>
</template>
<script>
const treeData = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [
      { key: '0-1-0', title: '0-1-0' },
      { key: '0-1-1', title: '0-1-1' }
    ]
  },
  { key: '0-2', title: '0-3' }
]

function getTransferDataSource(treeData) {
  const transferDataSource = []
  function flatten(list = []) {
    list.forEach((item) => {
      transferDataSource.push(item)
      flatten(item.children)
    })
  }
  flatten(JSON.parse(JSON.stringify(treeData)))
  return transferDataSource
}

function isChecked(selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1
}

function handleTreeData(data, targetKeys = []) {
  data.forEach((item) => {
    item['disabled'] = targetKeys.includes(item.key)
    if (item.children) {
      handleTreeData(item.children, targetKeys)
    }
  })
  return data
}

export default {
  props: {
    treeData: {
      type: Array,
      default() {
        return treeData
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
  computed: {
    treeDataCopy() {
      return handleTreeData(this.treeData, this.targetKeysCopy)
    },
    dataSource() {
      return getTransferDataSource(this.treeData)
    }
  },
  watch: {
    targetKeys: {
      handler(nv) {
        this.targetKeysCopy = JSON.parse(JSON.stringify(nv))
      }
    }
  },

  methods: {
    onChange(targetKeys) {
      console.log('Target Keys:', targetKeys)
      this.targetKeysCopy = targetKeys
    },
    onChecked(_, e, checkedKeys, itemSelect) {
      console.log('checkedKeys', checkedKeys)
      const { eventKey } = e.node
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey))
    }
  }
}
</script>
