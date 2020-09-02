import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"
Vue.use(Router)

// 一级路由
const login=()=>Promise.resolve(import("../pages/login/login.vue"))
const index=()=>Promise.resolve(import("../pages/index/index.vue"))

// 二级路由
const banner=()=>Promise.resolve(import("../pages/banner/banner.vue"))
const classify=()=>Promise.resolve(import("../pages/classify/classify.vue"))
const goods=()=>Promise.resolve(import("../pages/goods/goods.vue"))
const manage=()=>Promise.resolve(import("../pages/manage/manage.vue"))
const member=()=>Promise.resolve(import("../pages/member/member.vue"))
const menu=()=>Promise.resolve(import("../pages/menu/menu.vue"))
const role=()=>Promise.resolve(import("../pages/role/role.vue"))
const seckill=()=>Promise.resolve(import("../pages/seckill/seckill.vue"))
const spec=()=>Promise.resolve(import("../pages/spec/spec.vue"))
const home=()=>Promise.resolve(import("../pages/home/home.vue"))

function beforeEnter(url,next){
  store.state.login.loginInfo.menus_url.some(item=>item == url)? next():next('/')
}

export const indexRouter=[
  
  { path: 'menu', component: menu ,name:"菜单管理",beforeEnter(to,from,next){beforeEnter('/menu',next)}},  
  { path: 'role', component: role ,name:"角色管理",beforeEnter(to,from,next){beforeEnter('/role',next)}},
  { path: 'manage', component: manage ,name:"管理员管理",beforeEnter(to,from,next){beforeEnter('/manage',next)}},
  { path: 'classify', component: classify ,name:"商品分类",beforeEnter(to,from,next){beforeEnter('/classify',next)}},
  { path: 'spec', component: spec ,name:"商品规格",beforeEnter(to,from,next){beforeEnter('/spec',next)}},
  { path: 'goods', component: goods ,name:"商品管理",beforeEnter(to,from,next){beforeEnter('/goods',next)}},
  { path: 'member', component: member,name:"会员管理" ,beforeEnter(to,from,next){beforeEnter('/member',next)}},
  { path: 'banner', component: banner ,name:"轮播图管理",beforeEnter(to,from,next){beforeEnter('/banner',next)}},
  { path: 'seckill', component: seckill ,name:"秒杀活动",beforeEnter(to,from,next){beforeEnter('/seckill',next)}} 
]







const router =  new Router({
  
  routes: [
    {
      path:"/",
      component:index,
      children:[
        { path: '', component: home },
        ...indexRouter
      ]
    },
    {
      path:"/login",
      component:login
    }
  ]
})



router.beforeEach((to, from, next) => {
  if(to.path=='/login'){
    next();
    return
  }else {
    let type = sessionStorage.getItem('info');
    if(type){
      next();
      return
    }else {
      next('/login')
      return
    }
  }
  
})


export default router