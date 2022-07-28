<template>
  <div :class="{'has-logo':showLogo}">
    <div
      style="margin: 20px auto; background-image:url('~@/assets/login/555.png');width: 150px;height: 50px;"
    >
      <img src="@/assets/login/555.png" style="width: 100%">
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        active-text-color="#ffc180"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div
      class="aaa"
      style="display:flex;justify-content: center;align-items: center; width: 100%;height: 65px;position:absolute;bottom: 0;left: 0;border-top: 1px solid #eee;color: #0076ff"
    >
      <div
        style="width: 34px;height: 34px;border-radius: 50%;"
      ><img style="width: 100%;height: 100%;border-radius: 50%" src="@/assets/login/22.jpg"></div>
      <p>admin</p>
      <div style="width: 1px;height: 20px;background-color:#ccc;margin: 0 10px" />
      <div>
        <i class="el-icon-s-unfold" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem },
  created() {
    console.log('1', this.$route)
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style scoped lang="scss">
.el-scrollbar {
  border-right: 1px solid #eee;
}

#app .sidebar-container {
  font-size: 14px;

  .aaa {
    color: #222222 !important;
    background-color: #fff;

    i {
      font-size: 23px;
      color: #ccc;
    }

    p {
      margin: 0 10px;
    }
  }
}
</style>
