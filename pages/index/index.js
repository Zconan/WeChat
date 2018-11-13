const app = getApp();

Page({
  data: {
    longitude: '',
    latitude: '',
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: (app.globalData.windowWidth - 40) / 2,
        top: (app.globalData.windowHeight - 80 - 40) / 2,
        width: 40,
        height: 40
      }
    }, {
      id: 2,
      iconPath: '/resources/locator.png',
      position: {
        left: 10,
        top: 480,
        width: 40,
        height: 40
      },
      clickable: true
    }],
    markers: []
  },
  //转发
  onShareAppMessage() {
    return {
      title: '萌宠交易平台',
      path: 'pages/index/index'
    }
  },
  //获取位置
  onShow() {
    this.getLocation();
    this.handleGetPublishInformation();
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocation.bind(this)
    });
  },
  //成功获取位置
  handleGetLocation(res) {
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    });
  },
  //自动定位
  onReady() {
    this.mapCtx = wx.createMapContext('map');
  },
  handleAutoLocation() {
    this.mapCtx.moveToLocation();
  },
  //获取发布信息
  handleGetPublishInformation() {
    wx.request({
      url: 'http://localhost:9999/getinformation',
      header: {
        'content-type': 'application/json'
      },
      success: this.handleGetPublishInformationSuccess.bind(this)
    });
  },
  //成功获取发布信息
  handleGetPublishInformationSuccess(res) {
    let result = res.data;
    let markers = result.map((item, index) => {
      return {
        iconPath: '/resources/' + item.type + '.png',
        id: item._id,
        latitude: item.latitude,
        longitude: item.longitude,
        width: 40,
        height: 40
      }
    });
    this.setData({
      markers
    });
  }
});