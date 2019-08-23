<template>
  <div>
    <h1 class="main-title">
      <i class="fa fa-envira" style="color:green"></i>
      中医妇科临床流调数据中心
    </h1>
    <hr class="my-hr">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
            class="login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="email">
        <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="账号" suffix-icon="fa fa-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" suffix-icon="fa fa-lock"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;border-radius:2px" @click="handleSubmit" :loading="logining">登录
        <!-- <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录 -->
        </el-button>
      </el-form-item>
      <el-divider content-position="center">
        <span style="color:rgb(94,143,189)">
          友情提示<i class="fa fa-wrench"></i>
        </span>
      </el-divider>
    </el-form>
    <!-- <div class="footer">
        看这里
      </div> -->
  </div>
</template>

<script>
import { apiLogin } from '@/api/api-common'
export default {
  data () {
    return {
      logining: false,
      loginForm: {
        email: 'test10@handian.com',
        password: 'asdf1234'
      },
      rules: {
        email: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleSubmit (ev) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true
          var params = { email: this.loginForm.email, password: this.loginForm.password }
          apiLogin(params).then(res => {
            this.logining = false
            if (res.code !== 200) {
              this.$message({
                // message: msg + ' 错误码 ' + res.code,
                message: res.msg + ' 密码或用户名错误',
                type: 'error'
              })
            } else {
              console.log("登录成功")
              // sessionStorage 这一行务必写在跳转页面前面!!!!!! 注意使用JSON.stringify()
              sessionStorage.setItem('user', JSON.stringify(res.user))
              this.$router.push({ path: '/home' })
            }
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .main-title {
    text-align: center;
    margin: 150px 20px 20px 20px;
    font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", sans-serif;
    font-size: 25px;
    color:grey
  }
  .my-hr {
    width: 350px; height: 2px; border: none; background-color: #4f90c1;
    margin-bottom: 20px
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 10px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .footer {
      background: #5090C1;
      border-top: 2px solid #597597;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
