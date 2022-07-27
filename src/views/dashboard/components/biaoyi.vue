<template>
  <div>
    <div style="display:flex;justify-content: space-between;align-items: center">
      <h4>入库/出库信息</h4>
      <div style="text-align:center;">
        <el-button :class="{active:show==='w'}" type="warning" @click="cheacktime('w')">本周</el-button>
        <el-button
          :class="{active:show==='e'}"
          style="border-left: 0;border-right: 0"
          type="warning"
          @click="cheacktime('e')"
        >本月
        </el-button>
        <el-button :class="{active:show==='c'}" type="warning" @click="cheacktime('c')">全年</el-button>
      </div>
    </div>
    <div ref="tu1" style="height: 500px" />
  </div>

</template>
<script>
import * as echarts from 'echarts'
import { AccessToInformation } from '@/api/table'

export default {
  data() {
    return {
      option: {
        color: ['#ff7100', '#ffb200'],

        tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
          trigger: 'axis',
          backgroundColor: 'rgba(32, 33, 36,.7)',
          borderColor: 'rgba(32, 33, 36,0.20)',
          borderWidth: 1,
          textStyle: { // 文字提示样式
            color: '#fff',
            fontSize: '12'
          }
        },
        legend: [{
          data: ['入库', '出库'],
          orient: 'horizontal',
          x: 'center', // 可设定图例在左、右、居中
          y: 'bottom', // 可设定图例在上、下、居中
          padding: [0, 50, 0, 0]
        }],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: { // X轴线 刻度线
            show: false,
            length: 10,
            lineStyle: {
              color: 'red',
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: '32%',
            barGap: '0%',
            name: '入库'

          },
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            barWidth: '32%',
            barGap: '0%',
            name: '出库'
          }
        ]
      },
      show: 'e'
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs.tu1)
    myChart.setOption(this.option)
  },
  created() {
    this.AccessToInformation()
  },
  methods: {
    cheacktime(type) {
      this.show = type
      this.AccessToInformation(type)
    },
    async AccessToInformation(type) {
      const res = await AccessToInformation(type || 'e')
      // console.log(res)
      this.option.xAxis.data = res.data.data.x
      this.option.series[0].data = res.data.data.data[0].data
      this.option.series[1].data = res.data.data.data[1].data
      const myChart = echarts.init(this.$refs.tu1)
      myChart.setOption(this.option)
    }
  }
}
</script>
<style scoped lang="scss">
.el-button {
  margin: 0 !important;
  border-radius: 0;
  width: 70px;
  height: 36px;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  color: #222222;
  //border-left: 0
  &.hover {
    color: #9a6e3a !important;
  }
}

.el-button + .el-button {
  margin-left: 0px;
}

.active {
  background-color: #ffb200 !important;
  color: #fff !important;
}
</style>
