<template>
  <div>
    <el-table
      :data="specsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column
        prop="id"
        label="规格编号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="specsname"
        label="规格名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="规格属性"
        width="180"
      >
      <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column label="状态">
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
        prop="name"
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
      :total="specsTotal"
      :page-size="specsSize"
      :current-page="specsPage"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestRoleListOne, requestDelRole, requestDelUser, requestDelSpecs } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
export default {
  components: {
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      specsList: "spec/specsList",
      specsTotal: "spec/specsTotal",
      specsSize: "spec/specsSize",
      specsPage: "spec/specsPage"
    })
  },
  methods: {
    ...mapActions({
      specsListAction: "spec/specsListAction",
      getSpecsTotalAction: "spec/getSpecsTotalAction",
      specsPageActions: "spec/specsPageActions"
    }),
    edit(id) {
      this.$emit('edit', id)
    },
    // 删除
    del(id) {
      requestDelSpecs({ id }).then(res => {
        if (res.data.code == 200) {
          successAlert('删除成功')
          this.getSpecsTotalAction()
          this.changePage(1)
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    changePage(page) {
      this.specsPageActions(page)
    }
  },
  mounted() {
    this.specsListAction()
    this.getSpecsTotalAction();

  }
}
</script>
<style scoped>
</style>