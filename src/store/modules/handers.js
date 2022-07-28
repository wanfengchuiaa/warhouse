const state = {
  handerList: []
}

const mutations = {
  // 添加头部面包屑的方法
  addList(state, text) {
    const flag = state.handerList.some((item) => {
      return item === text
    })
    if (flag) {
    } else {
      state.handerList.push(text)
    }
  },
  // 删除单个面包屑
  dellist(state, text) {
    state.handerList = state.handerList.filter((item) => {
      return item !== text
    })
  },

  dellist1(state, text) {
    state.handerList = state.handerList.filter((item) => {
      return item.title !== text.title
    })
  },
  // 删除全部面包屑
  delAlllist(state) {
    console.log(111111)
    state.handerList = state.handerList.filter((item) => {
      return item.meta.title === '工作台'
    })
  },
  // 删除其他面包屑
  delqtlist(state) {
    console.log(111111)
    state.handerList = state.handerList.filter((item) => {
      return item.meta.title === '工作台'
    })
  },
  // 删除左侧面包屑
  delLeftlist(state) {
    console.log('111111')
    state.handerList = state.handerList.filter((item, index) => {
      return index !== 1
    })
  },
  // 删除右侧面包屑
  delRightlist(state) {
    console.log(111111)
    state.handerList = state.handerList.filter((item, index) => {
      return index !== state.handerList.length - 1
    })
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
