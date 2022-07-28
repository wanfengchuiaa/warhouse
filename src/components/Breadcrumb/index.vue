<template>
  <div>
    <!--    <el-tag type="danger">工作台</el-tag>-->
    <el-tag
      v-for="(item) in hanList"
      :key="item.path"
      :closable="item.meta.title !== '工作台'"
      type="danger"

      :class="{active:item.meta.title===flag}"
      @click="handleLink(item)"
      @close="delhander(item)"
    >
      {{ item.meta.title }}
    </el-tag>
    <!--    {{ levelList }}-->
  </div>
  <!--  <el-breadcrumb class="app-breadcrumb" separator="/">-->
  <!--    <transition-group name="breadcrumb">-->
  <!--      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">-->
  <!--        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{-->
  <!--          item.meta.title-->
  <!--        }}</span>-->
  <!--        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>-->
  <!--      </el-breadcrumb-item>-->
  <!--    </transition-group>-->
  <!--  </el-breadcrumb>-->
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      levelList: null,
      flag: ''
    }
  },

  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  computed: {
    ...mapGetters(['hanList'])
  },
  methods: {
    delhander(item) {
      this.$store.commit('handers/dellist', item)
    },
    getBreadcrumb() {
      // only show routes with meta.title
      // console.log(this.$route.matched)
      this.$store.commit('handers/addList', this.$route.matched[1])
      this.flag = this.$route.matched[1].meta.title

      // let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // const first = matched[0]
      //
      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      // }
      //
      // this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    // isDashboard(route) {
    //   const name = route && route.name
    //   if (!name) {
    //     return false
    //   }
    //   return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    // },
    // pathCompile(path) {
    //   // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    //   const { params } = this.$route
    //   var toPath = pathToRegexp.compile(path)
    //   return toPath(params)
    // },
    handleLink(item) {
      // this.$router.push(item.path)
      // const { redirect, path } = item
      // if (redirect) {
      //   this.$router.push(redirect)
      //   return
      // }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag.el-tag--danger .el-tag__close {
  color: #ccc;
}

.active {
  color: #ffac3f !important;
}

.el-tag {
  margin: 15px 8px 0;
  width: 90px;
  height: 38px;
  //text-align: center;
  background-color: #fff;
  line-height: 38px;
  border: 0;
  color: #918da0;
  font-size: 12px;

  .el-tag.el-tag--danger .el-tag__close {
    color: #ccc !important;
  }
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
