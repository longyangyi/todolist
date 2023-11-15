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

        wx.cloud.init();
        const db = wx.cloud.database()
        db.collection('jinianriDB').add({ // 添加到云数据库
            data: {
                eventText: this.data.eventText,
                eventDate: this.data.eventDate,
                eventNote: this.data.eventNote,
                deleted: false,
                timestamp: timestamp
            },
        }).then(res => { //添加完事之后
            this.setData({
                eventText: '',
                eventNote: ''
            });
            this.updateEventList();
            wx.showToast({
                title: '已添加'
            });
        });
    },

    taskLongPress: function (e) {
        var eventList = this.data.eventList;
        var eventDelete;
        for (let i = 0; i < eventList.length; i++) {
            if (eventList[i].timestamp == e.currentTarget.id) {
                eventDelete = eventList[i];
                break;
            }
        }
        var that = this;
        wx.showModal({
            title: "删除事件",
            content: eventDelete.eventText + "\n\n" + eventDelete.eventDate,
            success(res) {
                if (res.confirm) {
                    wx.cloud.init();
                    const db = wx.cloud.database()
                    db.collection('jinianriDB').where({
                            timestamp: eventDelete.timestamp
                        })
                        .update({
                            data: {
                                deleted: true
                            }
                        }).then(res => {
                            that.updateEventList();
                            wx.showToast({
                                title: '删除成功！',
                            })
                        })
                } else if (res.cancel) {

                }
            }
        })
    },

    updateEventList: async function () {
        wx.cloud.init();
        const db = wx.cloud.database();
        var count = await wx.cloud.database().collection('jinianriDB').where({
            deleted: false,
        }).count();
        //console.log('count: ' + count);
        var total = count.total;
        console.log('total: ' + total);

        var allEventList = [];
        for (var i = 0; i < total; i += 20) {
            var list = await wx.cloud.database().collection('jinianriDB').where({
                    deleted: false,
                }).skip(i)
                .limit(20)
                .get();
            allEventList = allEventList.concat(list.data);
        }
        console.log('allEventList: ' + allEventList);

        allEventList.sort(function (a, b) {
            if (a.eventDate > b.eventDate) {
                return 1
            } else { // 0 -1
                return -1
            }
        })

        for (let i = 0; i < allEventList.length; i++) {
            allEventList[i].timeGap = this.getDayGapText(allEventList[i].eventDate);
        }
        this.setData({
            eventList: allEventList.reverse()
        });
    },

    getDayGapText: function (eventDate) {
        var eventDateTimestamp = Date.parse(new Date(eventDate + " 00:00:00")) / 1000; //纪念日期
        var now = Date.parse(new Date()) / 1000; //今天

        var printText = "";
        var dayGap;
        console.log("now: " + now);
        console.log("eventDateTimestamp: " + eventDateTimestamp);
        if (now > eventDateTimestamp) { //已经过期了
            dayGap = parseInt((now - eventDateTimestamp) / (60 * 60 * 24));
            printText += "过去" + dayGap + "天";
        } else {
            dayGap = parseInt((eventDateTimestamp - now) / (60 * 60 * 24));
            printText += "还有" + dayGap + "天";
        }
        if (dayGap == 0) {
            printText = "今天！";
        }
        return printText;
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.updateEventList();
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