import { getMultiData, getGoodsData } from '../../service/home.js'

const types = ['pop','new','sell']
const TOP_DISTANCE = 1000

Page({
  data: {
    banners: [],
    recommends: [],
    titleList: ['流行', '新款', '精选'],
    goods: {
      pop: { page: 0, list: [] },
      new: { page: 0, list: [] },
      sell: { page: 0, list: [] }
    },
    currentType: 'pop',
    showBackTop: false,
    isNavTabFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    this._getMultiData(),
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  // 1.获取轮播图数据
  _getMultiData(){
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

    const navbar1 = this.selectComponent('.navbar1')
    const navbar2 = this.selectComponent('.navbar2')
    navbar2.setData({
      currentIndex: index
    })

    const type = types[index]
    this.setData({
      currentType: type
    })
  },
  // 3.获取商品列表
  _getGoodsData(type){
    const page = this.data.goods[type].page + 1
    getGoodsData(type,page).then(res => {
      // 1.取出数据
      const list = res.data.data.list
      // 2.将数据设置到对应type的list中
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      // 3.将数据设置到data中的goods中(模拟器中假数据)
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  // 4.上拉加载更多
  onReachBottom(){
    this._getGoodsData(this.data.currentType)
  },
  // 5.监听页面滚动
  onPageScroll(options){
    const scrollTop = options.scrollTop
    const flag = scrollTop > TOP_DISTANCE
    if(flag != this.data.showBackTop){
      this.setData({
        showBackTop: flag
      })
    }
    // navBar
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2 != this.data.isNavTabFixed){
      this.setData({
        isNavTabFixed: flag2
      })
    }
  },
  // 6.吸顶效果
  handleImageLoad(){
    // recommend得到组件滚动高度
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
      // console.log(this.data.tabScrollTop)
    }).exec()
  }
})