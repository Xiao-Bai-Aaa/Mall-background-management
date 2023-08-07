<template>
  <div style="width: 100%; height: 100%">
    <div class="top">
      <div>
        欢迎访问后台管理系统：当前时间是：{{ today }}
        (中国标准时间)
      </div>
    </div>
    <div class="count">
      <ul>
        <li>今日库存</li>
        <li>在线会员</li>
        <li>退款统计</li>
        <li>销量统计</li>
      </ul>
    </div>
    <div
      id="main"
      style="max-width: 1450px; min-width: 500px; height: 400px"
    ></div>
  </div>
</template>

<script>
import moment from "moment";
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/title");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/grid");
require("echarts/lib/component/legend");
require("echarts/lib/chart/line");
export default {
  data() {
    return {
      // 指定图表的配置项和数据
      today: moment().format("YYYY-MM-DD  H:mm:ss"),
      t: null,
      option: {
        // 标题
        title: {
          text: "Stacked Line",
        },
        // 提示框
        tooltip: {
          trigger: "axis", //触发类型
        },
        // 图例
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        // 网格
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        // 工具栏
        toolbox: {
          feature: {
            //工具栏配置项
            saveAsImage: {}, //保存为图片
          },
        },
        // x轴
        xAxis: {
          type: "category", //类目轴
          boundaryGap: false, //坐标轴两边留白策略
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //类目数据
        },
        // y轴
        yAxis: {
          type: "value", //数值轴
        },
        // 数据
        series: [
          {
            name: "Email", //系列名称
            type: "line", //折线图
            stack: "Total", //数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置
            data: [120, 132, 101, 134, 90, 230, 210], //系列中的数据内容数组
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
  created() {
    this.t = setInterval(() => {
      this.today = moment().format("YYYY-MM-DD  H:mm:ss");
    }, 1000);
  },
  methods: {},
  computed: {},
  components: {},
  filters: {},
  watch: {},
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    this.option && myChart.setOption(this.option);
    window.onresize = function () {
      myChart.resize();
    };
  },
};
</script>

<style lang="scss" scoped>
#main {
  background-color: #d3dce6;
  border-radius: 5px;
  padding: 10px;
}
.top {
  > div {
    background-color: #d3dce6;
    padding: 10px;
    border-radius: 5px;
  }
}
.count {
  ul {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    li {
      padding: 10px;
      width: 23%;
      height: 100px;
      background-color: #d3dce6;
      border-radius: 5px;
    }
  }
}
</style>
