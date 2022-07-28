<template>
  <div style="padding: 0 30px">
    <el-card>
      <el-row :gutter="30">
        <el-col :span="6">
          <h5 style="margin-top: 0;color: #9d8e88;font-size: 12px;">仓区名称</h5>
          <el-input v-model="Pag.areaName" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <h5 style="margin-top: 0;color: #9d8e88;font-size: 12px;">库位名称</h5>
          <el-input v-model="Pag.name" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <h5 style="margin-top: 0;color: #9d8e88;font-size: 12px;">库位状态</h5>
          <el-select v-model="status.status" placeholder="请选择" style="width: 100%">
            <el-option label="全部" value="2" />
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <div
            style="margin-top: 37px;margin-left: 165px"
          >
            <el-button type="warning" round @click="QueryLocation">搜索</el-button>
            <el-button round @click="Reset">重置</el-button>
          </div>

        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row type="flex" justify="">
        <el-col :span="20">
          <el-button type="success" round @click="checked">新增库位</el-button>
        </el-col>
        <el-col :span="6">
          <el-button style="margin-right: 30px" round>下载库位模板</el-button>
          <el-button round>导入库区信息</el-button>
        </el-col>

      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f9f6ee','text-align': 'center'}"
        :cell-style="{'text-align': 'center'}"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="warehouseName"
          label="所属仓库"
          width="150"
        />
        <el-table-column
          prop="code"
          label="库位编号"
          width="150"
        />
        <el-table-column
          prop="areaName"
          label="库区名称"
          width="150"
        />
        <el-table-column
          prop="areaCode"
          label="库位编号"
          width="150"
        />
        <el-table-column
          prop="name"
          label="库位名称"
          width="280"
        />
        <el-table-column
          prop="temperatureType"
          label="温度类型"
          width="150"
        >
          <template v-slot="{row}">
            <span>{{ row.temperatureType === 'CW' ? '常温' : row.temperatureType === 'HW' ? '恒温' : '冷藏' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="bearingType"
          label="承重类型"
          width="150"
        >
          <template v-slot="{row}">
            <span>{{ row.bearingType === 'BX' ? '重型' : row.bearingType === 'ZX' ? '中型' : '轻型' }}</span>
          </template>

        </el-table-column>
        <el-table-column
          prop="useType"
          label="用途属性"
          width="150"
        >
          <template v-slot="{row}">
            <span>{{
              row.useType === 'CCQ' ? '存储区' : row.useType === 'ZJQ' ? '质检区' : row.useType === 'RKHCQ' ? '入库缓存区' : '出库缓存区'
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="停用状态"
          width="180"
        >
          <template v-slot="{row}">
            <span>{{ row.status === 1 ? '启用' : '停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="maxVolume"
          label="承载上线"
          width="150"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="250"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="130"
        >
          <template v-slot="scope">
            <el-button type="text" size="small" @click="checked(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="openShow(scope.row)">{{
              scope.row.status ? '停用' : '启用'
            }}
            </el-button>
            <el-button type="text" size="small" @click="delfrom">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="display:flex;justify-content: center;align-items: center;margin-top: 30px">
        <el-pagination
          :current-page="Pag.current"
          :page-sizes="[1, 2, 4, 5]"
          :page-size="Pag.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!--    对话框-->
    <el-dialog
      :title="`确认${open.status?'停用':'启用'}`"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>确定要{{ open.status ? '停用' : '启用' }} : {{ open.name }}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button round @click="dialogVisible = false">取 消</el-button>
        <el-button round type="warning" @click="emidopen">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import { emidQueryLocation, QueryLocation } from '@/api/Basic3'

export default {
  data() {
    return {
      dialogVisible: false,
      status: {
        status: '2'
      },
      open: {},
      currentPage: 1,
      total: 1,
      value: '',
      DepotName: '',
      tableData: [],
      Pag: {
        id: '',
        name: '',
        areaName: '',
        size: 5,
        current: 1
      }
    }
  },

  created() {
    this.QueryLocation()
  },
  methods: {
    Reset() {
      this.Pag.areaName = ''
      this.status.status = '2'
      this.Pag.name = ''
    },

    // 切换/编辑
    checked(id) {
      if (id) {
        this.$router.push({
          path: 'details3',
          query: {
            id
          }
        })
      } else {
        this.$router.push('details3')
      }
    },
    // 发送请求修改仓库状态
    async emidopen() {
      this.dialogVisible = false
      try {
        await emidQueryLocation({
          id: this.open.id,
          status: this.open.status ? 0 : 1
        }
        )
        this.$message.success('修改成功')
        await this.QueryLocation()
      } catch (e) {
        this.$message.success('修改失敗')
      }
    },
    // 打开停启用仓库的对话框
    openShow(row) {
      this.dialogVisible = true
      this.open = row
    },
    // 停/启用仓库
    handleClose(done) {

    },

    // 删除仓库项
    delfrom() {
      this.$notify.warning('暂不支持删除功能')
    },
    handleSizeChange(val) {
      this.Pag.size = val
      this.QueryLocation()
    },
    handleCurrentChange(val) {
      this.Pag.current = val
      this.QueryLocation()
    },
    async QueryLocation() {
      if (this.status.status !== '2') {
        const res = await QueryLocation({ ...this.Pag, ...this.status })
        console.log(res)
        this.tableData = res.data.data.records
        this.currentPage = res.data.data.pages
        this.total = res.data.data.total
      } else {
        const res = await QueryLocation(this.Pag)
        console.log(res)
        this.tableData = res.data.data.records
        this.currentPage = res.data.data.pages
        this.total = res.data.data.total
      }
    }
  }
}
</script>
<style scoped lang="scss">

.el-input__inner {
  margin: 0 10px;
}

.el-select .el-input {
  width: 100%;
}

.el-button--text {
  color: #e6a23c;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
</style>
