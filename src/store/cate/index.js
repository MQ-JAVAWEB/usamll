import { requestCateList } from "../../util/request"

const state = {
  cateList:[]
}

const mutations = {
  changeList(state,arr){
    state.cateList = arr
  }
}

const actions = {
  cateListAction(context){
    requestCateList({istree:true}).then(res=>{
      context.commit('changeList',res.data.list)
    })
  }
}

const getters = {
  cateList(state){
    return state.cateList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}