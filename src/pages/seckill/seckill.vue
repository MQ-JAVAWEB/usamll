<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info = "info" ref="goods"></v-add>
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
        title:"添加商品",
        isShow:false,
        isAdd:true
      }
    }
  },
  methods: {
    add(){
      this.info = {
        title:"添加商品",
        isShow:true,
        isAdd:true
      }
    },
    edit(id){
      this.info={
        title:"修改商品",
        isShow:true,
        isAdd:false
      }
      this.$refs.goods.reqGoodsOne(id)
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