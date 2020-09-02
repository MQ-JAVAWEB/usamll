import {
  requestGoodsList,
  requestGoodsTotal
} from "../../util/request"

const state = {
  goodsList: [],
  page: 1,
  size: 2,
  // 获取管理员总数
  total: 0
}

const mutations = {
  changeList(state, arr) {
    state.goodsList = arr
  },
  changeTotal(state, num) {
    state.total = num
  },
  changePage(state, num) {
    state.page = num
  }
}

const actions = {
  goodsListAction(context,bool) {

    let params = bool?{}:{
      page: context.state.page,
      size: context.state.size
    }

    requestGoodsList(params).then(res => {
      // let arr = res.data.list?res.data.list:[]
      // arr.forEach(item=>{
      //   item.attrs = JSON.parse(item.attrs)
      // });
      context.commit('changeList', res.data.list)
    })
  },
  getGoodsTotalAction(context) {
    requestGoodsTotal().then(res => {
      context.commit('changeTotal', res.data.list[0].total)
    })
  },
  goodsPageActions(context,page){
    context.commit('changePage',page);
    context.dispatch('goodsListAction')
  }

}

const getters = {
  goodsList(state) {
    return state.goodsList;
  },
  goodsTotal(state) {
    return state.total;
  },
  goodsSize(state) {
    return state.size
  },
  goodsPage(state){
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
