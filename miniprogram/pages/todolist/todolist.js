// miniprogram/pages/todolist/todolist.js
Page({
  data: {
    newTaskContent: "",
    unfinishedList: [],
    finishedList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateTaskList();

    wx.login({ // 默认自带的
      success(res) {
        if (res.code) {
          console.log("res:", res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  taskInput: function (e) { // 绑定输入，不用管
    this.setData({
      newTaskContent: e.detail.value,
    })
  },

  addTaskTap: function (e) { // 添加任务的按钮
    if (this.data.newTaskContent == '') {
      wx.showToast({
        icon: 'none',
        title: '任务不能为空',
      })
      return;
    }

    var timestamp = Date.parse(new Date()) / 1000; //获取时间戳，除以1000是去掉毫秒

    wx.cloud.init();
    const db = wx.cloud.database()
    db.collection('taskDB').add({ // 添加到云数据库
      data: {
        taskContent: this.data.newTaskContent,
        finished: false,
        date: db.serverDate(),
        deleted: false,
        timestamp: timestamp
      },
    }).then(res => { //添加完事之后
      var newlist = [{
        deleted: false,
        finished: false,
        taskContent: this.data.newTaskContent,
        timestamp: timestamp
      }]; // 将新任务保存在这里
      this.setData({
        textAreaValue: '',
        unfinishedList: newlist.concat(this.data.unfinishedList)
      }); // 为了让新任务加到未完成任务的前面
      wx.showToast({
        title: '已同步'
      });
    });

    /*
    wx.cloud.init();
    const db = wx.cloud.database()

    db.collection('taskDB').add({
      data: {
        taskContent: this.data.newTaskContent,
        finished: false,
        date: db.serverDate(),
        deleted: false,
      },
    }).then(res => {
      console.log('add tap, res:' + res)
      this.updateTaskList()

      this.setData({
        textAreaValue: ''
      })
      wx.showToast({
        title: '添加任务：' + this.data.newTaskContent,
      })
    })*/
  },

  unfinishedCheckboxChange: function (e) {
    var tasklist = this.data.unfinishedList; // unfinished or finished
    var values = e.detail.value;

    // check out index of changed task
    var changed_index = -1;
    for (let i = 0, lenI = tasklist.length; i < lenI; i++) {
      if (tasklist[i].finished == false) {//
        for (let j = 0, lenJ = values.length; j < lenJ; j++) {
          if (tasklist[i].timestamp == values[j]) { // 本来是false，values中出现true
            changed_index = i;
            break;
          }
        }
      } else {
        var existInValues = false;
        for (let j = 0, lenJ = values.length; j < lenJ; j++) {
          if (tasklist[i].timestamp == values[j]) {
            existInValues = true;
            break;
          }
        }
        if (!existInValues) { // 本来是true，values中没出现
          changed_index = i;
        }
      }
    }

    //console.log(tasklist[changed_index]);

    // update cloud database
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('taskDB').where({
        timestamp: tasklist[changed_index].timestamp
      }).update({
        data: {
          finished: !tasklist[changed_index].finished
        }
      }).then(res => {
        console.log('(un)finished update, res:' + res);
        this.updateTaskList();
      });
  },

  finishedCheckboxChange: function (e) {
    var tasklist = this.data.finishedList; // 只需要改这里就行！ finished/unfinished
    var values = e.detail.value;

    // check out index of changed task
    var changed_index = -1;
    for (let i = 0, lenI = tasklist.length; i < lenI; i++) {
      if (tasklist[i].finished == false) {
        for (let j = 0, lenJ = values.length; j < lenJ; j++) {
          if (tasklist[i].timestamp == values[j]) { // 本来是false，values中出现true
            changed_index = i;
            break;
          }
        }
      } else {
        var existInValues = false;
        for (let j = 0, lenJ = values.length; j < lenJ; j++) {
          if (tasklist[i].timestamp == values[j]) {
            existInValues = true;
            break;
          }
        }
        if (!existInValues) { // values中没出现
          changed_index = i;
        }
      }
    }

    //console.log(tasklist[changed_index]);

    // update cloud database
    wx.cloud.init();
    const db = wx.cloud.database();
    db.collection('taskDB').where({
        timestamp: tasklist[changed_index].timestamp
      }).update({
        data: {
          finished: !tasklist[changed_index].finished
        }
      }).then(res => {
        console.log('(un)finished update, res:' + res);
        this.updateTaskList();
      });
  },

  taskLongPress: function (e) {
    const tasklist = this.data.unfinishedList.concat(this.data.finishedList)
    var taskDelete = null;
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].timestamp == e.currentTarget.id) {
        taskDelete = tasklist[i];
        break;
      }
    }

    console.log("task delete:", taskDelete)
    console.log("task content:", taskDelete.taskContent)

    var that = this;
    wx.showModal({
      title: "删除任务",
      content: taskDelete.taskContent,
      success(res) {
        if (res.confirm) {
          /*wx.showToast({
            title: 'confirm',
          })*/

          // update cloud database
          wx.cloud.init();
          const db = wx.cloud.database()

          db.collection('taskDB').where({
              timestamp: taskDelete.timestamp
            })
            .update({
              data: {
                deleted: true
              }
            }).then(res => {
              that.updateTaskList();
              wx.showToast({
                title: '删除成功！',
              })
            })

          
        } else if (res.cancel) {
          /*wx.showToast({
            title: 'cancel',
          })*/
        }
      }
    })
  },


  updateTaskList: async function () {
    wx.cloud.init();
    const db = wx.cloud.database();

    var count = await wx.cloud.database().collection('taskDB').where({
      deleted: false,
    }).count();
    //console.log('count: ' + count);
    var total = count.total;
    console.log('total: ' + total);

    var allTaskList = [];
    for (var i = 0; i < total; i += 20) {
      var list = await wx.cloud.database().collection('taskDB').where({
          deleted: false,
        }).skip(i)
        .limit(20)
        .get();
      allTaskList = allTaskList.concat(list.data);
    }
    console.log('allTaskList: ' + allTaskList);

    var finishedList2 = [];
    var unfinishedList2 = [];
    for (let i = 0, len = allTaskList.length; i < len; i++) {
      if (allTaskList[i].finished) {
        finishedList2 = finishedList2.concat(allTaskList[i]);
      } else {
        unfinishedList2 = unfinishedList2.concat(allTaskList[i]);
      }
    }
    this.setData({
      finishedList: finishedList2.reverse(),
      unfinishedList: unfinishedList2.reverse()
    });
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

})