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
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pwd"></el-input>
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
          
          @click="updateMember"
        >修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestMemberListOne, requestUpdateMember } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
export default {
  components: {
  },
  props:['info'],
  computed: {
    ...mapGetters({
      memberList: "member/memberList"
    })
  },
  data() {
    return {
      form:{
        nickname: "",
        phone:"",
        password:"",
        status: 1
      },
      pwd:"",
      rules:{
        nickname:[
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      memberListAction:"member/memberListAction"
    }),
    cancel() {
      this.info.isShow = false
    },
    colse() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    empty() {
      this.form = {
        nickname: "",
        phone:"",
        password:"",
        status: 1
      }
      this.pwd=""
    },
    
    // 获取一条数据
    reqMemberOne(uid) {
      requestMemberListOne(uid).then(res => {
        this.form = res.data.list;
        
      })
    },
    // 更新
    updateMember() {
      if(this.form.nickname == ''){
        warningAlert('请填写昵称')
        return
      }
      if(this.form.phone == ''){
        warningAlert('请填写手机号')
        return
      }
      this.form.password = this.pwd?this.form.password:this.pwd
      requestUpdateMember(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert('修改成功')
          this.empty()
          this.info.isShow = false;
          this.memberListAction();
        } else {
          warningAlert(res.data.msg)
        }
      })
    },


  },
  mounted() {
    if(this.memberList.length==0){
      this.memberListAction()
    }
  }
}
</script>
<style scoped>
</style>