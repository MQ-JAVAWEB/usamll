<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      @closed="colse"
      @opened="createEditer"
    >
      <el-form
        :model="form"
        label-width="80px"
        :rules="rules"
      >

        <el-form-item label="一级分类" prop="first_cateid">
          <el-select
            v-model="form.first_cateid"
            @change="changeFirstId"
          >
            <el-option
              value=""
              label="--请选择--"
              disabled
            ></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择所属角色"
          >
            <el-option
              value=""
              label="--请选择--"
              disabled
            ></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
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

        <el-form-item label="商品规格" prop="specsid">
          <el-select
            v-model="form.specsid"
            placeholder="请选择所属角色"
            @change="changeSpecsId"
          >
            <el-option
              value=""
              label="--请选择--"
              disabled
            ></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :value="item.id"
              :label="item.specsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" prop="specsattr">
          <el-select
            v-model="form.specsattr"
            multiple
          >
            <el-option
              value=""
              label="--请选择--"
              disabled
            ></el-option>
            <el-option
              v-for="item in specsAttrList"
              :key="item"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio
            v-model="form.isnew"
            :label="1"
          >是</el-radio>
          <el-radio
            v-model="form.isnew"
            :label="2"
          >否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio
            v-model="form.ishot"
            :label="1"
          >是</el-radio>
          <el-radio
            v-model="form.ishot"
            :label="2"
          >否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述">

          <div
            id="editor"
            v-if="info.isShow"
          >

          </div>

        </el-form-item>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="can">取 消</el-button>
        <el-button
          type="primary"
          @click="addGoods"
          v-if="info.isAdd"
        >添 加</el-button>
        <el-button
          type="primary"
          @click="updateGoods"
          v-else
        >修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { successAlert, warningAlert } from '../../../util/alert';
import { requestAddBanner, requestUpdateBanner, requestBannerListOne, requestAddGoods, requestGoodsListOne, requestUpdateGoods } from '../../../util/request';
import { mapGetters, mapActions } from 'vuex';
import E from "wangeditor"
export default {
  props: ['info'],
  components: {
  },
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      },
      imgUrl: "",
      secondCateList: [],
      specsAttrList: [],
      rules:{
        goodsname:[
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        first_cateid:[
          { required: true, message: '请选择一级分类', trigger: 'change' }
        ],
        second_cateid:[
          { required: true, message: '请选择二级分类', trigger: 'change' }
        ],
        price:[
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        market_price:[
          { required: true, message: '请输入市场价格', trigger: 'blur' }
        ],
        specsid:[
          { required: true, message: '请选择商品规格', trigger: 'change' }
        ],
        specsattr:[
          { required: true, message: '请选择商品属性', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      specsList: "spec/specsList"
    })
  },
  methods: {
    can(){
      this.info.isShow = false;
      this.empty();
    },
    changeFirstId() {
      this.secondCateList = this.cateList.find(item => item.id == this.form.first_cateid).children

      this.form.second_cateid = ""
    },
    changeSpecsId() {
      this.specsAttrList = this.specsList.find(item => item.id == this.form.specsid).attrs;
      this.form.specsattr = ""
    },
    colse() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    createEditer() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create()
      //给富文本编辑器赋值
      this.editor.txt.html(this.form.description)

    },


    ...mapActions({
      cateListAction: "cate/cateListAction",
      specsListAction: "spec/specsListAction",
      goodsListAction: "goods/goodsListAction",
      getGoodsTotalAction:"goods/getGoodsTotalAction",
      goodsPageActions:"goods/goodsPageActions"
    }),
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      };
      this.imgUrl = ""
      
    },
    upload(e) {
      let file = e.target.files[0]

      let imgArr = ['.jpg', '.jpeg', '.png', '.gif']

      let extname = file.name.slice(file.name.lastIndexOf('.'));
      console.log(extname);
      if (!imgArr.includes(extname)) {
        warningAlert('格式错误，请重新上传');
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file
    },
    // 添加
    addGoods() {
      if(this.form.first_cateid==''){
        warningAlert('请选择一级分类')
        return
      }
      if(this.form.second_cateid==''){
        warningAlert('请选择一级分类')
        return
      }
      if(!this.form.img){
        warningAlert('请选择商品图片')
        return
      }
      if(this.form.goodsname==''){
        warningAlert('请填写商品名称')
        return
      }
      if(this.form.price==''){
        warningAlert('请填写价格')
        return
      }
      if(this.form.market_price==''){
        warningAlert('请填写市场价格')
        return
      }
      if(this.form.specsid==''){
        warningAlert('请填写商品规格')
        return
      }
      if(this.form.specsattr==''){
        warningAlert('请填写商品属性')
        return
      }
      this.form.description = this.editor.txt.html()
       if(this.form.description==''){
        warningAlert('请填写商品描述')
        return
      }
      requestAddGoods(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert('添加成功');
          this.empty();
          this.info.isShow = false;
          this.goodsPageActions(1)
          this.getGoodsTotalAction()
        } else {
          warningAlert(res.data.msg)
        }
      })
      // console.log(this.form);
    },
    // 获取一条数据
    reqGoodsOne(id) {
      requestGoodsListOne(id).then(res => {
        this.form = res.data.list
        this.form.id = id
        this.imgUrl = this.$imgUrl + this.form.img
        this.form.specsattr = this.form.specsattr.split(',')
        this.secondCateList = this.cateList.find(item => item.id == this.form.first_cateid).children
        this.specsAttrList = this.specsList.find(item => item.id == this.form.specsid).attrs;
      })
    },
    // 修改
    updateGoods() {
      if(this.form.first_cateid==''){
        warningAlert('请选择一级分类')
        return
      }
      if(this.form.second_cateid==''){
        warningAlert('请选择一级分类')
        return
      }
      if(this.form.goodsname==''){
        warningAlert('请填写商品名称')
        return
      }
      if(this.form.price==''){
        warningAlert('请填写价格')
        return
      }
      if(this.form.market_price==''){
        warningAlert('请填写市场价格')
        return
      }
      if(!this.form.img){
        warningAlert('请选择商品图片')
        return
      }
      if(this.form.specsid==''){
        warningAlert('请填写商品规格')
        return
      }
      if(this.form.specsattr==''){
        warningAlert('请填写商品属性')
        return
      }
      this.form.description = this.editor.txt.html()
        if(this.form.description==''){
        warningAlert('请填写商品描述')
        return
      }
      requestUpdateGoods(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert('修改成功');
          this.empty();
          this.info.isShow = false;
          this.goodsPageActions(1)
          this.getGoodsTotalAction()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.getGoodsTotalAction()
    if (this.cateList.length == 0) {
      this.cateListAction()
    }
    if (this.specsList.length == 0) {
      this.specsListAction(true)
    }

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