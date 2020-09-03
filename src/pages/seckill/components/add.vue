<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      @closed="colse"
    >
      <el-form
        :model="form"
        label-width="80px"
        :rules="rules"
      >

        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <el-date-picker
            v-model="timeValue"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>

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
            @change="changeSecondId"
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
        <el-form-item label="商品" prop="goodsid">
          <el-select
            v-model="form.goodsid"
            placeholder="请选择所属角色"
          >
            <el-option
              value=""
              label="--请选择--"
              disabled
            ></el-option>
            <el-option
              v-for="item in goods"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
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
          @click="addSeckill"
          v-if="info.isAdd"
        >添 加</el-button>
        <el-button
          type="primary"
          @click="updateSeckill"
          v-else
        >修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { successAlert, warningAlert } from '../../../util/alert';
import { requestAddBanner, requestUpdateBanner, requestBannerListOne, requestAddGoods, requestGoodsListOne, requestUpdateGoods, requestAddSeck, requestSeckListOne, requestUpdateSeck } from '../../../util/request';
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['info'],
  components: {
  },
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      timeValue: [],
      secondCateList: [],
      goods: [],
      rules:{
        title:[
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        first_cateid:[
          { required: true, message: '请选择一级分类', trigger: 'change' }
        ],
        second_cateid:[
          { required: true, message: '请选择二级分类', trigger: 'change' }
        ],
        goodsid:[
          { required: true, message: '请选择商品', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/goodsList",
      cateList: "cate/cateList",
      specsList: "spec/specsList"
    })
  },
  watch: {
    timeValue() {
      if (this.timeValue.length != 0) {
        [this.form.begintime, this.form.endtime] = this.timeValue
      }
    }
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
    changeSecondId() {
      this.goods = this.goodsList.filter(item => {
        if (item.second_cateid == this.form.second_cateid && item.first_cateid == this.form.first_cateid) {
          return item
        }
      });
      this.form.goodsid = ""
    },
    colse() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },



    ...mapActions({
      seckListAction:"seckill/seckListAction",
      cateListAction: "cate/cateListAction",
      specsListAction: "spec/specsListAction",
      goodsListAction: "goods/goodsListAction"
    }),
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.timeValue = []
      this.secondCateList = []
      this.goods = []
    },

    // 添加
    addSeckill() {
      if(this.form.title == ''){
        warningAlert('请填写活动名称')
        return
      }
      if(this.form.first_cateid == ''){
        warningAlert('请选择一级分类')
        return
      }
      if(this.form.second_cateid == ''){
        warningAlert('请选择二级分类')
        return
      }
      if(this.form.goodsid == ''){
        warningAlert('请选择商品')
        return
      }
      requestAddSeck(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert('添加成功');
          this.empty();
          this.info.isShow = false;
          this.seckListAction()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 获取一条数据
    reqSeckillOne(id) {
      requestSeckListOne(id).then(res => {
        this.form = res.data.list
        this.form.id = id
        this.secondCateList = this.cateList.find(item => item.id == this.form.first_cateid).children
        this.goods = this.goodsList.filter(item => {
          if (item.second_cateid == this.form.second_cateid && item.first_cateid == this.form.first_cateid) {
            return item
          }
        });
        this.timeValue.push(this.form.begintime)
        this.timeValue.push(this.form.endtime)
      })
      
    },
    // 修改
    updateSeckill() {
      if(this.form.title == ''){
        warningAlert('请填写活动名称')
        return
      }
      if(this.form.first_cateid == ''){
        warningAlert('请选择一级分类')
        return
      }
      if(this.form.second_cateid == ''){
        warningAlert('请选择二级分类')
        return
      }
      if(this.form.goodsid == ''){
        warningAlert('请选择商品')
        return
      }
      requestUpdateSeck(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert('修改成功');
          this.empty();
          this.info.isShow = false;
          this.seckListAction()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.cateListAction()
    }
    
      this.specsListAction(true)
   
    
      this.goodsListAction(true)
    

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