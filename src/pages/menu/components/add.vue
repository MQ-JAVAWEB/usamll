<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      width="50%"
      @closed='close'
      @opened="open"
    >
      <el-form
        :model="form"
        label-width="80px"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="菜单名称" 
          prop="title"
        >
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级名称" prop="pid"> 
          <el-select
            v-model="form.pid"
            
            @change="changePid"
          >
          
            <el-option
              label="顶级菜单"
              :value="0"
            ></el-option>
            <el-option v-for="item in menuList" :key="item.id"  :label="item.title" 
            :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">

          <el-radio
            :label="1"
            v-model="form.type"
            disabled
            
          >目录</el-radio>
          <el-radio
            :label="2"
            v-model="form.type"
            disabled
            
          >菜单</el-radio>

        </el-form-item>
        <el-form-item
          label="菜单图标"
          v-if="form.type==1"
        >
          <el-select
            v-model="form.icon"
            placeholder="请选择目录图标"
          >
            <el-option value="el-icon-setting">
              <template>
                <i class="el-icon-setting"></i>
              </template>
            </el-option>
            <el-option value="el-icon-delete-solid">
              <template>
                <i class="el-icon-delete-solid"></i>
              </template>
            </el-option>
            <el-option value="el-icon-upload">
              <template>
                <i class="el-icon-upload"></i>
              </template>
            </el-option>

          </el-select>

        </el-form-item>
        <el-form-item
          label="菜单地址"
          
          v-else
        >
          <el-select v-model="form.url">
            <el-option
              value=""
              label="--请选择--"
              disabled
            ></el-option>
            <el-option v-for="item in indexRouter" :key="item.path" :value="'/'+item.path"
              :label="item.name"
            ></el-option>
            

          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="addMenu"
          v-if="info.isAdd"
        >添 加</el-button>
        <el-button
          type="primary"
          @click="updateMenu"
          v-else
        >修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {successAlert,warningAlert} from "../../../util/alert"
import { requestAddMenu,requestMenuList, requestMenuListOne, requestUpdateMenu } from "../../../util/request"
import { mapActions, mapGetters } from 'vuex'
import {indexRouter} from "../../../router/index"
export default {
  computed: {
    ...mapGetters({
      menuList:"menu/menuList"
    })
  },
  props: ['info'],
  data() {
    return {
      form: {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      },
      indexRouter:indexRouter,
      rules:{
        title:[
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        pid:[
          { required: true, message: '请选择上级名称', trigger: 'change' }
        ],
        icon:[
          { required: true, message: '请选择菜单图标', trigger: 'change' }
        ],
        url:[
          { required: true, message: '请选择菜单地址', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      menuListAction:"menu/menuListAction"
    }),
    open(){
      this.$refs.form.clearValidate()
    },
    // 弹框消失
    cancel() {
      this.$emit('hide')
      this.empty()
    },
    // 重置form
    empty(){
      this.form = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      }
    },
    // 添加菜单
    addMenu() {
      this.$refs.form.clearValidate()
      if(this.form.title == ''){
        warningAlert('请填写菜单名称')
        return
      }
      if(this.menuList.id == 0){
        warningAlert('请选择上级名称')
        return
      } 
      
      if(this.form.type==1?this.form.icon=="":this.form.url == ''){
        warningAlert('请选择')
        return
      }
      requestAddMenu(this.form).then(res => {
        if(res.data.code==200){
          successAlert(res.data.msg);
          this.empty();
          this.$emit('hide')
          this.menuListAction();
        }else {
          warningAlert(res.data.msg);
        }
      })
    },
    // 获取一个菜单
    requestListOne(id){
      requestMenuListOne(id).then(res=>{
        this.form = res.data.list
        this.form.id=id;
      })
    },
    // 弹框消失
    close(){
     if(!this.info.isAdd){
       this.empty();
     }
     this.$refs.form.clearValidate()
    },
    can(){
      this.info.isShow = false;
      this.empty();
      this.$refs.form.clearValidate()
    },
    // 修改菜单
    updateMenu(){
      this.$refs.form.clearValidate()
      if(this.form.title == ''){
        warningAlert('请填写菜单名称')
        return
      }
      if(this.menuList.id == 0){
        warningAlert('请选择上级名称')
        return
      } 
      if(this.form.type==1?this.form.icon=="":this.form.url == ''){
        warningAlert('请选择')
        return
      }
      requestUpdateMenu(this.form).then(res=>{
        if(res.data.code==200){
          successAlert('修改成功');
          this.empty();
          this.$emit('hide')
          this.menuListAction();
        }
      })
    },
    changePid(){
      this.form.type=this.form.pid==0?1:2
    }
    
  },
  mounted() {
    
  }
}
</script>
<style scoped>
</style>