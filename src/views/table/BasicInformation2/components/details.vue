<template>
  <div>
    <el-card style="margin: 20px 30px">
      <el-form :model="dateForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item
              label="库区编号"
            >
              <el-input v-model="dateForm.code" disabled type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="所属仓库"
              prop="warehouseId"
              :rules="[
                { required: true, message: '所属仓库不能为空'},
              ]"
            >
              <el-select v-model="dateForm.warehouseId" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option v-for="item in arr" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="库区名称"
              prop="name"
              :rules="[
                { required: true, message: '库区名称不能为空'},
              ]"
            >
              <el-input v-model="dateForm.name" type="text" autocomplete="off" />
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="温度类型"
              prop="temperatureType"
              :rules="[
                { required: true, message: '温度类型不能为空'},
              ]"
            >
              <el-select v-model="dateForm.temperatureType" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option label="常温" value="CW" />
                <el-option label="冷藏" value="LC" />
                <el-option label="恒温" value="HW" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item
              label="称重类型"
              prop="bearingType"
              :rules="[
                { required: true, message: '称重类型不能为空'},
              ]"
            >
              <el-select v-model="dateForm.bearingType" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option label="重型" value="ZX" />
                <el-option label="輕型" value="QX" />
                <el-option label="中型" value="bX" />

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="用途属性"
              prop="useType"
              :rules="[
                { required: true, message: '用途属性不能为空'},
              ]"
            >
              <el-select v-model="dateForm.useType" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option label="入仓缓存区" value="RKHCQ" />
                <el-option label="出库缓存区" value="CKHCQ" />
                <el-option label="储存区" value="CCQ" />
                <el-option label="分拣区" value="FJQ" />
                <el-option label="质检区" value="ZJQ" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="负责人"
              prop="personName"
              :rules="[
                { required: true, message: '负责人不能为空'},
              ]"
            >
              <el-input v-model="dateForm.personName" type="text" autocomplete="off" />
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="联系电话"
              prop="phone"
              :rules="[
                { required: true, message: '联系电话不能为空'},
              ]"
            >
              <el-input v-model="dateForm.phone" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item
              label="仓库状态"
            >
              <el-radio-group v-model="dateForm.status">
                <el-radio :label="+1">启用</el-radio>
                <el-radio :label="+0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <el-button round style="width: 100px" @click="$router.back()">返回</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="warning" round style="width: 100px" @click="GetReservoir">提交</el-button>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>
<script>

import { addOpen } from '@/api/Basic1'
import { addReservoirID, emidReservoirID, GetReservoir, GoodsInquiryList } from '@/api/Basic2'

export default {
  data() {
    return {
      // arr: [],
      arr: [],
      dateForm: {
        bearingType: '',
        code: '',
        name: '',
        personName: '',
        phone: '17633616520',
        status: '',
        temperatureType: '',
        useType: '',
        warehouseId: ''
      }
    }
  },
  created() {
    this.GoodsInquiryList()
    this.addReservoirID()
    if (this.$route.query.id) {
      this.emidReservoirID(this.$route.query.id)
    }
  },
  methods: {
    async emidReservoirID(id) {
      const res = await emidReservoirID(id)
      this.dateForm = res.data.data
    },
    async addReservoirID() {
      const res = await addReservoirID()
      this.dateForm.code = res.data.data
    },
    async GoodsInquiryList() {
      const res = await GoodsInquiryList()
      console.log(res)
      this.arr = res.data.data
    },
    async GetReservoir() {
      try {
        await GetReservoir(this.dateForm)
        this.$message.success('成功')
        this.$router.back()
        this.$store.commit('handers/dellist1', this.$route.matched[1].meta)
      } catch (e) {
        this.$message.error('失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
