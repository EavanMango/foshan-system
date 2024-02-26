<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/images/login/logo.png" alt="">
    </div>

    <div class="rightContent">
      <div class="title flex_row_r">
        <h2>欢迎登录</h2>
      </div>
      <div class="rightForm flex_row_r">
        <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
              <img slot="prefix" src="@/assets/images/login/user-icon.png">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" auto-complete="off" placeholder="密码" show-password
                      @keyup.enter.native="handleLogin">
              <img slot="prefix" src="@/assets/images/login/password-icon.png" alt="">
            </el-input>
          </el-form-item>
          <el-form-item prop="isLock">
            <slider-verify v-model="loginForm.isLock" @change="handlerLock"></slider-verify>
          </el-form-item>
          <el-form-item style="width:100%; margin-top: 45px">
            <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleLogin"
                class="login-btn"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                class="reset-btn"
                @click="handleReset"
            >
              <span>重 置</span>
            </el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Cop right ©2023-03-02 .</span>
    </div>
  </div>
</template>

<script>
  import {API_LOGIN} from '@/api/login'
  import {AesUtil} from '@/utils/aes-util'
  import ElementDialog from '@/components/ElementDialog'
  import Slider from './slider'
  import SliderVerify from './sliderVerify'
  import {UserUtil} from "@/utils/user-utils";


  export default {
    name: "Login",
    components: {ElementDialog, Slider, SliderVerify},
    data() {
      const checkStatus = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请拖动滑块完成验证"));
        } else {
          if (this.loginForm.username == '' || this.loginForm.password == ''
              || !this.loginForm.username || !this.loginForm.password) {
            setTimeout(() => {
              this.form.isLock = false;
              this.$refs.formRef.validateField('username');
              this.$refs.formRef.validateField('password');
              return callback(new Error("验证未通过"));
            }, 1);
          }
          callback();
        }
      };
      return {
        codeUrl: '',
        cookiePassword: '',
        loginForm: {
          username: 'admin',
          password: 'admin',
          isLock: '',
          uuid: '',
        },
        loginRules: {
          username: [
            {required: true, trigger: "blur", message: "用户名称不得为空"}
          ],
          password: [
            {required: true, trigger: 'blur', message: '密码不得为空'}
          ],
          isLock: [
            {validator: checkStatus, trigger: 'blur'},
          ],
        },
        loading: false,
        redirect: undefined,
        msg: "",
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted() {
    },
    methods: {
      handlerLock(data) {
        if (data) {
          this.$refs.formRef.validateField('isLock');
        }
      },
      handleLogin() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = {
              username: this.loginForm.username,
              password: AesUtil.encryptPassword(this.loginForm.password)
            }
            API_LOGIN.AppLogin(params).then(res => {
              this.getDecryptPassword()
              let {code, data, message} = res
              if (code === 200) {
                UserUtil.setToken(data)
                this.$message.success('登录成功')
                this.loading = false;
                this.$router.push("/").catch(e => console.log('e', e));
              } else {
                this.$refs.formRef.resetFields()
                this.$message.warning(message)
              }
            })
          } else {
            return false;
          }
        });
      },

      /** 解密密码 */
      getDecryptPassword() {
        const password = this.loginForm.password
        this.loginForm.password = AesUtil.decryptPassword(password)
      },
      handleReset() {
        this.loginForm.username = null
        this.loginForm.password = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-form-item {
    margin-bottom: 22px !important;
  }

  ::v-deep .el-button--primary {
    border-color: transparent !important;
  }


  .login {
    height: 100%;
    background-image: url("../../assets/images/login/login-bg.png");
    background-size: 100% 100%;

    .logo {
      position: absolute;
      top: 3%;
      left: 2%;
    }

    .rightContent {
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      .title {
        height: 50%;
        width: 76%;
        h2 {
          color: #ffffff;
        }
      }

      .rightForm {
        width: 90%;
        height: 12%;
        box-sizing: border-box;

        .login-form {
          width: 40rem;
          height: 38rem;
          background-image: url("../../assets/images/login/form-bg.png");
          background-size: 100% 100%;
          padding: 60px 40px 40px;

          .el-input {
            height: 4rem;
            background-image: url("@/assets/images/login/password-input-bg.png");
            background-size: 100% 100%;
          }

          .el-input :focus{
            height: 43px !important;
            width: 290px !important;
            margin-left: -3px !important;
            margin-top: -2px !important;
            background-image: url("@/assets/images/login/user-input-bg.png");
            background-size: 100% 100%;
          }

          img {
            height: 22px;
            width: 22px;
            margin-top: 8px;
          }

          ::v-deep .el-input--medium .el-input__inner {
            height: 4rem;
            line-height: 4rem;
            border: none;
            color: #ffffff;
            margin-left: -3px !important;
            margin-top: -2px !important;
          }

          .input-icon {
            /*height: 39px;*/
            /*width: 14px;*/
            margin-left: 6px;
            /*color: #113682;*/
          }

          .login-code {
            width: 33%;
            height: 38px;
            float: right;

            img {
              cursor: pointer;
              vertical-align: middle;
            }

            .login-code-img {
              height: 38px;
            }
          }

          .login-btn {
            background-image: url("../../assets/images/login/login-btn.png");
            background-size: 100% 100%;
          }

          .reset-btn {
            background-color: transparent;
            background-image: url("../../assets/images/login/reset-btn.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .slider-box {
    position: absolute;
    margin-right: 18.7%;
  }

</style>