import request from './network.js'
// 1.获取商品详情
export function getDetail(iid){
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}
// 商品推荐数据
export function getRecommends(){
  return request({
    url: '/recommend'
  })
}
// 2.商品信息对象
export class GoodsBaseInfo{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.realPrice = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}
// 3.商家信息对象
export class ShopInfo{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.sells = shopInfo.cSells
    this.goods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}
// 4.参数信息
export class ParamInfo{
  constructor(info, rule){
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables 
  }
}