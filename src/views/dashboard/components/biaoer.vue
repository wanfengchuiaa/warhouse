<template>
  <el-card>
    <h4>入库/出库信息</h4>
    <div ref="tu2" style="height: 300px;width: 100%" />
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
import { InventoryUs } from '@/api/table'

export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#e4dbda', '#ffaa00'],
        series: [
          {
            type: 'pie',
            radius: ['45%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                color: ['#ffaa00'],
                fontWeight: '700'

              }
            },
            data: [
              { value: 1048, name: '冻结库存' },
              { value: 735, name: '可用库存' }

            ]
          }
        ]
      }
    }
  },
  mounted() {
    const myChart = echarts.init(this.$refs.tu2)
    myChart.setOption(this.option)
  },
  created() {
    this.InventoryUs()
  },
  methods: {
    async InventoryUs() {
      const res = await InventoryUs()
      // console.log(res)
      this.option.series[0].data = res.data.data
      // this.option.series[0].data = res.data.data.data[0].data
      // this.option.series[1].data = res.data.data.data[1].data
      const myChart = echarts.init(this.$refs.tu2)
      myChart.setOption(this.option)
    }
  }
}
</script>
<style scoped lang="scss">
.el-card {
  //height: 354px;
  width: 35%;
}
</style>
