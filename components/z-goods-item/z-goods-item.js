// components/z-goods-item/z-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsItem: {
      type: Object,
      value: {}
    }
  },
  methods: {
    itemClick(){
      // 1.获取iid
      const iid = this.data.goodsItem.iid
      // 2.跳转到detail页面
      wx.navigateTo({
        url: '/pages/detail/detail?iid='+iid,
      })
    }
  }
})
