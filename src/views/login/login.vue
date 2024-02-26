<template>
  <div class="w-h-100 flex login-wrapper">
    <div class="flex-1">
      <!-- <div class="login-title">虚拟电厂平台</div> -->
      <!-- <img
        class="login-title"
        style="width: 10rem; height: auto"
        src="@/assets/logo.png"
        alt=""
      /> -->
    </div>
    <div class="flex-1 form-wrapper">
      <!-- <div class="width100 flex-1 text-center welcome">空调智慧管控平台</div> -->
      <section class="loginBox width50">
        <div class="width100 text-center welcome">空调智慧管控平台</div>
        <el-form ref="formRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username" style="margin-bottom: 30px !important">
            <el-input
              v-model="loginForm.username"
              auto-complete="off"
              placeholder="账号"
            >
              <img
                slot="prefix"
                class="img-icon"
                src="@/assets/images/login/usr-icon.png"
              />
            </el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 30px !important">
            <el-input
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="密码"
              show-password
            >
              <img
                slot="prefix"
                class="img-icon"
                src="@/assets/images/login/pwd-icon.png"
              />
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <!-- <div class="width100 flex" style="margin-bottom: 20px">
            <el-form-item class="flex-1" prop="inputCode">
              <el-input v-model="inputCode"></el-input>
            </el-form-item>
            <div @click="refreshCode()">
              <SecurityCode :identifyCode="identifyCode"></SecurityCode>
            </div>
          </div> -->

          <div>
            <el-checkbox v-model="remberMe">记住我</el-checkbox>
          </div>
          <el-form-item style="width: 100%; margin-top: 10px">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%; margin-bottom: 1.25rem"
              @click="handleLogin"
              class="login-btn"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width: 100%"
              class="login-btn"
              @click="handleReset"
            >
              <span>重 置</span>
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
import API_LOGIN from '@/api/login';
import { AesUtil } from '@/utils/aes-util';
import ElementDialog from '@/components/ElementDialog';
import Slider from './slider';
import SliderVerify from './sliderVerify';
import { UserUtil } from '@/utils/user-utils';
import { generateRouters } from '@/router/generateRouter';
import SecurityCode from './securityCode.vue';
import { localStorageUtil } from '@/utils/storage-util';

export default {
  name: 'Login',
  components: { ElementDialog, Slider, SliderVerify, SecurityCode },
  data() {
    let remberMe = localStorageUtil.get('remberMe');
    let username = '';
    let password = '';
    if (remberMe) {
      username = localStorageUtil.get('username');
      password = localStorageUtil.get('password');
    }
    return {
      remberMe: remberMe,
      identifyCode: '', //随机组合字符串
      inputCode: '', //text框输入的验证码
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: username,
        password: password,
        uuid: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名称不得为空' },
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不得为空' },
        ],
        // inputCode: [
        //   {
        //     validator: this.validateCode,
        //     trigger: 'blur',
        //   },
        // ],
      },
      loading: false,
      redirect: undefined,
      msg: '',
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    this.refreshCode();
  },
  methods: {
    //初始化验证码
    refreshCode() {
      this.inputCode = '';
      this.identifyCode = ''; //输入框置空
      this.makeCode(4); //验证码长度为4
    },
    //随机切换验证码
    makeCode(length) {
      let code = '';
      for (let i = 0; i < length; i++) {
        const r = Math.floor(Math.random() * 36);
        if (r < 10) {
          code += r;
        } else {
          code += String.fromCharCode(r - 10 + 65);
        }
      }
      this.identifyCode = code;
      localStorage.setItem('code', code);
    },
    validateCode(rule, value, callback) {
      const code = this.inputCode.toLowerCase();
      const originalCode = localStorage.getItem('code').toLowerCase();
      // if (!code) {
      //   callback(new Error('请输入验证码！'));
      //   return;
      // } else if (code !== originalCode) {
      //   callback(new Error('验证码输入错误！'));
      //   return;
      // }
      callback();
    },
    handleLogin() {
      // this.$refs.formRef.validate(valid => {
      //   if (valid) {
      //     this.loading = true;
      //     let params = {
      //       username: this.loginForm.username,
      //       password: AesUtil.encryptPassword(this.loginForm.password),
      //     };
      //     // this.$router.push("/").catch(e => console.log('e', e));
      //     /**************************/
      //     API_LOGIN.AppLogin(params).then(res => {
      //       let { code, data, message } = res;
      //       if (code === 200) {
      //         UserUtil.setToken(data);
      //         this.handleRemberMe();
      //         this.$message.success('登录成功');
      //         this.loading = false;
      //         generateRouters().then(() => {
      //           this.$router.push('/').catch(e => console.log('e', e));
      //         });
      //         // this.$router.push('/').catch(e => console.log('e', e));
      //       } else {
      //         this.$refs.formRef.resetFields();
      //         this.refreshCode();
      //         this.$message.warning(message);
      //         this.loading = false;
      //       }
      //     });
      //   } else {
      //     return false;
      //   }
      // });
      this.$message.success('登录成功');
      this.$router.push('/index');
    },
    handleRemberMe() {
      localStorageUtil.set('remberMe', this.remberMe);
      if (this.remberMe) {
        localStorageUtil.set('username', this.loginForm.username);
        localStorageUtil.set('password', this.loginForm.password);
      } else {
        localStorageUtil.remove('username');
        localStorageUtil.remove('password');
      }
    },

    /** 解密密码 */
    getDecryptPassword() {
      const password = this.loginForm.password;
      this.loginForm.password = AesUtil.decryptPassword(password);
    },
    handleReset() {
      this.loginForm.username = null;
      this.loginForm.password = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: url('../../assets/images/login/login-bg.png') no-repeat;
  background-size: 100% 100%;
}
.login-title {
  font-size: 56px;
  position: absolute;
  left: 2%;
  top: 5%;
  color: white;
}
.welcome {
  font-family: 'ysbth';
  letter-spacing: 3px;
  font-weight: 500;
  font-size: 2rem;
  color: #fff;
  margin-bottom: 35px;
}

.img-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.3rem;
}
.login-btn {
  background: #0036b6;
}
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loginBox {
    background-color: rgba(56, 59, 94, 0.6);
    padding: 1.5rem;
    margin-left: 10%;
    border-radius: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  }
}
::v-deep .el-input__prefix {
  display: flex;
  align-items: center;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 1.9rem !important;
}
::v-deep .el-checkbox__label {
  font-size: 0.875rem;
}
::v-deep .el-form-item {
  margin-right: 0px !important;
}

::v-deep .el-input__inner {
  height: 3rem !important;
  line-height: 3rem !important;
  // border: none;
  color: #fff;
  font-size: 1.2rem !important;
}

::v-deep .el-button--primary {
  border-color: transparent !important;
  height: 3rem !important;
  font-size: 1rem;
}
::v-deep .el-input-group__prepend {
  background-color: transparent !important;
}
</style>
