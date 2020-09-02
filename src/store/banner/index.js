import { requestBannerList } from "../../util/request"

const state = {
  bannerList:[]
}

const mutations = {
  changeList(state,arr){
    state.bannerList = arr
  }
}

const actions = {
  bannerListAction(context){
    requestBannerList().then(res=>{
      context.commit('changeList',res.data.list)
    })
  }
}

const getters = {
  bannerList(state){
    return state.bannerList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}