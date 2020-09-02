<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="id"
        label="商品编号"
        
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="img"
        label="图片"
        width="180"
      >
      <template slot-scope="scope">
        <img :src="$imgUrl+scope.row.img">
      </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="是否新品"
        width="100"
      >
      <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="scope.row.isnew===1"
          >是</el-button>
          <el-button
            type="info"
            v-else
          >否</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="是否热卖"
        width="100"
      >
      <template slot-scope="scope">
          <el-button
            type="primary"
            v-if="scope.row.ishot===1"
          >是</el-button>
          <el-button
            type="info"
            v-else
          >否</el-button>
        </template>
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

    <el-pagination
      layout="prev, pager, next"
      :total="goodsTotal"
      :page-size="goodsSize"
      :current-page="goodsPage"
      @current-change="changePage"
    >
    </el-pagination>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestDelCate, requestDelBanner, requestDelGoods } from '../../../util/request'
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
      goodsList:"goods/goodsList",
      goodsTotal:"goods/goodsTotal",
      goodsSize:"goods/goodsSize",
      goodsPage:"goods/goodsPage"
    })
  },
  methods: {
    changePage(page){
      this.goodsPageActions(page)
    },
    ...mapActions({
       goodsListAction:"goods/goodsListAction",
       getGoodsTotalAction:"goods/getGoodsTotalAction",
       goodsPageActions:"goods/goodsPageActions",
       goodsPageActions:"goods/goodsPageActions"
    }),
    edit(id){
      this.$emit('edit',id)
    },
    del(id){
      requestDelGoods({id}).then(res=>{
        if(res.data.code==200){
          successAlert('删除成功');
          this.goodsPageActions(1)
          this.getGoodsTotalAction()
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.goodsListAction()
    this.getGoodsTotalAction()

  }
}
</script>
<style scoped>
img {
  width: 50px;
  height: 50px;
}
</style>