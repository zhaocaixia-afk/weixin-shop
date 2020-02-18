import { getMultiData } from '../../service/home.js'
Page({
  data: {
    banners: [],
    recommends: [],
    titleList: ['流行', '新款', '精选'],
    goods: {
      pop: { page: 0, list: [] },
      new: { page: 0, list: [] },
      sell: { page: 0, list: [] }
    }
  },
  onLoad: function (options) {
    // 1.进入首页获取到的数据
    getMultiData().then(res => {
      const banner = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      this.setData({
        banners: banner,
        recommends: recommend
      })
    })
  },
  // 2.navbar组件点击上传的事件
  handleNavbarClick(e){
    const index = e.detail.index
  }
})