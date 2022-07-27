<template>
  <el-card>
    <h4>入库/出库信息</h4>
    <div ref="tu2" style="height: 300px;width: 100%" />
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
import { Reservoir } from '@/api/table'

export default {
  data() {
    return {
      option3: {
        color: ['#0076ff', '#52d4f3', '#5d7092', '#ffb200', '#ff7100'],
        tooltip: {
          trigger: 'item',
          formatter: ' {b}：{d}%',
          backgroundColor: 'rgba(50,50,50,0.7)',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          orient: 'vertical',
          right: '30%',
          top: '20%',
          icon: 'circle', // 设为圆形
          selectedMode: false, // 禁止选定
          itemGap: 20,
          itemWidth: 15,
          // 使用回调函数
          formatter: function(name) {
            const data = [
              { value: 348, name: '拣货区' },
              { value: 487, name: '出货区' },
              { value: 677, name: '暂存货区' },
              { value: 126, name: '进货暂存区' },
              { value: 298, name: '出货暂存区' }
            ]
            let total = 0
            let target
            for (let i = 0; i < data.length; i++) {
              total += data[i].value
              if (data[i].name === name) {
                target = data[i].value
              }
            }
            return (
              name +
              '        ' +
              ((target / total) * 100).toFixed() +
              '%' +
              '        ' +
              target
            )
          }
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ['30%', '50%'],
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'inside',
              color: '#fff',
              formatter: '{c}'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 348, name: '拣货区' },
              { value: 487, name: '出货区' },
              { value: 677, name: '暂存货区' },
              { value: 126, name: '进货暂存区' },
              { value: 298, name: '出货暂存区' }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs.tu2)
    myChart.setOption(this.option3)
  },
  created() {
    this.Reservoir()
  },
  methods: {
    async Reservoir() {
      await Reservoir()
    }
  }
}
</script>
<style scoped lang="scss">
.el-card {
  //height: 354px;
  width: 65%;
  margin-left: 30px;
}
</style>
