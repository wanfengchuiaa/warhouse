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
              prop="name"
              :rules="[
                { required: true, message: '仓库名称不能为空'},
              ]"
            >
              <el-select v-model="dateForm.type" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="库区名称"
              prop="type"
              :rules="[
                { required: true, message: '仓库类型不能为空'},
              ]"
            >
              <el-input v-model="dateForm.code" type="text" autocomplete="off" />
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="温度类型"
              prop="name"
              :rules="[
                { required: true, message: '仓库名称不能为空'},
              ]"
            >
              <el-select v-model="dateForm.type" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        省市区-->
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item
              label="称重类型"
              prop="name"
              :rules="[
                { required: true, message: '仓库名称不能为空'},
              ]"
            >
              <el-select v-model="dateForm.type" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="用途属性"
              prop="name"
              :rules="[
                { required: true, message: '仓库名称不能为空'},
              ]"
            >
              <el-select v-model="dateForm.type" placeholder="请选择" style="width: 100%">
                <!-- 渲染-->
                <el-option label="中转仓" value="ZZ" />
                <el-option label="加工仓" value="JG" />
                <el-option label="储备仓" value="CB" />
                <el-option label="冷藏仓" value="LC" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="负责人"
              prop="type"
              :rules="[
                { required: true, message: '仓库类型不能为空'},
              ]"
            >
              <el-input v-model="dateForm.code" type="text" autocomplete="off" />
            </el-form-item>

          </el-col>
          <el-col :span="6">
            <el-form-item
              label="联系电话"
              prop="name"
              :rules="[
                { required: true, message: '仓库名称不能为空'},
              ]"
            >
              <el-input v-model="dateForm.code" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item
              label="仓库状态"
            >
              <el-radio-group v-model="dateForm.status">
                <el-radio label="启用" value="1" />
                <el-radio label="停用" value="0" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2">
            <el-button round style="width: 100px">返回</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="warning" round style="width: 100px" @click="addopen">提交</el-button>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>
<script>

import AlCascader from '@/components/al-cascader'
import { addOpen } from '@/api/Basic1'

export default {
  components: { AlCascader },
  data() {
    return {
      arr: [],
      dateForm: {
        address: '',
        area: '', // this.arr[2].code,
        city: '', // this.arr[1].code,
        code: 'CK000591',
        location: '',
        name: '',
        personName: '',
        phone: '',
        province: '', // this.arr[0].code,
        status: '',
        surface: '',
        type: ''
      }
    }
  },
  methods: {
    async addopen() {
      await addOpen({
        address: this.dateForm.address,
        area: this.arr[2].code, // this.arr[2].code,
        city: this.arr[1].code, // this.arr[1].code,
        code: 'CK000591',
        location: `${this.arr[0].name}/${this.arr[1].name}/${this.arr[2].name}`,
        name: this.dateForm.name,
        personName: this.dateForm.personName,
        phone: this.dateForm.phone,
        province: this.arr[0].code, // this.arr[0].code,
        status: this.dateForm.status === '启用' ? '1' : '0',
        surface: this.dateForm.surface,
        type: this.dateForm.type
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
