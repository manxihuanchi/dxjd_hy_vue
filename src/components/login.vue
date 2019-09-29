<template>
  <div class="login" style="">
    <h1>欢迎登录</h1>
    <el-form ref="form" class="loginForm" :model="form" label-width="0px">
      <el-form-item label="" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="" prop="password">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>

      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('form')">登录</el-button>-->
        <!--<el-button @click="resetForm('form')">重置</el-button>-->
      <!--</el-form-item>-->
    </el-form>
      <div>
        <el-button class="btn" type="primary" @click="submitForm('form')">登录</el-button>
        <el-button class="btn" @click="resetForm('form')">重置</el-button>
      </div>
  </div>
</template>

<script>
  import {login} from '../api'
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
methods:{
  resetForm(form) {
    this.$refs[form].resetFields();
  },
  async submitForm(formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        debugger
        const res = await login(this.form.username, this.form.password)
        debugger
        if (res.status ==='suc') {
          this.$message({
            type: 'success',
            message: '登录成功'
          });
          sessionStorage.setItem('tokenName',res.token)
          // next({path:'/home'});
          this.$router.push({path:"/home"});
        }else{
          this.$message({
            type: 'error',
            message: res.errorMsg
          });
        }
      } else {
        if(this.form.username === null || this.form.username == ""){
          this.$notify.error({
            title: '错误',
            message: '请输入用户名',
            offset: 100
          });
          this.$nextTick( () =>{
            this.$refs.username.focus()
          } )
          return false;
        }
        if(this.form.password === null || this.form.password == ""){
          this.$notify.error({
            title: '错误',
            message: '请输入密码',
            offset: 100
          });
          this.$nextTick( () =>{
            this.$refs.password.focus()
          } )
          return false;
        }

      }

    });
  },
},
  created(){

  }

}
</script>

<style scoped>
  .login{
    width: 550px;
    height:350px;
    margin: 0 auto;
    background: #fff;
    /*border: 1px solid #000;*/
    box-shadow: 0 0 14px rgba(0, 0, 0, .1);
  }
  h1{
    padding-top: 50px;
  }
  .loginForm{
    width: 70%;
    margin: 0 auto;
    padding-top: 10px;
  }
  .btn{
    width: 100px;
  }
</style>
