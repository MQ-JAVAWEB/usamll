import axios from "axios"
import qs from "qs"
import store from "../store"
import {warningAlert} from "../util/alert"
import router from "../router"

const baseUrl="/api"

axios.interceptors.request.use(config=>{
  if(config.url == baseUrl+"/api/userlogin"){
    return config
  }
  config.headers.authorization = store.state.login.loginInfo.token
  return config
})


axios.interceptors.response.use(res=>{
  console.group("========本次请求地址为："+res.config.url+"==========")
  console.log(res)
  console.groupEnd()
  // if(res.config.url==baseUrl+"/api/menulist"){
  //   res.data.msg = "登录已过期或访问权限受限"
  // }
  if(res.data.msg == "登录已过期或访问权限受限"){
    warningAlert(res.data.msg);
    store.dispatch('login/loginAction',{})
    router.push('/login')
  }


  return res;
})

// ==========================菜单管理开始==================================
// 添加 
export const requestAddMenu=(form)=>{
  return axios({
    url:baseUrl+"/api/menuadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 显示列表 
export const requestMenuList=(istree)=>{
  return axios({
    url:baseUrl+"/api/menulist",
    method:'get',
    params:istree
  })
}
// 请求一条数据 
export const requestMenuListOne=(id)=>{
  return axios({
    url:baseUrl+"/api/menuinfo",
    method:"get",
    params:{
      id
    }
  })
}
// 修改 
export const requestUpdateMenu=(form)=>{
  return axios({
    url:baseUrl+"/api/menuedit",
    method:"post",
    data:qs.stringify(form)
  })
}
// 删除  
export const requestDelMenu=(id)=>{
  return axios({
    url:baseUrl+"/api/menudelete",
    method:"post",
    data:qs.stringify(id)
  })
}

// ==========================菜单管理结束==================================

// ==========================角色管理开始==================================
// 添加角色
export const requestAddRole=(form)=>{
  return axios({
    url:baseUrl+"/api/roleadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 显示列表
export const requestRoleList=()=>{
  return axios({
    url:baseUrl+"/api/rolelist",
    method:'get',
  })
}
// 请求一条数据
export const requestRoleListOne=(id)=>{
  return axios({
    url:baseUrl+"/api/roleinfo",
    method:"get",
    params:{
      id
    }
  })
}
// 修改
export const requestUpdateRole=(form)=>{
  return axios({
    url:baseUrl+"/api/roleedit",
    method:"post",
    data:qs.stringify(form)
  })
}
// 删除
export const requestDelRole=(id)=>{
  return axios({
    url:baseUrl+"/api/roledelete",
    method:"post",
    data:qs.stringify(id)
  })
}

// ==========================角色管理结束==================================

// ==========================管理员管理开始==================================
// 添加角色
export const requestAddUser=(form)=>{
  return axios({
    url:baseUrl+"/api/useradd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 显示列表
export const requestUserList=({page,size})=>{
  return axios({
    url:baseUrl+"/api/userlist",
    method:'get',
    params:{page,size}
  })
}

// 获取管理员总数
export const requestUserTotal=()=>{
  return axios({
    url:baseUrl+"/api/usercount",
    method:"get"
  })
}

// 请求一条数据
export const requestUserListOne=(uid)=>{
  return axios({
    url:baseUrl+"/api/userinfo",
    method:"get",
    params:{
      uid
    }
  })
}
// 修改
export const requestUpdateUser=(form)=>{
  return axios({
    url:baseUrl+"/api/useredit",
    method:"post",
    data:qs.stringify(form)
  })
}
// 删除
export const requestDelUser=(uid)=>{
  return axios({
    url:baseUrl+"/api/userdelete",
    method:"post",
    data:qs.stringify(uid)
  })
}

// ==========================管理员管理结束==================================


// ==========================会员管理开始==================================
// 显示列表 
export const requestMemberList=()=>{
  return axios({
    url:baseUrl+"/api/memberlist",
    method:'get'
  })
}
// 请求一条数据 
export const requestMemberListOne=(uid)=>{
  return axios({
    url:baseUrl+"/api/memberinfo",
    method:"get",
    params:{
      uid
    }
  })
}
// 修改 
export const requestUpdateMember=(form)=>{
  return axios({
    url:baseUrl+"/api/memberedit",
    method:"post",
    data:qs.stringify(form)
  })
}


// ==========================会员管理结束==================================


// ==========================登录开始==================================



export const requestLogin=(user)=>{
  return axios({
    url:baseUrl+"/api/userlogin",
    method:"post",
    data:qs.stringify(user)
  })
}

// ==========================登录结束==================================


// ==========================商品分类开始==================================
// 添加 
export const requestAddCate=(form)=>{
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url:baseUrl+"/api/cateadd",
    method:"post",
    data:data
  })
}
// 显示列表 
export const requestCateList=(istree)=>{
  return axios({
    url:baseUrl+"/api/catelist",
    method:'get',
    params:istree
  })
}
// 请求一条数据 
export const requestCateListOne=(id)=>{
  return axios({
    url:baseUrl+"/api/cateinfo",
    method:"get",
    params:{
      id
    }
  })
}
// 修改 
export const requestUpdateCate=(form)=>{
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url:baseUrl+"/api/cateedit",
    method:"post",
    data:data
  })
}
// 删除  
export const requestDelCate=(id)=>{
  return axios({
    url:baseUrl+"/api/catedelete",
    method:"post",
    data:qs.stringify(id)
  })
}

// ==========================商品分类结束==================================


// ==========================轮播图管理开始==================================
// 添加 
export const requestAddBanner=(form)=>{
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url:baseUrl+"/api/banneradd",
    method:"post",
    data:data
  })
}
// 显示列表 
export const requestBannerList=()=>{
  return axios({
    url:baseUrl+"/api/bannerlist",
    method:'get'
    
  })
}
// 请求一条数据 
export const requestBannerListOne=(id)=>{
  return axios({
    url:baseUrl+"/api/bannerinfo",
    method:"get",
    params:{
      id
    }
  })
}
// 修改 
export const requestUpdateBanner=(form)=>{
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url:baseUrl+"/api/banneredit",
    method:"post",
    data:data
  })
}
// 删除  
export const requestDelBanner=(id)=>{
  return axios({
    url:baseUrl+"/api/bannerdelete",
    method:"post",
    data:qs.stringify(id)
  })
}

// ==========================轮播图管理结束==================================


// ==========================商品规格开始==================================
// 添加角色
export const requestAddSpecs=(form)=>{
  return axios({
    url:baseUrl+"/api/specsadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 显示列表
export const requestSpecsList=({page,size})=>{
  return axios({
    url:baseUrl+"/api/specslist",
    method:'get',
    params:{page,size}
  })
}

// 获取管理员总数
export const requestSpecsTotal=()=>{
  return axios({
    url:baseUrl+"/api/specscount",
    method:"get"
  })
}

// 请求一条数据
export const requestSpecsListOne=(id)=>{
  return axios({
    url:baseUrl+"/api/specsinfo",
    method:"get",
    params:{
      id
    }
  })
}
// 修改
export const requestUpdateSpecs=(form)=>{
  return axios({
    url:baseUrl+"/api/specsedit",
    method:"post",
    data:qs.stringify(form)
  })
}
// 删除
export const requestDelSpecs=(id)=>{
  return axios({
    url:baseUrl+"/api/specsdelete",
    method:"post",
    data:qs.stringify(id)
  })
}

// ==========================商品规格结束==================================


// ==========================商品管理开始==================================
// 添加 
export const requestAddGoods=(form)=>{
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url:baseUrl+"/api/goodsadd",
    method:"post",
    data:data
  })
}
// 显示列表 
export const requestGoodsList=({page,size})=>{
  return axios({
    url:baseUrl+"/api/goodslist",
    method:'get',
    params:{page,size}
  })
}
// 请求一条数据 
export const requestGoodsListOne=(id)=>{
  return axios({
    url:baseUrl+"/api/goodsinfo",
    method:"get",
    params:{
      id
    }
  })
}

// 获取商品总数
export const requestGoodsTotal=()=>{
  return axios({
    url:baseUrl+"/api/goodscount",
    method:"get"
  })
}

// 修改 
export const requestUpdateGoods=(form)=>{
  let data = new FormData()
  for(let i in form){
    data.append(i,form[i])
  }
  return axios({
    url:baseUrl+"/api/goodsedit",
    method:"post",
    data:data
  })
}
// 删除  
export const requestDelGoods=(id)=>{
  return axios({
    url:baseUrl+"/api/goodsdelete",
    method:"post",
    data:qs.stringify(id)
  })
}

// ==========================商品管理结束==================================

// ==========================菜单管理开始==================================
// 添加 
export const requestAddSeck=(form)=>{
  return axios({
    url:baseUrl+"/api/seckadd",
    method:"post",
    data:qs.stringify(form)
  })
}
// 显示列表 
export const requestSeckList=(istree)=>{
  return axios({
    url:baseUrl+"/api/secklist",
    method:'get',
    params:istree
  })
}
// 请求一条数据 
export const requestSeckListOne=(id)=>{
  return axios({
    url:baseUrl+"/api/seckinfo",
    method:"get",
    params:{
      id
    }
  })
}
// 修改 
export const requestUpdateSeck=(form)=>{
  return axios({
    url:baseUrl+"/api/seckedit",
    method:"post",
    data:qs.stringify(form)
  })
}
// 删除  
export const requestDelSeck=(id)=>{
  return axios({
    url:baseUrl+"/api/seckdelete",
    method:"post",
    data:qs.stringify(id)
  })
}

// ==========================菜单管理结束==================================