import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'
Page({
  data: {
    banners: [],
    recommends: [],
    titleList: ['流行', '新款', '精选'],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    }
  },
  onLoad: function(options) {
    // 1.进入首页获取到的数据
    this._getMultiData()
    this._getGoodsData('pop')
    // this._getGoodsData('new')
    // this._getGoodsData('sell')
  },
  // 1.获取轮播图数据
  _getMultiData() {
    getMultiData().then(res => {
      const banner = res.data.data.banner.list.map(item => {
        return item.image
      })
      const recommend = res.data.data.recommend.list
      this.setData({
        banners: banner,
        recommends: recommend
      })
    })
  },
  // 2.navbar组件点击上传的事件
  handleNavbarClick(e) {
    const index = e.detail.index
  },
  // 3.获取商品数据
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      // console.log(res)
      const list = res.data.data.list

      var oldList = this.data.goods['pop'].list
      oldList.push(...list)
      // var type = goods.${type}.list
      this.setData({
        "goods.pop.list":oldList
      })
    })
  },
  // 3.图片加载完成
  handleImageLoad() {}
})