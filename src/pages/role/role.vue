<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <v-list @edit="edit"></v-list>

    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
  components: {
    vList,vAdd
  },
  data() {
    return {
      info:{
        isShow:false,
        title:"添加角色",
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
    edit(id){
      this.info={
        isShow:true,
        title:"修改角色",
        isAdd:false
      }
      this.$refs.add.reqRoleOne(id);
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