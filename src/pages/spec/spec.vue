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
        title:"添加规格",
        isAdd:true
      }
    }
  },
  methods: {
    add(){
      this.info = {
        title:"添加规格",
        isShow:true,
        isAdd:true
      }
    },
    edit(id){
      this.info={
        isShow:true,
        title:"修改规格",
        isAdd:false
      }
      this.$refs.add.reqSpecsOne(id);
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