<template>
  <div class="warp">
    <div class="con">
      <h2>登录</h2>
      <el-form :rules="rules" :model="user" ref="form">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>

      </el-form>
      <div class="login_btn">
        <el-button type="primary" @click.enter="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { requestLogin } from '../../util/request'
import { successAlert, warningAlert } from '../../util/alert'
import { mapActions, mapGetters } from 'vuex'


export default {
  components: {
  },
  data() {
    return {
      user:{
        username:"",
        password:""
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
    }
  },
  computed:{
   
  },
  methods: {
    ...mapActions({
      loginAction:"login/loginAction"
    }),
    login(){
      if(this.user.username==''){
        warningAlert('请填写用户名')
        return
      }
      if(this.user.password==''){
        warningAlert('请填写密码')
        return
      }


      requestLogin(this.user).then(res=>{
        this.$refs.form.clearValidate()
        if(res.data.code==200){
          successAlert("登录成功")
          this.loginAction(res.data.list)
          this.$router.push("/")
        }else {
          warningAlert('用户名或密码错误')
        }
      })
    }
  },
  mounted() {
    
  }
}
</script>
<style scoped>
.warp {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background:linear-gradient(to right,#66343C,#303C61);
}
.con {
  width: 300px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
}
h2 {
  text-align: center;
  line-height: 60px;
}

.login_btn {
  text-align: center;
}
</style>