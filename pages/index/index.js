const titleMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other',
}


Page({
  data: {
    columnTitle: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    news: {},
    idx:0,
    titleType: "",
    result:[],
  },

  onLoad() {
    let titleType = titleMap['国内']
    this.getNews(titleMap['国内'],'')
  },

  onPullDownRefresh(){
    this.getNews(this.data.titleType, () => { wx.stopPullDownRefresh() })
   },

  onTapTitle(e) {
    let titleType = titleMap[e._relatedInfo.anchorTargetText]
    let index = e.currentTarget.dataset.index
    if (this.data.news[titleType]) {
        this.getFromNews(titleType)
       }
    else {
        this.getNews(titleType)
        }
    this.setData({
      idx: index,
      titleType:titleType,
    }) 
  },

  onTapDetails(e){
   wx.navigateTo({
    url: '/pages/newsDetails/newsDetails?id='+e.currentTarget.id
   })
  },
 
  getFromNews(titleType) {
    let title = this.data.news[titleType][0].title
    let source = this.data.news[titleType][0].source
    let firstImage = this.data.news[titleType][0].firstImage
    let date = new Date(this.data.news[titleType][0].date).toJSON()
      this.setData({
        hotNewsText: title,
        picturePath: firstImage,
        source: source,
        time: new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      })

      let newsNow = []
    for (let i = 1; i < this.data.news[titleType].length; i++) {
        
        newsNow.push({
          id: this.data.news[titleType][i].id,
          newsText: this.data.news[titleType][i].title,
          newsPicturePath: this.data.news[titleType][i].firstImage,
          newsSource: this.data.news[titleType][i].source,
          newsTime: new Date(+ new Date(new Date(this.data.news[titleType][i].date).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        })
      }
      this.setData({
        newsNow: newsNow,
        id:id
      })
  },

 
  getNews(type,callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type
      },
      success: res => {
        let result = res.data.result
        let hotNewsText = result[0].title
        let source = result[0].source
        let picturePath = result[0].firstImage
        let date = new Date(result[0].date).toJSON()
        let newsNow = []
        for (let i = 1; i < result.length; i++) {
            newsNow.push({
            newsText: result[i].title,
            newsPicturePath: result[i].firstImage,
            newsSource: result[i].source,
            newsTime: new Date(+ new Date(new Date(result[i].date).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          })
        }
        this.setData({
          result:result,
          hotNewsText: hotNewsText,
          picturePath: picturePath,
          source: source,
          time: new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''),
          newsNow: newsNow
        })
       this.data.news[type] = result
      },
      complete: () => {
        callback && callback()
      }
    })
  },
})

