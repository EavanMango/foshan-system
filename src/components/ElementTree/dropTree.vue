<el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-drop="handleDrop"
        @node-drag-enter="nodeDragEnter"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
>
      <span class="custom-tree-node" :class="{isDisabled: node.data.enabled === false}" slot-scope="{ node, data }" :key="data.id">
        <template v-if="!node.data.isEdit">
          <el-tooltip class="item" effect="light" :content="node.data.knowledgeName" :open-delay="1000" placement="bottom">
            <span class="label" v-if="node.data.enabled" @dblclick="nodeClick(data,node,true)">{{ node.data.knowledgeName }}</span>
            <span class="label isDisabled" v-else-if="node.data.id && !node.data.enabled" @dblclick="nodeClick(data,node,true)">{{ "（已禁用）" + node.data.knowledgeName }}</span>
          </el-tooltip>
        </template>
        <span class="knowledgeCode" v-else-if="node.data.isEdit && hasAuth('knowledge_points_system_edit')">
          <el-input v-model.trim="knowledgeCode" placeholder="请输入知识点code"  v-focus />
          <el-button size="mini" type="primary" :disabled="!knowledgeCode" @click="addKnoeledgeCode(node,data)">确 定</el-button>
          <el-button size="mini" @click="nodeClick(data,node,false)">取 消</el-button>
        </span>
        <span class="operation" v-show="!node.data.isEdit">
            <el-button type="text" class="btn" :disabled="!canStatusChange || !node.data.id" @click="insertAfter(data, node)" style="color: #333">
              添加同级
            </el-button>
            <span>|</span>
            <el-button type="text" class="btn" :disabled="!canStatusChange || !node.data.id" @click="append(data, node)" style="color: #333">
              添加下级
            </el-button>
            <span>|</span>
            <el-button type="text" class="btn" :disabled="!node.data.id" @click="toDetail(data)" style="color: #333">
              查看详情
            </el-button>
            <span>|</span>
            <el-button type="text" class="btn" :disabled="!node.data.id" @click="remove(node, data)" style="color: #333">
              删除
            </el-button>
        </span>
      </span>
</el-tree>

<script>
  // import { debounce } from '@/utils/comUtil'
  export default {
    name: 'dropTree',
    data() {
      return {
        knowledgeCode: '',
      }
    },
    props: {
      treeData: Array,
      canStatusChange: Boolean
    },
    directives: {
      focus: {
        inserted: function(el) {
          el.querySelector("input").focus();
        }
      }
    },
    methods: {
      addKnoeledgeCode(node,data){
        this.$emit('addKnoeledgeCode',node,data,this.knowledgeCode)
        this.knowledgeCode = ""
      },
      // 拖拽成功完成时触发的事件
      handleDrop(draggingNode, dropNode, dropType, e) {
        this.$emit('handleDrop', draggingNode, dropNode, dropType, e)
      },
      // 获取总层级数
      getTotalLevel(node, arr) {
        if (node.childNodes && node.childNodes.length) {
          node.childNodes.forEach(item => {
            arr.push(item.level)
            if(item.childNodes && node.childNodes.length) {
              this.getTotalLevel(item, arr)
            }
          })
        }else{
          arr.push(node.level)
        }
      },
      // 拖拽进入其他节点时触发的事件
      nodeDragEnter(draggingNode, dropNode){
        // console.log("拖拽进入其他节点时触发的事件",draggingNode, dropNode)
        let arr = []
        this.getTotalLevel(draggingNode, arr)
        const totalLevel = Math.max(...arr) - draggingNode.level + 1 + dropNode.level
        if(totalLevel <= 8) return
        // this.banMessag();
        arr = []
      },
      // banMessag: debounce(function(){
      //   this.$message({
      //     type: 'warning',
      //     message: '节点层级已达最大值！',
      //   })
      // },500),
      // 拖拽时判定目标节点能否被放置
      allowDrop(draggingNode, dropNode, type) {
        //draggingNode 被拖拽的节点
        //dropNode 目标节点
        //type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
        // console.log(draggingNode.level, dropNode.level, type)
        // 获取被拖拽的节点层级
        let arr = []
        this.getTotalLevel(draggingNode, arr)
        const totalLevel = Math.max(...arr) - draggingNode.level + 1 + dropNode.level
        // 插入至目标节点内部 节点层级大于8级  不能被放置
        if(totalLevel > 8){
          this.banMessag();
          arr = []
          return false
        }else{
          return true;
        }
      },
      // 判断节点能否被拖拽
      allowDrag(draggingNode) {
        // console.log("allowDrag", draggingNode)
        // 节点处于编辑状态 或者 节点为空节点 不能拖拽
        if(draggingNode.data.isEdit || !draggingNode.data.id){
          return false
        }else{
          return true
        }
      },
      // 节点双击事件 节点变为可编辑状态
      nodeClick(data, node, isEdit) {
        if(isEdit === false){
          this.knowledgeCode = ""
        }
        this.$emit('nodeClick', data, node, isEdit)
      },
      // 添加同级
      insertAfter(data, refNode) {
        this.$emit('insertAfter', data, refNode)
      },
      // 添加下级
      append(data, parentNode) {
        this.$emit('append', data, parentNode)
      },
      toDetail(data) {
        this.$emit('toDetail', data)
      },
      remove(node, data) {
        this.$emit('remove', node, data)
      },
    },
  }
</script>