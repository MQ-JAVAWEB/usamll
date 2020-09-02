import { requestMemberList } from "../../util/request"

const state = {
  memberList:[]
}

const mutations = {
  changeList(state,arr){
    state.memberList = arr
  }
}

const actions = {
  memberListAction(context){
    requestMemberList().then(res=>{
      context.commit('changeList',res.data.list)
    })
  }
}

const getters = {
  memberList(state){
    return state.memberList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}