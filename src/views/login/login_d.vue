<template>
  <div class="login">
    <div class="content">
      <div class="logo flex_row_c">
        <img src="@/assets/images/login/logo.png" alt="" />
      </div>

      <div class="rightContent">
        <div class="right">
          <div class="formRight flex_col_c">
            <div class="title flex_col_c">欢迎登录</div>
            <div class="flex_col_c">
              <div class="formBox flex_col_c">
                <el-form ref="formRef" :model="loginForm" :rules="loginRules">
                  <el-form-item prop="username">
                    <el-input
                      v-model="loginForm.username"
                      type="text"
                      auto-complete="off"
                      placeholder="账号"
                    >
                      <!--                    <img slot="prefix" src="@/assets/images/login/user-icon.png">-->
                      <svg-icon
                        slot="prefix"
                        icon-class="user"
                        class="el-input__icon input-icon"
                      />
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm.password"
                      auto-complete="off"
                      placeholder="密码"
                      show-password
                      @keyup.enter.native="handleLogin"
                    >
                      <!--                    <img slot="prefix" src="@/assets/images/login/password-icon.png" alt="">-->
                      <svg-icon
                        slot="prefix"
                        icon-class="password"
                        class="el-input__icon input-icon"
                      />
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="isLock">
                    <slider-verify
                      v-model="loginForm.isLock"
                      @change="handlerLock"
                    ></slider-verify>
                  </el-form-item>
                  <el-form-item style="width: 100%; margin-top: 35px">
                    <el-button
                      :loading="loading"
                      size="medium"
                      type="primary"
                      style="width: 100%"
                      @click.native.prevent="handleLogin"
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
                      class="reset-btn"
                      @click="handleReset"
                    >
                      <span>重 置</span>
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  底部  -->
    <div class="footer flex_row_c">
      <span>Cop right ©2023-03-02 .</span>
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

export default {
  name: 'Login',
  components: { ElementDialog, Slider, SliderVerify },
  data() {
    const checkStatus = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请拖动滑块完成验证'));
      } else {
        if (
          this.loginForm.username === '' ||
          this.loginForm.password === '' ||
          !this.loginForm.username ||
          !this.loginForm.password
        ) {
          setTimeout(() => {
            this.form.isLock = false;
            this.$refs.formRef.validateField('username');
            this.$refs.formRef.validateField('password');
            return callback(new Error('验证未通过'));
          }, 1);
        }
        callback();
      }
    };
    return {
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: '',
        password: '',
        isLock: '',
        uuid: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名称不得为空' },
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不得为空' },
        ],
        isLock: [{ validator: checkStatus, trigger: 'blur' }],
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
  mounted() {},
  methods: {
    handlerLock(data) {
      if (data) {
        this.$refs.formRef.validateField('isLock');
      }
    },
    handleLogin() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.loading = true;
          let params = {
            username: this.loginForm.username,
            password: AesUtil.encryptPassword(this.loginForm.password),
          };
          // this.$router.push("/").catch(e => console.log('e', e));
          /**************************/
          API_LOGIN.AppLogin(params).then(res => {
            this.getDecryptPassword();
            let { code, data, message } = res;
            if (code === 200) {
              UserUtil.setToken(data);
              this.$message.success('登录成功');
              this.loading = false;
              generateRouters().then(() => {
                this.$router.push('/').catch(e => console.log('e', e));
              });
              // this.$router.push('/').catch(e => console.log('e', e));
            } else {
              this.$refs.formRef.resetFields();
              this.$message.warning(message);
              this.loading = false;
            }
          });
        } else {
          return false;
        }
      });
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
::v-deep .el-form-item {
  margin-bottom: 22px !important;
}

/*::v-deep .el-form{*/
/*  width: 80% !important;*/
/*}*/

::v-deep .el-input__inner {
  height: 3rem;
  line-height: 3rem;
  border: none;
  color: #ffffff;
  font-size: 1.2rem !important;
}

::v-deep .el-button--primary {
  border-color: transparent !important;
  height: 3rem !important;
  font-size: 1rem;
}

.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/login/login-bg.png');
  background-size: 100% 100%;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .logo {
      width: 20%;
      height: 20%;
      img {
        width: 100%;
        height: auto;
      }
    }

    .rightContent {
      width: 50%;
      height: 100%;

      .right {
        width: 100%;
        height: 100%;

        .formRight {
          width: 100%;
          height: 100%;

          .title {
            color: #ffffff;
            font-size: 1.55rem;
            height: 5rem;
          }

          .formBox {
            width: 100%;
            height: 90%;
            background-image: url('../../assets/images/login/form-bg.png');
            background-size: 100% 100%;
            padding: 75px 45px 45px;
            margin: 0 auto;
            box-sizing: border-box;

            .el-input {
              height: 3rem;
              background-image: url('@/assets/images/login/password-input-bg.png');
              background-size: 100% 100%;
            }

            .el-input :focus {
              //  height: 4.6rem !important;
              //  width: 31.5rem !important;
              //  margin-left: -7px !important;
              //  margin-top: -5px !important;
              /*background-image: url("@/assets/images/login/user-input-bg.png");*/
              /*background-size: 100% 100%;*/
              box-shadow: 0 0 10px 0 #005dc0;
            }

            .input-icon {
              height: 40px;
              width: 22px;
            }

            .login-btn {
              background-image: url('../../assets/images/login/login-btn.png');
              background-size: 100% 100%;
            }

            .reset-btn {
              background-color: transparent;
              background-image: url('../../assets/images/login/reset-btn.png');
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    height: 2%;
  }
}
</style>
