<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="id"
        label="菜单编号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="菜单名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="菜单图标"
      >
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="菜单地址"
      >
      </el-table-column>
      <el-table-column
        label="状态"
      >
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
      >
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <v-del @confirm="del(scope.row.uid)">删除</v-del>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import { requestDelMenu } from '../../../util/request';
import { successAlert } from '../../../util/alert';
export default {
  components: {
  },
  data() {
    return {
      
    }
  },
  computed:{
    ...mapGetters({
      menuList:"menu/menuList"
    })
  },
  methods: {
    ...mapActions({
      menuListAction:"menu/menuListAction"
    }),
    edit(id){
      this.$emit('edit',id);
    },
    del(id){
      console.log(id);
      requestDelMenu({id}).then(res=>{
        if(res.data.code==200){
          successAlert('删除成功')
          this.menuListAction()       
          }
      })
    }
  },
  mounted() {
    this.menuListAction()
  }
}
</script>
<style scoped>
</style>