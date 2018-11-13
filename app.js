App({
  globalData: {},
  onLaunch() {
    try {
      const res = wx.getSystemInfoSync();
      this.globalData.windowWidth = res.windowWidth;
      this.globalData.windowHeight = res.windowHeight;
    } catch (e) {
      console.log('fail');
    }
  }
});