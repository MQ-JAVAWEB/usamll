<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      @closed="close"
    >
      <el-form :model="form" label-width="80px" :rules="rules">
        
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片" >
          <div class="upload">
            <h3 class="upload-add">+</h3>
            <img
              :src="imgUrl"
              class="upload-img"
            >
            <input
              type="file"
              class="upload-file"
              @change="upload"
            >

          </div>

        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="can">取 消</el-button>
        <el-button
          type="primary"
          @click="addCate"
          v-if="info.isAdd"
        >添 加</el-button>
        <el-button
          type="primary"
          @click="updateCate"
          v-else
        >修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { successAlert, warningAlert } from '../../../util/alert';
import {requestAddBanner, requestUpdateBanner, requestBannerListOne } from '../../../util/request';
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['info'],
  components: {
  },
  data() {
    return {
      form: {
        title:"",
        img:"",
        status: 1
      },
      imgUrl: "",
      rules:{
        title:[
          { required: true, message: '请输入轮播图标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
    ...mapGetters({
      bannerList:"banner/bannerList"
    })
  },
  methods: {
    ...mapActions({
       bannerListAction:"banner/bannerListAction"
    }),
    close(){
      if(!this.info.isAdd){
        this.empty()
      }
    },
    can(){
      this.info.isShow = false;
      this.empty();
    },
    empty(){
      this.form={
        title:"",
        img:"",
        status: 1
      };
      this.imgUrl=""
    },
    upload(e) {
      let file = e.target.files[0]

      let imgArr = ['.jpg','.jpeg','.png','.gif']
  
      let extname = file.name.slice(file.name.lastIndexOf('.'));
      console.log(extname);
      if(!imgArr.includes(extname)){
        warningAlert('格式错误，请重新上传');
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file
    },
    // 添加
    addCate(){
      if(this.form.title == ''){
        warningAlert('请填写轮播图标题')
        return
      }
      if(!this.form.img){
        warningAlert('请选择商品图片')
        return
      }
      requestAddBanner(this.form).then(res=>{
        if(res.data.code==200){
          successAlert('添加成功');
          this.empty();
          this.info.isShow = false;
          this.bannerListAction()
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 获取一条数据
    reqBannerOne(id){
      requestBannerListOne(id).then(res=>{
        this.form = res.data.list
        this.form.id = id
        this.imgUrl =this.$imgUrl +  this.form.img
      })
    },
    // 修改
    updateCate(){
      if(this.form.title == ''){
        warningAlert('请填写轮播图标题')
        return
      }
      if(!this.form.img){
        warningAlert('请选择商品图片')
        return
      }
      requestUpdateBanner(this.form).then(res=>{
        if(res.data.code==200){
          successAlert('修改成功');
          this.empty();
          this.info.isShow = false;
          this.bannerListAction()
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.bannerListAction()
  }
}
</script>
<style scoped>
.upload {
  width: 150px;
  height: 150px;
  position: relative;
  border: 1px dashed #ccc;
}
.upload-add {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 40px;
  font-weight: normal;
}
.upload-file {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  
}
.upload-img {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>                                    