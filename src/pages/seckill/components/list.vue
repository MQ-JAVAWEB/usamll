<template>
  <div>
    <el-table
      :data="seckList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="title"
        label="活动名称"
      
        width="180"
      >
      </el-table-column>
      
      <el-table-column
        prop="name"
        label="状态"
        width="100"
      >
      <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="scope.row.status===1"
          >启用</el-button>
          <el-button
            type="info"
            v-else
          >禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      <template slot-scope="scope">
          <el-button
            type="primary"
            @click="edit(scope.row.id)"
          >编辑</el-button>
          <v-del
            
            @confirm="del(scope.row.id)"
          >删除</v-del>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestDelCate, requestDelBanner, requestDelGoods, requestDelSeck } from '../../../util/request'
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
      seckList:"seckill/seckList"
      
    })
  },
  methods: {
    changePage(page){
      this.goodsPageActions(page)
    },
    ...mapActions({
       seckListAction:"seckill/seckListAction"
      
    }),
    edit(id){
      this.$emit('edit',id)
    },
    del(id){
      requestDelSeck({id}).then(res=>{
        if(res.data.code==200){
          successAlert('删除成功');
          this.seckListAction()
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
   this.seckListAction()
  }
}
</script>
<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>