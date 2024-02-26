<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view v-if="isRouterAlive" />
    </a-config-provider>
  </div>
</template>

<script>
import axios from 'axios';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { UserUtil } from '@/utils/user-utils';
import { DateUtil } from '@/utils/date-util';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      locale: zhCN,
      isRouterAlive: true,
    };
  },
  created() {
    this.checkToken();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    checkToken() {
      let that = this;
      // setInterval(() => {
      //   let expireDateTime = that.gerExpiredTime();
      //   // 过期前2分钟获取新token
      //   if (
      //     !expireDateTime ||
      //     new Date(expireDateTime).getTime() - new Date().getTime() <
      //       2 * 60 * 1000
      //   ) {
      //     that.getRefreshToken();
      //   }
      // }, 2 * 56 * 1000);

      setInterval(() => {
        let expireDateTime = that.gerExpiredTime();
        // 半小时刷新
        that.getRefreshToken();
      }, 30 * 60 * 1000);
    },
    gerExpiredTime() {
      if (!UserUtil.getToken()) {
        return new Date('2049-12-21 23:59:39');
      }
      let jwt = require('jsonwebtoken');
      let obj = jwt.decode(UserUtil.getToken());
      return DateUtil.getStampToDate(obj.exp * 1000);
    },
    getRefreshToken() {
      axios
        .get(process.env.VUE_APP_SERVER_PERMISSION + '/refreshToken', {
          headers: {
            Authorization: UserUtil.getToken(),
          },
        })
        .then(res => {
          if (res.status !== 200) {
            this.$message.error('空闲会话超时，登录认证已过期，请重新登录');
            UserUtil.removeToken();
            this.$router.push('/login');
            return;
          }
          UserUtil.setToken(res.data);
        })
        .catch(err => {
          console.log('获取token失败');
        });
    },
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
