import { requestMenuList } from "../../util/request"

const state = {
  menuList:[]
}

const mutations = {
  changeList(state,arr){
    state.menuList = arr
  }
}

const actions = {
  menuListAction(context){
    requestMenuList({istree:true}).then(res=>{
      context.commit('changeList',res.data.list)
    })
  }
}

const getters = {
  menuList(state){
    return state.menuList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}