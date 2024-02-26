<template>
  <div>
    <el-badge :value="objCount?objCount.general:''" type="success" class="item-success"></el-badge>
    <el-button type="success" size="mini" class="btn" @click="goAlarmQueryGeneral">
      <span @click="goAlarmQueryGeneral">{{$t('alarmQuery.normal')}}</span>
    </el-button>

    <el-badge :value="objCount?objCount.serious:''" type="warning" class="item-warning"></el-badge>
    <el-button type="warning" size="mini" class="btn" @click="goAlarmQuerySeries">
      <span @click="goAlarmQuerySeries">{{$t('alarmQuery.serious')}}</span>
    </el-button>

    <el-badge :value="objCount?objCount.accident:''" type="danger" class="item-danger"></el-badge>
    <el-button type="danger" size="mini" class="btn" @click="goAlarmQueryAccident">
      <span @click="goAlarmQueryAccident">{{$t('alarmQuery.accident')}}</span>
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      objCount: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      goAlarmQueryGeneral() {
        this.$router.push({
          name: 'AlarmQuery',
          params: {
            type: 'general'
          }
        })
      },
      goAlarmQuerySeries() {
        this.$router.push({
          name: 'AlarmQuery',
          params: {
            type: 'serious'
          }
        })
      },
      goAlarmQueryAccident() {
        this.$router.push({
          name: 'AlarmQuery',
          params: {
            type: 'accident'
          }
        })
      }

    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-button--success {
    background-color: #42d885;
    border-color: #42d885;
  }

  ::v-deep .el-button--warning {
    background-color: #ffba00;
    border-color: #ffba00;
  }

  ::v-deep .el-button--danger {
    background-color: #ff6d6d;
    border-color: #ff6d6d;
  }

  ::v-deep .el-badge__content--success {
    background-color: #42d885;
  }

  ::v-deep .el-badge__content--warning {
    background-color: #ffba00;
  }

  ::v-deep .el-badge__content--danger {
    background-color: #ff6d6d;
  }


  .item-success {
    position: absolute;
    top: -8px;
    right: 215px;
  }

  .item-warning {
    position: absolute;
    top: -8px;
    right: 145px;
  }

  .item-danger {
    position: absolute;
    top: -8px;
    right: 75px;
  }

  .btn {
    margin-right: 15px;

    span {
      cursor: pointer;
    }
  }

</style>