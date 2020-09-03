<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      
    >
      <el-form :model="form" label-width="80px" :rules="rules">
        <el-form-item label="上级分类" prop="pid">
          <el-select
            v-model="form.pid"
          >
            <el-option
              label="顶级分类"
              :value="0"
            ></el-option>
            <el-option v-for="item in cateList" :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" v-if="form.pid !=0">
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
import { requestAddCate, requestCateListOne, requestUpdateCate } from '../../../util/request';
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['info'],
  components: {
  },
  data() {
    return {
      form: {
        pid:0,
        catename:"",
        img:"",
        status: 1
      },
      imgUrl: "",
      rules:{
        catename:[
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        pid:[
          { required: true, message: '请选择上级分类', trigger: 'change' }
        ]
      }
    }
  },
  computed:{
    ...mapGetters({
      cateList:"cate/cateList"
    })
  },
  methods: {
    ...mapActions({
       cateListAction:"cate/cateListAction"
    }),
    empty(){
      this.form={
        pid:0,
        catename:"",
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
      if(this.form.catename == ''){
        warningAlert('请填写分类名称')
        return
      }
      if(this.cateList.id == 0){
        warningAlert('请选择上级分类')
        return
      }
      if(this.form.pid!=0&&this.form.img == ''){
        warningAlert('请上传图片')
        return
      }
      requestAddCate(this.form).then(res=>{
        if(res.data.code==200){
          successAlert('添加成功');
          this.empty();
          this.info.isShow = false;
          this.cateListAction()
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 获取一条数据
    reqCateOne(id){
      requestCateListOne(id).then(res=>{
        this.form = res.data.list
        this.form.id = id
        this.imgUrl =this.$imgUrl +  this.form.img
      })
    },
    can(){
      this.info.isShow = false;
      this.empty();
    },
    // 修改
    updateCate(){
      if(this.form.catename == ''){
        warningAlert('请填写分类名称')
        return
      }
      if(this.cateList.id == 0){
        warningAlert('请选择上级分类')
        return
      } 
      requestUpdateCate(this.form).then(res=>{
        if(res.data.code==200){
          successAlert('修改成功');
          this.empty();
          this.info.isShow = false;
          this.cateListAction()
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.cateListAction()
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