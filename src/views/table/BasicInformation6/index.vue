<template>
  <div class="bg">
    <div style="display:flex;justify-content: space-between">
      <div style="width: 100%;margin-right: 30px">
        <div class="table_box">
          <div class="table_left">
            <img src="@/assets/login/22.jpg" alt="">
            <p>仓库管理员</p>
          </div>
          <p class="p1">我不是为了输赢，我就是认真！</p>
          <p class="p2">————罗永浩</p>
          <div class="table_right" />
        </div>
        <el-card shadow="always" style="width: 100%;height: 282px;border-radius: 15px;margin-top: 20px">
          <h4 style="margin: 13px 0">待办事项</h4>
          <div style="display:flex;justify-content: space-between">
            <el-card v-for="(item,index) in todoList" :key="index" shadow="hover" class="kapian">
              <div style="display:flex; margin-bottom: 20px;align-items: center;padding-top: 0!important;">
                <div
                  class="yanse1"
                  :style="`background-color:${item.color};`"
                >
                  <i class="el-icon-s-management" style="line-height: 50px;font-size: 30px;color: #fff" />
                </div>
                <div style="margin-left: 15px">{{ item.name }}</div>
              </div>
              <div style="margin-top:46px;display:flex;align-items: center" class="todo_div">
                <span>新增</span><strong
                  style="margin-right: 15px"
                >{{ item.value1 }}</strong><span>待审核</span><strong
                  :style="`color:${item.color};`"
                >{{ item.value2 }}</strong>
              </div>
            </el-card>
          </div>

        </el-card>
      </div>
      <div>
        <el-card shadow="always" style="width: 261px;height: 451px;padding: 30px;border-radius: 15px;margin: 0">
          <h4 style="margin-bottom: 0px;margin-top: 0">通知公告</h4>
          <div v-for="item in 5" :key="item" style="border-top: 1px solid #eee;margin-top: 15px">
            <p style="margin: 20px 0 0 0;font-size: 14px;">紧急盘点通知</p>
            <p style="margin-top: 10px;font-size: 12px;">2020.11.22 18:55:22</p>
          </div>
        </el-card>
      </div>
    </div>
    <div>
      <el-card>
        <h4> 任务导航</h4>
        <div style="display:flex;justify-content: space-between">
          <el-card
            v-for="(item,index) in NavigationTask"
            :key="index"
            shadow="hover"
            class="kapian"
            style="width: 18%;margin:0 10px"
          >
            <div
              style="display:flex; align-items: center;padding-top: 0!important; justify-content: center;"
            >
              <div

                :style=" `text-align: center;width: 50px;height: 50px;background-color:${item.icon};border-radius: 10px`"
              >
                <i :class="item.color" style="line-height: 50px;font-size: 30px;color: #fff" />
              </div>
              <div style="margin-left: 50px">{{ item.text }}</div>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
import { getTodo } from '@/api/table'

export default {
  data() {
    return {
      todoList: [],
      color: ['#0076ff', '#ffb200', '#ff7100'],
      NavigationTask: [{
        text: '收货任务',
        icon: '#0076ff',
        color: 'el-icon-s-ticket'
      }, {
        text: '上架任务',
        icon: '#52d4f3',
        color: 'el-icon-video-camera-solid'
      }, {
        text: '盘点任务',
        icon: '#ff7100',
        color: 'el-icon-picture'
      }, {
        text: '拣货任务',
        icon: '#ff609e',
        color: 'el-icon-s-goods'
      }, {
        text: '交接任务',
        icon: '#ffb200',
        color: 'el-icon-platform-eleme'
      }]
    }
  },
  created() {
    this.getTodo()
  },
  methods: {
    async getTodo() {
      const res = await getTodo()
      res.data.data.forEach((item, index) => {
        item.color = this.color[index]
      })
      this.todoList = res.data.data
      console.log(res)
    }
  }
}
</script>
<style lang="scss">
.yanse1 {
  text-align: center;
  width: 50px;
  height: 50px;
  //background-color: #ffb200;
  border-radius: 10px
}

.todo_div {

  span {
    margin: 0 6px;
    font-size: 14px;
  }

  strong {
    font-size: 37px;
    font-weight: 400;

  }

  strong:nth-child(4) {
    color: #0076ff;
    font-weight: 400;
  }
}

.bg {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 30px;

}

.table_box {
  position: relative;
  height: 148px;
  width: 100%;
  background: linear-gradient(270deg, #ffc771, #ffa634);
  box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
  border-radius: 12px;

  .p1 {
    position: absolute;
    top: 22px;
    left: 192px;
    color: #ffffff;
    font-size: 18px;
  }

  .p2 {
    position: absolute;
    top: 61px;
    left: 346px;
    color: #ffffff;
    font-size: 18px;

  }
}

.table_left {
  position: absolute;
  top: 0;
  left: 0;
  height: 148px;
  width: 166px;
  text-align: center;
  background-image: url('~@/assets/login/img.png');
  background-size: cover;
}

.table_left img {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 62px;
  height: 62px;
  border-radius: 50%;
}

.table_left p {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 10px
}

.table_right {
  position: absolute;
  top: 0;
  right: 0;
  height: 148px;
  width: 426px;
  background-image: url('~@/assets/login/img_1.png');
  background-size: cover;
}

.kapian {
  position: relative;
  float: left;
  width: 32%;
  //height: 186px;
  background: #fbf7f7;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  background: hsla(0, 0%, 100%, .8);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 6%);
  border-radius: 8px;
  border: 1px solid #f5efee;
  background-color: #fbf7f7;
}

.kapian:hover {
  background-color: #fff;
}
</style>
