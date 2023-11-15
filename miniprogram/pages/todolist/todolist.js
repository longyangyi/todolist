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
    this.readTaskListFromStorage();
    /*wx.getClipboardData({
      success: function(res) {
        console.log(res.data);
      }
    });
    var s = JSON.stringify(this.data.unfinishedList);
    console.log(s);
    wx.setClipboardData({
      data: s,
    });
    wx.getClipboardData({
      success: function(res) {
        console.log(res.data);
      }
    });*/
  },

  taskInput: function (e) { // 绑定输入，不用管
    this.setData({
      newTaskContent: e.detail.value,
    });
  },

  addTaskTap: function (e) { // 添加任务的按钮
    if (this.data.newTaskContent == '') {
      wx.showToast({
        icon: 'none',
        title: '任务不能为空',
      })
      return;
    }

    //获取时间戳，除以1000是去掉毫秒
    var timestamp = Date.parse(new Date()) / 1000;

    // 将新任务保存在这里
    var newlist = [{
      deleted: false,
      finished: false,
      taskContent: this.data.newTaskContent,
      timestamp: timestamp
    }];

    // 将新任务添加到“未完成”
    this.setData({
      textAreaValue: '', //清空任务文本框
      newTaskContent: '',
      unfinishedList: newlist.concat(this.data.unfinishedList)
    });

    // 保存当前列表
    this.saveTaskListToStorage();
  },

  unfinishedCheckboxChange: function (e) {
    var tasklist = this.data.unfinishedList; // unfinished or finished
    var values = e.detail.value;

    // 找到点击的元素的坐标
    var changed_index = -1;
    for (let i = 0, lenI = tasklist.length; i < lenI; i++) {
      if (tasklist[i].finished == false) { //
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

    // 将changed_index的元素修改为“finished = true”
    tasklist[changed_index].finished = true;
    try {
      wx.setStorageSync('AllTaskList', tasklist.concat(this.data.finishedList));
    } catch (e) {} finally {}
    this.readTaskListFromStorage();
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

    // 将changed_index的元素修改为“finished = false”
    tasklist[changed_index].finished = false;
    try {
      wx.setStorageSync('AllTaskList', tasklist.concat(this.data.unfinishedList));
    } catch (e) {} finally {}
    this.readTaskListFromStorage();
  },

  // 长按删除
  taskLongPress: function (e) {
    var deletedTask = '';
    // 根据被长按的任务的timestamp找到数组坐标
    var allList = this.data.unfinishedList.concat(this.data.finishedList);
    for (let i = 0; i < allList.length; i++) {
      if (allList[i].timestamp == e.currentTarget.id) {
        allList[i].deleted = true;
        deletedTask = allList[i];
        break;
      }
    }
    var that = this;
    wx.showModal({
      title: "删除任务",
      content: deletedTask.taskContent,
      success(res) {
        if (res.confirm) {
          try {
            wx.setStorageSync('AllTaskList', allList);
          } catch (e) {} finally {}
          wx.showToast({
            title: '删除成功！',
          });
          that.readTaskListFromStorage();
        }
      }
    });
  },

  saveTaskListToStorage: async function () {
    console.log("saving...")
    console.log(this.data.unfinishedList);
    console.log(this.data.finishedList);
    try {
      // wx.setStorageSync('unfinishedList', this.data.unfinishedList);
      // wx.setStorageSync('finishedList', this.data.finishedList);
      wx.setStorageSync('AllTaskList', this.data.unfinishedList.concat(this.data.finishedList));
    } catch (e) {} finally {}
  },

  readTaskListFromStorage: async function () {
    console.log("reading...");
    try {
      var allTaskList = wx.getStorageSync('AllTaskList');
      allTaskList.sort(function (a, b) {
        if (a.timestamp > b.timestamp) {
          return -1
        } else { // 0 -1
          return 1
        }
      });

      var readedUnfinishedList = [];
      var readedFinishedList = [];
      allTaskList.forEach(task => {
        if(task.deleted == false) {
          if(task.finished) {
            readedFinishedList.push(task);
          }else {
            readedUnfinishedList.push(task);
          }
        }
      });
      this.setData({
        unfinishedList: readedUnfinishedList,
        finishedList: readedFinishedList
      });
    } catch (e) {} finally {}
  },







  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {
    /*var showContent = await wx.cloud.database().collection('showDB').get();
    console.log('show content:')
    console.log(showContent);
    if (showContent.data[0].show == true) {
      wx.showModal({
        title: showContent.data[0].title,
        content: showContent.data[0].content,
        showCancel: false
      })
      // wx.showToast({
      //   title: showContent.data[0].content + "",
      //   duration: 10000
      // });
    }*/

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