import Vue from "vue"
import vuex from "vuex"

import actions from "./actions"
import {
  state,
  mutations,
  getters
} from "./mutations.js"
import menu from "./menu/index"
import role from "./role/index"
import manage from "./manage"
import member from "./member";
import cate from "./cate";
import banner from "./banner";
import spec from "./spec";
import goods from "./goods";
import login from "./login";
import seckill from "./seckill";
Vue.use(vuex)

export default new vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    menu,
    role,
    manage,
    member,
    cate,
    banner,
    spec,
    goods,
    login,
    seckill
  }
})
