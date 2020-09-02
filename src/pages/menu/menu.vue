<template>
  <div>

    <el-button type="primary" @click="add">添加</el-button>
    
    <v-list @edit="edit($event)"></v-list>

    <v-add :info="info" @hide="hide" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info:{
        isShow:false,
        title:"添加菜单",
        isAdd:true
      }
    }
  },
  methods: {
    add(){
      this.info = {
        title:"添加轮播图",
        isShow:true,
        isAdd:true
      }
    },
    hide(){
      this.info.isShow=false
    },
    // 点击修改 弹框出现  $event可以接受子组件抛出的值
    edit(id){
      this.info={
        isShow:true,
        title:"修改菜单",
        isAdd:false
      }
      this.$refs.add.requestListOne(id);
    }
    
  },
  mounted() {
  }
}
</script>
<style scoped>
.el-button {
  margin: 10px 0;
}
</style>