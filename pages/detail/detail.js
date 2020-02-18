import { getDetail, getRecommends, GoodsBaseInfo, ShopInfo, ParamInfo } from '../../service/detail.js'

const app = getApp()

Page({
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramsInfo: {},
    commentInfo: {},
    recommends: []
  },
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    this._getDetailData()
    this._getRecommends()
  },
  // 1.获取详情页数据
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result
      // 1.1轮播图数据
      const topImages = data.itemInfo.topImages
      // 1.2商品详情
      var baseInfo = new GoodsBaseInfo(data.itemInfo,data.columns,data.shopInfo.services)
      // 1.3商家信息
      var shopInfo = new ShopInfo(data.shopInfo)
      // 1.4细节信息
      var detailInfo = data.detailInfo
      // 1.5参数信息
      var paramsInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule)
      // 1.6获取评论
      let commentInfo = {}
      if(data.rate && data.rate.cRate > 0){
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages: topImages,
        baseInfo: baseInfo,
        shopInfo: shopInfo,
        detailInfo: detailInfo,
        paramsInfo: paramsInfo,
        commentInfo: commentInfo
      })
    })
  },
  // 2.商品推荐数据
  _getRecommends(){
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.data.list
      })
    })
  },
  // 3.加入购物车
  onAddCart(){
    // 3.1获取商品对象
    const obj = {}
    obj.iid = this.data.iid
    obj.imageURL = this.data.topImages[0]
    obj.title = this.data.baseInfo.title
    obj.desc = this.data.baseInfo.desc
    obj.price = this.data.baseInfo.realPrice
    // console.log(obj)
    app.addToCart(obj)
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})