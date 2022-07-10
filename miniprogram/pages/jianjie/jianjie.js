// pages/jianjie/jianjie.js

var AMAPSDK = require("../../file/amap-wx.130.js")
var amapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateText: "",
        location: "",
        province: "",
        city: "",
        weather: "天气",
        temperature: "",
        humidity: "",
        windpower: "",
        dailyNote: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        amapsdk = new AMAPSDK.AMapWX({
            key: '29656be549d42a470714ab45a2fe74af'
        })
        var that = this;

        var date = new Date(new Date().getTime());
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var week = date.getDay()
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
        this.setData({
            dateText: year + "年" + month + "月" + day + "日&nbsp;" + weekday[week]
        })

        amapsdk.getWeather({
            success: function (res) {
                that.setData({
                    province: res.liveData.province,
                    city: res.liveData.city,
                    weather: res.liveData.weather,
                    temperature: "气温" + res.liveData.temperature + "℃",
                    humidity: "湿度" + res.liveData.humidity + "%",
                    windpower: "风力" + res.liveData.windpower + "级"
                })
            },
            fail: function (res) {
                console.log(res)
                that.setData({
                    weather: "未提供天气位置权限"
                })
            }
        })


        // https://open.iciba.com/dsapi/
        wx.request({
          url: 'https://open.iciba.com/dsapi/',
          success: function(res) {
              console.log(res)
              that.setData({
                  dailyNote: res.data.note
              })
          }
        })
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