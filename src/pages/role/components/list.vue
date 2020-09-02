<template>
  <div>
    <el-table
      :data="roleList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      
    >
      <el-table-column
        prop="id"
        label="菜单编号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="菜单名称"
        width="180"
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
import { mapGetters, mapActions } from 'vuex'
import { requestRoleListOne, requestDelRole } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
export default {
  components: {
  },
  data() {
    return {
      
    }
  },
  computed:{
    ...mapGetters({
      roleList:"role/roleList"
    })
  },
  methods: {
    ...mapActions({
      roleListAction:"role/roleListAction"
    }),
    edit(id){
      this.$emit('edit',id)
    },
    // 删除
    del(id){
      requestDelRole({id}).then(res=>{
        if(res.data.code==200){
          successAlert('删除成功')
          this.roleListAction()
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.roleListAction()
  }
}
</script>
<style scoped>
</style>