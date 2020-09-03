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
        :rules="rules"
      >
        <el-form-item label="所属角色" prop="roleid">
          <el-select v-model="form.roleid" placeholder="请选择所属角色">
            <el-option
              value="0"
              label="--请选择--"  
              disabled
            ></el-option>
            <el-option v-for="item in roleList" :key="item.id" :value="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
        <el-button @click="can">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser"
          v-if="info.isAdd"
        >添 加</el-button>
        <el-button
          type="primary"
          @click="updateUser"
          v-else
        >修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestAddUser,requestUserListOne, requestUpdateUser } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
export default {
  components: {
  },
  computed: {
    ...mapGetters({
      userList: "manage/userList",
      roleList: "role/roleList",
    })
  },
  props: ['info'],
  data() {
    return {
      form: {
        roleid:"",
        username: "",
        password:"",
        status: 1
      },
      rules:{
        roleid:[
          { required: true, message: '请选择所属角色', trigger: 'change' }
        ],
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }


    }
  },
  methods: {
    ...mapActions({
      userListAction: "manage/userListAction",
      roleListAction: "role/roleListAction",
      userPageActions:"manage/userPageActions",
      getUserTotalAction:"manage/getUserTotalAction"
    }),
    
    colse() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        roleid:"",
        username: "",
        password:"",
        status: 1
      }
      
    },
    // 添加角色
    addUser() {
      if(this.form.roleid == ''){
        warningAlert('请选择所属角色')
        return
      }
      if(this.form.username == ''){
        warningAlert('请填写用户名')
        return
      }
      requestAddUser(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert('添加成功')
          this.empty()
          this.info.isShow = false;
          this.userPageActions(1);
          this.getUserTotalAction()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 获取一条数据
    reqUserOne(uid) {
      requestUserListOne(uid).then(res => {
        this.form = res.data.list;
        this.form.password = "";
      })
    },
    can(){
      this.info.isShow = false;
      this.empty();
    },
    // 更新
    updateUser() {
      if(this.form.roleid == ''){
        warningAlert('请选择所属角色')
        return
      }
      if(this.form.username == ''){
        warningAlert('请填写用户名')
        return
      }
      requestUpdateUser(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert('修改成功')
          this.empty()
          this.info.isShow = false;
          this.userListAction();
        } else {
          warningAlert(res.data.msg)
        }
      })
    },


  },
  mounted() {
    if (this.roleList.length == 0) {
      this.roleListAction()
    }
  }
}
</script>
<style scoped>
</style>