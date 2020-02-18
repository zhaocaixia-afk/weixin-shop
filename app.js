//app.js
App({
  onLaunch: function () {},
  globalData: {
    cartList: []
  },
  // 1.加入购物车操作
  addToCart(obj){
    const oldInfo = this.globalData.cartList.find( item => item.iid === obj.iid )
    if(oldInfo){
      oldInfo.count += 1
    }else{
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }
  }
})