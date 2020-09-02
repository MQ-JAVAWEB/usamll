<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      width="50%"
      @closed="colse"
    >
      <el-form
        :model="form"
        label-width="80px"
      >
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="{children:'children',label:'title'}"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addRole"
          v-if="info.isAdd"
        >添 加</el-button>
        <el-button
          type="primary"
          @click="updateRole"
          v-else
        >修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestAddRole, requestRoleListOne, requestUpdateRole } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
export default {
  components: {
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList"
    })
  },
  props: ['info'],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1
      }


    }
  },
  methods: {
    ...mapActions({
      menuListAction: "menu/menuListAction",
      roleListAction: "role/roleListAction"
    }),
    cancel() {
      this.info.isShow = false
    },
    colse(){
      if(!this.info.isAdd){
        this.empty();
      }
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1
      }
      this.$refs.tree.setCheckedKeys([])
    },
    // 添加角色
    addRole() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestAddRole(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert('添加成功')
          this.empty()
          this.info.isShow = false;
          this.roleListAction();
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 获取一条数据
    reqRoleOne(id) {
      requestRoleListOne(id).then(res => {
        this.form = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        this.form.id = id;
      })
    },
    // 更新
    updateRole() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestUpdateRole(this.form).then(res=>{
        if (res.data.code==200) {
          successAlert('修改成功')
          this.empty()
          this.info.isShow = false;
          this.roleListAction();
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    
    
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.menuListAction()
    }
  }
}
</script>
<style scoped>
</style>