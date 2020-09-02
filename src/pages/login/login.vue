<template>
  <div class="warp">
    <div class="con">
      <h2>登录</h2>
      <el-input v-model="user.username" placeholder="请输入用户名" clearable></el-input>
      <el-input v-model="user.password" placeholder="请输入密码" show-password clearable></el-input>
      <div class="login_btn">
        <el-button type="primary" @click="login">登录</el-button>
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
      requestLogin(this.user).then(res=>{
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
.el-input {
  margin-bottom: 15px;
}
.login_btn {
  text-align: center;
}
</style>