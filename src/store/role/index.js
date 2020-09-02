import { requestRoleList } from "../../util/request"

const state = {
  roleList:[]
}

const mutations = {
  changeList(state,arr){
    state.roleList = arr
  }
}

const actions = {
  roleListAction(context){
    requestRoleList().then(res=>{
      context.commit('changeList',res.data.list)
    })
  }
}

const getters = {
  roleList(state){
    return state.roleList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}