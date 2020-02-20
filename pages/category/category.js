// pages/category/category.js
import { getCategory, getSubcategory, getCategoryDetail} from "../../service/category.js"
Page({
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },
  onLoad: function (options) {
    this._getCategory()
  },
  // 获取分类列表
  _getCategory() {
    getCategory().then(res => {
      // 1.获取侧边数据
      const categories = res.data.data.category.list
      // 2.初始化每个类别的子数据
      const categoryData = {}
      for(let i=0;i<categories.length;i++){
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories: categories,
        categoryData: categoryData
      })
      // 4.请求第一个类别的数据
      this._getSubcategory(0)
      // 5.请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex){
    // 1.获取maitKey
    const maitKey = this.data.categories[currentIndex].maitKey
    // 2.请求的数据
    getSubcategory(maitKey).then(res => {
      // console.log(res)
      const tempCategoryData = this.data.categoryData
      tempCategoryData[currentIndex].subcategories = res.data.data.list
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex){
    // 1.获取对应的miniWallkey
    const miniWallkey = this.data.categories[currentIndex].miniWallkey
    // 2.请求数据列表的数据
    this._getRealCategoryDetail(currentIndex,miniWallkey,'pop')
  },
  // 3.
  _getRealCategoryDetail(index, miniWallkey, type){
    getCategoryDetail(miniWallkey, type).then(res => {
      // console.log(res)
      // 1.获取categoryData
      const categoryData = this.data.categoryData
      // 2.修改数据
      categoryData[index].categoryDetail = res.data
      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  // 4.点击切换侧边栏
  menuClick(e){
    // 4.1修改index
    const currentIndex = e.detail.currentIndex
    this.setData({
      currentIndex
    })
    // 4.2请求详细数据
    this._getSubcategory(currentIndex)
    // 4.3
    this._getCategoryDetail(currentIndex)
  }
})