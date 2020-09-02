import {
  requestSpecsList,
  requestSpecsTotal
} from "../../util/request"

const state = {
  specsList: [],
  page: 1,
  size: 2,
  // 获取管理员总数
  total: 0
}

const mutations = {
  changeList(state, arr) {
    state.specsList = arr
  },
  changeTotal(state, num) {
    state.total = num
  },
  changePage(state, num) {
    state.page = num
  }
}

const actions = {
  specsListAction(context,bool) {

    let params = bool?{}:{
      page: context.state.page,
      size: context.state.size
    }

    requestSpecsList(params).then(res => {
      let arr = res.data.list?res.data.list:[]
      arr.forEach(item=>{
        item.attrs = JSON.parse(item.attrs)
      });
      context.commit('changeList', arr)
    })
  },
  getSpecsTotalAction(context) {
    requestSpecsTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  specsPageActions(context,page){
    context.commit('changePage',page);
    context.dispatch('specsListAction')
  }

}

const getters = {
  specsList(state) {
    return state.specsList;
  },
  specsTotal(state) {
    return state.total;
  },
  specsSize(state) {
    return state.size
  },
  specsPage(state){
    return state.page
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
