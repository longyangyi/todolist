// miniprogram/pages/piano/pianoGame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  pianoButton1Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano1.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  pianoButton2Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano2.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  pianoButton3Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano3.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  pianoButton4Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano4.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  pianoButton5Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano5.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  pianoButton6Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano6.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  pianoButton7Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano7.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  pianoButton8Tap: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/piano1to8/piano8.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },

})