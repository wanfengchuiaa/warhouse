<template>
  <div>
    <el-card style="margin: 20px 30px">
      <el-form :model="dateForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item
              label="仓库编码"
            >
              <el-input v-model="dateForm.code" disabled type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="仓库名称"
              prop="name"
              :rules="[
                { required: true, message: '仓库名称不能为空'},
              ]"
            >
              <el-input v-model="dateForm.name" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="仓库类型"
              prop="type"
              :rules="[
                { required: true, message: '仓库类型不能为空'},
              ]"
            >
              <el-select v-model="dateForm.type" placeholder="请选择" style="width: 100%">
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
          <el-col :span="16">
            <el-form-item
              label="省/市/区"
            >
              <al-cascader v-model="arr" level="3" data-type="all" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="16">
            <el-form-item
              label="详细地址"
              prop="address"
              :rules="[
                { required: true, message: '地址不能为空'},
              ]"
            >
              <el-input v-model="dateForm.address" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item
              label="仓库面积"
            >
              <el-input v-model="dateForm.surface" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="负责人"
              prop="personName"
              :rules="[
                { required: true, message: '负责人不能为空',trigger: 'blur'},
              ]"
            >
              <el-input v-model="dateForm.personName" type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
import { addOpen, addOpenID, emidOpenstatus } from '@/api/Basic1'

export default {
  components: { AlCascader },
  data() {
    return {
      arr: [],
      dateForm: {
        address: '',
        area: '', // this.arr[2].code,
        city: '', // this.arr[1].code,
        code: '',
        location: '',
        name: '',
        personName: '',
        phone: '17633616310',
        province: '', // this.arr[0].code,
        status: '',
        surface: '',
        type: ''
      }
    }
  },
  created() {
    this.addOpenID()
    this.dateForm = this.$route.query
  },
  methods: {
    async addOpenID() {
      const res = await addOpenID()
      this.dateForm.code = res.data.data
    },
    async addopen() {
      if (this.$route.query.id) {
        try {
          await emidOpenstatus(this.dateForm)
          this.$message.success('修改成功')
          this.$router.back()
          this.$store.commit('handers/dellist1', this.$route.matched[1].meta)
        } catch (e) {
          this.$message.error('修改失败')
        }
      } else {
        try {
          await addOpen({
            address: this.dateForm.address,
            area: this.arr[2].code, // this.arr[2].code,
            city: this.arr[1].code, // this.arr[1].code,
            code: this.dateForm.code,
            location: `${this.arr[0].name}/${this.arr[1].name}/${this.arr[2].name}`,
            name: this.dateForm.name,
            personName: this.dateForm.personName,
            phone: this.dateForm.phone,
            province: this.arr[0].code, // this.arr[0].code,
            status: this.dateForm.status === '启用' ? '1' : '0',
            surface: this.dateForm.surface,
            type: this.dateForm.type
          })
          this.$message.success('新增成功')
          this.$router.back()

          this.$store.commit('handers/dellist1', this.$route.matched[1].meta)
        } catch (e) {
          this.$message.error('新增失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
