<template>
  <div>
    <el-container class="high">
      <el-aside width="200px">
        <el-menu
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#21222a"
          text-color="#fff"
          unique-opened
          router
          active-text-color="#f55562"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div
            v-for="item in loginInfo.menus"
            :key="item.id"
          >
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.url" v-else>{{item.title}}</el-menu-item>

          </div>

          <!-- <el-submenu index="3">

            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/classify">商品分类</el-menu-item>
              <el-menu-item index="/spec">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="right">
            {{loginInfo.username}}
            <el-button type="primary" @click="logout">退出</el-button>
          </div>

        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
  },
  data() {
    return {

    }
  },
  methods: {
    logout(){
      this.loginAction({});
      this.$router.push('/login')
    },
    ...mapActions({
        loginAction:"login/loginAction"
    })
  },
  computed: {
    ...mapGetters({
      loginInfo: "login/loginInfo"
    })
  },
  mounted() {
    console.log(this.loginInfo);
  }
}
</script>
<style scoped>
.high {
  height: 100vh;
}
.el-aside {
  background-color: #21222a;
}
.el-header {
  background-color: #b1c0d2;
  
}
.right {
  position: absolute;
  right: 30px;
  top: 10px;

}
.el-button {
  margin-left: 10px;
}
</style>