<!-- 登陆页 -->
<template>
  <div class="login">
    <mu-container class="demo-container is-stripe">
      <mu-row justify-content="center">
        <mu-col span="6" class="login_left">
          <!-- <h2>丰富灵活的 <br /> 智能管理平台</h2> -->
          <!-- <p>我们为智能感知系统平台打造了一个更加人性 <br /> 化教师管理平台</p> -->
        </mu-col>
        <mu-col span="6" class="box">
          <h2>用户登录</h2>
          <p>User login</p>
          <mu-container class="login_cont">
            <mu-form ref="formModel" :model="form" class="mu-demo-form">
              <mu-form-item prop="username" label="" :rules="usernameRules">
                <mu-text-field v-model="form.username" prop="username" icon="person" />
              </mu-form-item>
              <mu-form-item prop="password" label="" :rules="passwordRules">
                <mu-text-field v-model="form.password" type="password" prop="password" icon="locked" />
              </mu-form-item>
              <mu-form-item>
                <mu-button color="#204EFF" @click="submit">登 录</mu-button>
              </mu-form-item>
            </mu-form>
            <!-- <mu-text-field v-model="username" :error-text="usernameError" label-float icon="person" @focus="changeInput" />
            <br />
            <mu-text-field type="password" v-model="password" :error-text="passwordError" label-float icon="locked" @focus="changeInput" />
            <br /> -->
            <!-- <mu-button color="#204EFF" @click="submit">提交</mu-button> -->
          </mu-container>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名' },
        { validate: (val) => val.length >= 3, message: '用户名长度大于3' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
      ],
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      this.$refs.formModel.validate().then((result) => {
        if (this.form.username === 'admin' && this.form.password === 'admin') {
          this.$router.push({
            path: '/home'
          })
        } else {
          return false
        }
      })
      // if (this.username === '') {
      //   this.usernameError = '请输入用户名'
      // } else if (this.password === '') {
      //   this.passwordError = '请输入密码'
      // } else if (this.username !== 'admin') {
      //   this.usernameError = '用户名不存在'
      // } else if (this.password !== 'admin') {
      //   this.passwordError = '密码输入错误，请重新输入'
      // } else {
      //   this.$router.push({
      //     path: '/home'
      //   })
      // }
    },
    changeInput() {
      this.usernameError = ''
      this.passwordError = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  background: #51B1F8 url(../../assets/img/loginbg.png) no-repeat center bottom;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .demo-container {
    max-width: 1080px;
    height: 600px;
    background: #ffffff;
    border-radius: 10px;
    padding: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .row {
      height: 100%;
      .col-6 {
        height: 100%;
      }
    }
    .login_left {
      background: url(../../assets/img/login2.jpg) no-repeat left center;
      background-size: 100% 100%;
      padding: 3%;
      text-align: left;
      h2 {
        color: #7894FF;
        font-size: 32px;
        margin: 0;
      }
      p {
        font-size: 14px;
      }
    }
    .box {
      h2 {
        color: #204EFF;
        font-size: 32px;
        margin: 50px 0 0 0;
        padding: 0;
      }
      p {
        font-size: 18px;
        color: #204EFF;
      }
    }
    .login_cont{
      width: 80%;
      margin: 20px auto;
      .mu-form-item {
        padding-left: 20px;
        /deep/ .mu-form-item-help {
          left: 40px!important;
        }
        .mu-input {
          width: 100%;
          padding-left: 20px;
          /deep/ .mu-input-content {
            padding-left: 20px;
          }
        }
        .mu-button {
          width: calc(100% - 20px);
          margin: 30px 0 0 20px;
          border-radius: 30px;
        }
      }
    }
  }
}
</style>
