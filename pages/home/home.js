import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const typeList = ['pop','new','sell']
import { BACT_TOP_POSITION } from '../../common/const.js'

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
    },
    currentType: 'pop',
    showBackTop: false,
    showTabControl: 0,
    isNavTabFixed: false
  },
  onLoad: function(options) {
    // 1.进入首页获取到的数据
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
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
  // 2.获取商品数据
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list

      var oldList = this.data.goods[type].list
      oldList.push(...list)
      var typekey = `goods.${type}.list`
      var pagekey = `goods.${type}.page`
      this.setData({
        [typekey]:oldList,
        [pagekey]: page
      })
    })
  },
  // 3.navbar组件点击上传的事件
  handleNavbarClick(e) {
    const index = e.detail.index
    this.setData({
      currentType: typeList[index]
    })
    this.selectComponent('.navbar1').setCurrentIndex(index)
    this.selectComponent('.navbar2').setCurrentIndex(index)
  },
  // 4.上拉加载更多
  onReachBottom(){
    this._getGoodsData(this.data.currentType)
  },
  // 5.滚动
  onPageScroll(res) {
    // 5.1监听向上按钮的显示
    const flag = res.scrollTop > BACT_TOP_POSITION
    if(flag != this.data.showBackTop){
      this.setData({
        showBackTop: flag
      })
    }
    // 5.2监听导航栏
    const flag2 = res.scrollTop >= this.data.showTabControl
    if (flag2 != this.data.isNavTabFixed){
      this.setData({
        isNavTabFixed: flag2
      })
    }
  },
  // 3.图片加载完成
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect((rect) => {
      this.setData({
        showTabControl: rect.top
      })
    }).exec()
  }
})