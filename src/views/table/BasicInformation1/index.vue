<template>
  <div style="padding: 0 30px">
    <el-card>
      <el-row :gutter="30">
        <el-col :span="6">
          <h5 style="margin-top: 0;color: #9d8e88;font-size: 12px;">仓库编号</h5>
          <el-input v-model="Pag.like_code" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <h5 style="margin-top: 0;color: #9d8e88;font-size: 12px;">仓库名称</h5>
          <el-input v-model="Pag.like_name" placeholder="请输入" />
        </el-col>
        <el-col :span="6">
          <h5 style="margin-top: 0;color: #9d8e88;font-size: 12px;">仓库状态</h5>
          <el-select v-model="Pag.status" placeholder="请选择" style="width: 100%">
            <el-option label="全部" value=" " />
            <el-option label="启用" value="1" />
            <el-option label="停用" value="0" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <div
            style="margin-top: 37px;margin-left: 165px"
          >
            <el-button type="warning" round @click="GetWarehouse">搜索</el-button>
            <el-button round @click="Reset">重置</el-button>
          </div>

        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-button type="success" round @click="checked">新增仓库</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f9f6ee','text-align': 'center'}"
        :cell-style="{'text-align': 'center'}"
      >
        <el-table-column
          prop="includedNum"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="code"
          label="仓库编码"
          width="150"
        />
        <el-table-column
          prop="name"
          label="仓库名称"
          width="150"
        />
        <el-table-column
          prop="type"
          label="仓库类型"
          width="150"
        />
        <el-table-column
          prop="location"
          label="省/市/区"
          width="280"
        />
        <el-table-column
          prop="address"
          label="详细地址"
          width="150"
        />
        <el-table-column
          prop="type"
          label="仓库状态"
          width="150"
        />
        <el-table-column
          prop="surface"
          label="仓库面积m²"
          width="150"
        />
        <el-table-column
          prop="logicDel"
          label="库区数量"
          width="150"
        />
        <el-table-column
          prop="personName"
          label="负责人"
          width="150"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
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
            <el-button type="text" size="small" @click="emid(scope)">编辑</el-button>
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
          :page-size="1"
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
import { emidOpenstatus, GetWarehouse } from '@/api/Basic1'

export default {
  data() {
    return {
      dialogVisible: false,
      open: {},
      currentPage: 1,
      total: 1,
      value: '',
      tableData: [],
      Pag: {
        like_code: '',
        like_name: '',
        current: 1,
        status: '',
        size: 4,
        descs: 'createTime'
      }
    }
  },

  created() {
    this.GetWarehouse()
  },
  methods: {
    Reset() {
      this.Pag.like_code = ''
      this.Pag.like_name = ''
    },
    // 切换
    checked() {
      this.$router.push('details')
    },
    // 发送请求修改仓库状态
    async emidopen() {
      this.dialogVisible = false
      try {
        await emidOpenstatus(
          this.open.id,
          this.open.status ? 0 : 1
        )
        this.Message.success('修改成功')
      } catch (e) {
        this.Message.error('修改失败')
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

    // 编辑
    emid(scoped) {
      console.log(scoped)
    },
    // 删除仓库项
    delfrom() {
      this.$notify.warning('暂不支持删除功能')
    },
    handleSizeChange(val) {
      this.Pag.size = val
      this.GetWarehouse()
    },
    handleCurrentChange(val) {
      this.Pag.current = val
      this.GetWarehouse()
    },
    async GetWarehouse() {
      const res = await GetWarehouse(this.Pag)
      console.log(res)
      this.tableData = res.data.data.records
      this.currentPage = res.data.data.pages
      this.total = res.data.data.total
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
