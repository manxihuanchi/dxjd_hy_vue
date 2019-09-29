<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <div id="myChart" style="width: 100%;height:300px;text-align: center; "></div>
  </div>
</template>

<script>
  import {login,oldPeople,oldPeople2} from  '../api'
export default {
  name: 'home',
  data () {
    return {
      title: '',
      myChart:null,
      queryKey:''
    }
  },
methods:{
  async submitForm() {
    debugger
    const res = await login("admin","123456")
  },
  async grid(){
    if(document.getElementById('myChart')!=null){
      this.$echarts.dispose(document.getElementById('myChart'));
      this.myChart = this.$echarts.init(document.getElementById('myChart'));
    }
    const res = await oldPeople();
    this.title = res.ks.title
    this.queryKey = res.result.queryKey
    const res2 = await oldPeople2(this.queryKey);
    debugger
    var entitys = res2.result.entities;
debugger
    var ydata = [];
    var xdata = [];
    var pCount = [];

    entitys.forEach(function (item) {
      console.log(item.年龄事实.人数);

      // xdata +=item.街道社区级.所属社区 + ,
      var str = item.街道社区级.所属社区 + "/" + item.街道社区级.几岁老人;
      // xdata.push(item.街道社区级.所属社区);
      xdata.push(str);
      pCount.push(item.年龄事实.人数);
    });

    debugger
    var option = {
      color: ['#3398DB'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : xdata,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
          // data : ydata,
          // axisTick: {
          //   alignWithLabel: true
          // }
        }
      ],
      series : [
        {
          name:'人数',
          type:'bar',
          barWidth: '60%',
          data:pCount
        }
      ]
    };
    this.myChart.setOption(option,true);
  }
},
  mounted(){
    debugger;
    this.grid()
  },
created(){

  // this.submitForm()
}
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
