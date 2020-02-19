// pages/cart/cart.js
const app = getApp()
Page({
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  }, 
  onLoad: function(options) {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.设置回调
    // app.addCartCallback = () => {
    //   this.setData({
    //     cartList: app.globalData.cartList
    //   })
    //   this.changeData()
    // }

    // 3.cart-list-item里面check-icon发生改变
    app.changeGoodsState = (index,goods) => {
      // 1.修改某一项
      this.setData({
        [`cartList[${index}]`]: goods
      })
      // 2.修改bottom-bar里面的值
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })

      this.changeData()
    }
  },
  // 点击全选
  onSelectAll(){
    if(this.data.isSelectAll){//true全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else{//某些没有选中
      this.data.cartList.forEach(item => item.checked = true)
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
  },
  // 首次进入页面
  onShow: function() {
    // 1.设置标题
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  },
  // 2.统计totalPrice和totalCount
  changeData() {
    let counter = 0
    let totalPrice = 0
    for(let item of this.data.cartList){
      if(item.checked){
        counter++
        totalPrice += item.price * item.count
      }
    }
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})