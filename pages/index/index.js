const titleMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other',
}
var newsAll = new Map([['gn',], ['gj',], ['cj',], ['yl',], ['js',], ['ty',], ['other',]])
Page({

  data: {
    columnTitle: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    hotNewsText: "",
    picturePath: "",
    source: "",
    time: "",
    type: "",
    newsText: "",
    newsPicturePath: "",
    newsSource: "",
    newsTime: "",
    newsNow: "",
    news: {} 

  },
  onLoad() {
    this.getNews(titleMap['国内'])
    
  },

  onTapTitle(e) {
    let titleType = titleMap[e._relatedInfo.anchorTargetText]
    console.log(titleType)
    if (newsAll.get(titleType)) {
      this.getFromMap(titleType)
    }
    else {
      this.getNews(titleType)
      this.addMapResult(titleType)
      console.log(newsAll)
      console.log('in dev')
    }
  },





  getFromMap(titleType) {
    console.log(titleType)
    if (newsAll.get(titleType)) {
      let id = newsAll.get(titleType)[0].id
      let title = newsAll.get(titleType)[0].title
      let source = newsAll.get(titleType)[0].source
      let firstImage = newsAll.get(titleType)[0].firstImage
      let time = newsAll.get(titleType)[0].date
      this.setData({
        hotNewsText: title,
        picturePath: firstImage,
        source: source,
        time: time
      })

      //ordinary news
      let newsNow = []
      for (let i = 1; i < newsAll.get(titleType).length; i++) {
        newsNow.push({
          newsText: newsAll.get(titleType)[i].title,
          newsPicturePath: newsAll.get(titleType)[i].firstImage,
          newsSource: newsAll.get(titleType)[i].source,
          newsTime: newsAll.get(titleType)[i].date
        })
      }
      this.setData({
        newsNow: newsNow
      })

    }
  },

  addMapResult(type1) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type1
      },
      success: res => {
        newsAll.set(type1, res.data.result)
        this.setData({
          newsAll: newsAll
        })
      }
    })
  },


  getNews(type1) {
    this.getHotNews(type1)
    this.getOrdinaryNews(type1)
  },
  getHotNews(type1) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type1
      },
      success: res => {
        let result = res.data.result
        let id = result[0].id
        let title = result[0].title
        let source = result[0].source
        let firstImage = result[0].firstImage
        let time = result[0].date
        this.setData({
          hotNewsText: title,
          picturePath: firstImage,
          source: source,
          time: time
        })
      }
    })
  },

  getOrdinaryNews(type1) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type1
      },
      success: res => {
        let result = res.data.result
        let newsNow = []
        for (let i = 1; i < result.length; i++) {
          newsNow.push({
            newsText: result[i].title,
            newsPicturePath: result[i].firstImage,
            newsSource: result[i].source,
            newsTime: result[i].date
          })
        }
        this.setData({
          newsNow: newsNow
        })
        this.data.news[type1] = result
        console.log('news:', this.data.news)
      }
    })
  },


 // myFunction(a){
  //  var dateee = new Date(a).toJSON();
    //var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')  }


})

