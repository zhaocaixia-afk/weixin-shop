//app.js
const TOKEN = 'token'
App({
  onLaunch: function () {
    // const token = wx.getStorageSync(TOKEN)
    // if(token && token.length !== 0){
    //   this.check_token(token)
    // }else{
    //   this.login()
    // }
  },
  globalData: {
    cartList: [],
    token: ''
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
    // 购物车回调
    // if(this.addCartCallback){
    //   this.addCartCallback()
    // }
  },
  // 2.登录
  login() {
    wx.login({
      success: res => {
        const code = res.code
        console.log(code)
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success: res => {
            const token = res.data.token
            this.globalData.token = token
            wx.setStorageSync(TOKEN, token)
          }
        })
      }
    })
  },
  // 3.验证token
  check_token(token){
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: res => {
        if(!res.data.errCode){
          this.globalData.token = token
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})