<template>
  <div>
    
    <div id="main"></div>

  </div>
</template>
<script>
import { mapGetters,mapActions} from 'vuex'
import echarts from "echarts"
export default {
  components: {
  },
  data() {
    return {
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
    })
  },
  mounted() {
    
      this.cateListAction();
    
  },
  watch:{
    cateList:{
      handler() {
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '商品分类'
            },
            tooltip: {},
            legend: {
                data:['数量']
            },
            xAxis: {
                data: this.cateList.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'line',
                data: [5, 1, 1, 2]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep:true
    }
  }
}
</script>
<style scoped>
#main {
  width: 80%;
  height: 400px;
  border: 1px solid #CCc;
  background-color: #f4f4f4;
  margin: 60px auto 0;
}
</style>