<template>
  <div>
    <el-table
      :data="userList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column
        prop="id"
        label="用户编号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="所属角色"
        width="180"
      >
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
            @click="edit(scope.row.uid)"
          >编辑</el-button>
          <v-del
            
            @confirm="del(scope.row.uid)"
          >删除</v-del>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="userTotal"
      :page-size="userSize"
      :current-page="userPage"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestRoleListOne, requestDelRole, requestDelUser } from '../../../util/request'
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
      userList: "manage/userList",
      userTotal: "manage/userTotal",
      userSize: "manage/userSize",
      userPage: "manage/userPage"
    })
  },
  methods: {
    ...mapActions({
      userListAction: "manage/userListAction",
      getUserTotalAction: "manage/getUserTotalAction",
      userPageActions: "manage/userPageActions"
    }),
    edit(uid) {
      this.$emit('edit', uid)
    },
    // 删除
    del(uid) {
      requestDelUser({ uid }).then(res => {
        if (res.data.code == 200) {
          successAlert('删除成功')
          this.getUserTotalAction()
          this.changePage(1)
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    changePage(page) {
      this.userPageActions(page)
    }
  },
  mounted() {
    this.userListAction()
    this.getUserTotalAction();

  }
}
</script>
<style scoped>
</style>