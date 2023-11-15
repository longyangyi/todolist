// pages/jinianri/jinianri.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventText: "",
    eventDate: '2022-01-01',
    eventNote: "",
    eventList: []
  },

  bindEventInput: function (e) {
    this.setData({
      eventText: e.detail.value
    })
  },

  bindNoteInput: function (e) {
    this.setData({
      eventNote: e.detail.value
    })
  },

  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      eventDate: e.detail.value
    })
  },

  addEventTap: function (e) {
    if (this.data.eventText == '') {
      wx.showToast({
        icon: 'none',
        title: '事件不能为空',
      })
      return;
    }
    var timestamp = Date.parse(new Date()) / 1000; //获取时间戳

    var newList = [{
      eventText: this.data.eventText,
      eventDate: this.data.eventDate,
      eventNote: this.data.eventNote,
      deleted: false,
      timestamp: timestamp,
      timeGap: this.getDayGapText(this.data.eventDate)
    }].concat(this.data.eventList);

    this.setData({
      eventList: newList
    });
    this.saveEventListToStorage();
    this.readEventListFromStorage();

    this.setData({
      eventText: '',
      eventNote: ''
    });
    wx.showToast({
      title: '已添加'
    });

  },

  taskLongPress: function (e) {
    var newList = this.data.eventList;
    var eventDelete;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].timestamp == e.currentTarget.id) {
        eventDelete = newList[i];
        newList[i].deleted = true;
        break;
      }
    }
    var that = this;
    wx.showModal({
      title: "删除事件",
      content: eventDelete.eventText + "\n\n" + eventDelete.eventDate,
      success(res) {
        if (res.confirm) {
          that.setData({
            eventList: newList
          });
          that.saveEventListToStorage();
          that.readEventListFromStorage();
          wx.showToast({
            title: '删除成功！',
          })
        }
      }
    })
  },


  saveEventListToStorage: async function () {
    console.log("saving...")
    console.log(this.data.eventList);
    try {
      wx.setStorageSync('AllEventList', this.data.eventList);
    } catch (e) {} finally {}
  },


  readEventListFromStorage: async function () {
    console.log("reading...");
    try {
      var allEventList = wx.getStorageSync('AllEventList');
      console.log(allEventList);
      var readedList = [];
      allEventList.forEach(task => {
        if (task.deleted == false) {
          readedList.push(task);
        }
      });

      readedList.sort(function (a, b) {
        if (a.eventDate > b.eventDate) {
          return 1;
        } else { // 0 -1
          return -1;
        }
      });

      for (let i = 0; i < readedList.length; i++) {
        readedList[i].timeGap = this.getDayGapText(readedList[i].eventDate);
      }
      this.setData({
        eventList: readedList.reverse()
      });
    } catch (e) {} finally {}
  },


  getDayGapText: function (eventDate) {
    var eventDateTimestamp = Date.parse(new Date(eventDate + " 00:00:00")) / 1000; //纪念日期
    var now = Date.parse(new Date()) / 1000; //今天

    var printText = "";
    var dayGap;
    // console.log("now: " + now);
    // console.log("eventDateTimestamp: " + eventDateTimestamp);
    if (now > eventDateTimestamp) { //已经过期了
      dayGap = parseInt((now - eventDateTimestamp) / (60 * 60 * 24));
      printText += "过去" + dayGap + "天";
    } else {
      dayGap = parseInt((eventDateTimestamp - now) / (60 * 60 * 24)) + 1;
      printText += "还有" + dayGap + "天";
    }
    if (now > eventDateTimestamp && dayGap == 0) {
      printText = "今天！";
    }
    return printText;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date(new Date().getTime());
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    if (month < 10) {
      month = "0" + month
    }
    var day = date.getDate()
    if (day < 10) {
      day = "0" + day
    }
    this.setData({
      eventDate: year + "-" + month + "-" + day
    });

    this.readEventListFromStorage();
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

  }
})