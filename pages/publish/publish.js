Page({
  data: {
    address: '点击选择，要勾选哦~',
    isShow: true
  },
  staticData: {},
  onShow() {
    this.setData({
      isShow: true
    })
  },
  //转发
  onShareAppMessage(res) {
    return {
      title: '发布信息',
      path: '/pages/publish/publish'
    }
  },
  //获取地址
  handleGetAddress() {
    wx.chooseLocation({
      success: this.handleChooseAddressSuccess.bind(this)
    })
  },
  //成功获取地址
  handleChooseAddressSuccess(res) {
    this.setData({
      address: res.address
    });
    Object.assign(this.staticData, {
      longitude: res.longitude,
      latitude: res.latitude
    });
  },
  //获取交易类型
  handleTrade(e) {
    this.staticData.type = e.detail.value;
  },
  //获取说明信息及非空验证
  handleExplain(e) {
    if (e.detail.value === '') {
      this.handleVerify('请填写您的具体需求');
    } else {
      this.staticData.explain = e.detail.value;
    }
  },
  //获取联系方式及手机号码格式验证
  handlePhone(e) {
    let phone = e.detail.value;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.handleVerify('手机号码格式不正确');
    } else if ((/^1[34578]\d{9}$/.test(phone))) {
      this.staticData.phone = phone;
    }
  },
  //提交信息
  handleSubmit() {
    //提交验证
    if (this.data.address === '点击选择，要勾选哦~') {
      this.handleVerify('请选择地址');
      return;
    }
    if (!this.staticData.type) {
      this.handleVerify('请选择类型');
      return;
    }
    if (!this.staticData.explain) {
      this.handleVerify('请填写您的具体需求');
      return;
    }
    if (!this.staticData.phone) {
      this.handleVerify('请填写您的联系方式');
      return;
    }
    //发送请求保存发布信息
    wx.request({
      url: 'http://localhost:9999/saveinformation',
      data: {
        longitude: this.staticData.longitude,
        latitude: this.staticData.latitude,
        type: this.staticData.type,
        explain: this.staticData.explain,
        phone: this.staticData.phone
      },
      header: {
        'content-type': 'application/json'
      },
      success: this.handleSaveInformationSuccess.bind(this)
    });
  },
  //成功存入信息
  handleSaveInformationSuccess(res) {
    if(res.data === 'yes') {
      this.setData({
        isShow: false
      });
    }else if(res.data === 'no'){
      this.handleVerify('很遗憾，发布信息失败');
    }
  },
  //验证提示
  handleVerify(txt) {
    wx.showToast({
      title: txt,
      icon: 'none',
      duration: 2000
    });
  }
});