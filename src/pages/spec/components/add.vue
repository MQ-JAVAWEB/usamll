<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      width="50%"
      @closed="colse"
      @opened="open"
    >
      <el-form
        :model="form"
        label-width="80px"
        :rules="rules"
        ref="form"
      >
        
        <el-form-item label="规格名称" prop="specsname">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index" >
          <el-row>
            <el-col  :span="18">
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col  :span="4">
              <el-button type="primary" @click="pushAttr" v-if="index==0">新增规格属性</el-button>
              <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
            </el-col>
          </el-row>
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
          @click="addSpecs"
          v-if="info.isAdd"
        >添 加</el-button>
        <el-button
          type="primary"
          @click="updateSpecs"
          v-else
        >修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { requestAddSpecs, requestSpecsListOne, requestUpdateSpecs } from '../../../util/request'
import { successAlert, warningAlert } from '../../../util/alert'
export default {
  components: {
  },
  computed: {
    
  },
  props: ['info'],
  data() {
    return {
      attrArr:[
        {
          value:""
        }
      ],
      form: {
        specsname:"",
        attrs: "",
        status: 1
      },
      rules:{
        specsname:[
          { required: true, message: '请输入规格名称', trigger: 'blur' }
        ]
      }


    }
  },
  methods: {
    
    pushAttr(){
      this.attrArr.push({value:""})
    },
    delAttr(index){
      this.attrArr.splice(index,1)
    },
    ...mapActions({
      getSpecsTotalAction:"spec/getSpecsTotalAction",
      specsPageActions:"spec/specsPageActions"
    }),
    cancel() {
      this.info.isShow = false
      this.empty()
      this.$refs.form.clearValidate()
    },
    colse() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.$refs.form.clearValidate()
    },
    empty() {
      this.form = {
        specsname:"",
        attrs: "",
        status: 1
      }
      this.attrArr=[{value:""}]
    },
    // 添加
    addSpecs() {
      this.$refs.form.clearValidate()
      if(this.form.specsname == ''){
        warningAlert('请填写规格名称')
        return
      }
      this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
      if(!(this.attrArr.map(item=>item.value)).find(item=>item=="")){
        warningAlert('存在未填写项')
        return
      }
      requestAddSpecs(this.form).then(res=>{
        if(res.data.code==200){
          successAlert('添加成功')
          this.empty();
          this.info.isShow= false;
          this.getSpecsTotalAction()
          this.specsPageActions(1);
        }
      })
    },
    //获取一条数据
    reqSpecsOne(id) {
      requestSpecsListOne(id).then(res => {
        
          this.form = res.data.list[0]
          let arr = JSON.parse(this.form.attrs).map(item=>{
            return {value:item}
          });
          // console.log(arr); //[{value: "S"}{value: "M"}{value: "L"}]
          this.attrArr = arr;
        
      })
    },
    open(){
      this.$refs.form.clearValidate()
    },
    // 更新
    updateSpecs() {
      this.$refs.form.clearValidate()
      this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
      requestUpdateSpecs(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert('修改成功')
          this.empty()
          this.info.isShow = false;
          this.specsListAction();
        } else {
          warningAlert(res.data.msg)
        }
      })
    },


  },
  mounted() {
    
  }
}
</script>
<style scoped>
</style>