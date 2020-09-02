<template>
  <div>
    <v-list @edit="edit"></v-list>

    <v-edit :info="info" ref="editMember"></v-edit>
  </div>
</template>
<script>
import vList from "./components/list"
import vEdit from "./components/edit"
export default {
  components: {
    vList,vEdit
  },
  data() {
    return {
      info:{
        isShow:false,
        title:"修改会员",
        
      }
    }
  },
  methods: {
    
    edit(uid){
      this.info={   
        isShow:true,
        title:"修改会员",
      }
      this.$refs.editMember.reqMemberOne(uid)
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
div {
  padding-top: 10px;
}
</style>