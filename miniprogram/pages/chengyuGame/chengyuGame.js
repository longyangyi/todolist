// miniprogram/pages/chengyuGame/chengyuGame.js
var commonWords = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞";
var wordNum = 500;
var chengyuString = "万象更新抱头鼠窜鸡鸣狗盗千军万马亡羊补牢杯弓蛇影鹤立鸡群对牛弹琴如鱼得水鸟语花香为虎作伥黔驴技穷画龙点睛鼠目寸光虎背熊腰守株待兔鹤发童颜狗急跳墙盲人摸象画蛇添足鹤立鸡群鸡鸣狗盗鹬蚌相争蚕食鲸吞蛛丝马迹龙争虎斗龙马精神龙飞凤舞龙腾虎跃龙骧虎步龙潭虎穴龙跃凤鸣车水马龙指鹿为马兔死狐悲鸡犬不宁心猿意马狼吞虎咽眼高手低目瞪口呆胸无点墨头重脚轻手足情深口是心非手疾眼快耳闻目睹头破血流眉清目秀袖手傍观口出不逊飞蛾扑火金蝉脱壳积蚊成雷蟾宫折桂蚕食鲸吞蜻蜓点水螳臂挡车蛛丝马迹螳螂捕蝉黄雀在后前呼后拥东倒西歪眼高手低口是心非头重脚轻有头无尾前倨后恭东逃西散南辕北辙左顾右盼积少成多同甘共苦半信半疑大材小用先人后己有口无心天经地义弄假成真举足轻重南腔北调声东击西转危为安东倒西歪反败为胜以少胜多由此及彼千钧一发刻不容缓迫不及待十万火急火烧眉毛燃眉之急心旷神怡心平气和目不转睛呆若木鸡眉开眼笑愁眉苦脸愁眉紧锁目瞪口呆垂头丧气嬉皮笑脸一身正气临危不惧光明磊落堂堂正正大智大勇力挽狂澜急中生智仰不愧天镇定自若化险为夷春光明媚万紫千红春雨如油生机勃勃春色满园春意盎然鸟语花香春暖花开百花齐放和风细雨见多识广望而生畏察言观色一视同仁一览无余高瞻远瞩坐井观天举世瞩目管中窥豹左顾右盼生龙活虎龙争虎斗龙马精神龙飞凤舞龙腾虎跃龙骧虎步画龙点睛龙潭虎穴龙跃凤鸣车水马龙鹬蚌相争刻舟求剑鹏程万里守株待兔掩耳盗铃亡羊补牢惊弓之鸟杯弓蛇影抱薪救火安步当车暗渡陈仓按图索骥程门立雪班门弄斧兵不厌诈三顾茅庐微乎其微神乎其神天外有天痛定思痛数不胜数举不胜举人外有人防不胜防忍无可忍闻所未闻欢呼雀跃鸦雀无声鹏程万里一箭双雕风声鹤唳鹤发鸡皮鹤发童颜鹤立鸡群麻雀虽小五脏俱全螳螂捕蝉黄雀在后不耻下问问道于盲盲人瞎马马到成功功败垂成成人之美美不胜收收回成命命中注定定时炸弹弹尽粮绝绝无仅有有机可乘乘虚而入入木三分分秒必争争权夺利利欲熏心心安理得得意洋洋一唱一和一呼百应一干二净一举两得一落千丈一模一样一暴十寒一日千里一五一十一心一意两面三刀三长两短三番五次三三两两三头六臂三心二意三言两语四分五裂四面八方四通八达四平八稳五光十色五湖四海五花八门五颜六色六神无主七颠八倒七零八落七拼八凑七上八下七手八脚七嘴八舌八面玲珑九死一生九牛一毛十拿九稳十全十美百发百中百孔千疮百战百胜百依百顺千变万化千差万别千军万马千山万水千丝万缕千辛万苦千言万语千真万确千锤百炼千方百计千奇百怪千姿百态千钧一发千虑一得千虑一失千篇一律万水千山万无一失万众一心万紫千红万死一生推心置腹肝胆相照情同手足志同道合风雨同舟荣辱与共同甘共苦关怀备至心心相印海誓山盟拔刀相助亲密无间万紫千红春暖花开鸟语花香姹紫嫣红花红柳绿百花争艳锦上添花火树银花昨日黄花春花秋月过时黄花花团锦簇花枝招展崇山峻岭山明水秀山穷水尽大好山河刀山火海地动山摇高山深涧悬崖峭壁峰峦雄伟漫山遍野江山如画锦绣山河五彩缤纷五颜六色一碧千里万紫千红花红柳绿翠色欲流姹紫嫣红五光十色青红皂白绿水青山不可多得凤毛麟角九牛一毛绝无仅有空前绝后寥寥无几寥若晨星宁缺毋滥前所未有屈指可数三三两两铁树开花微乎其微一麟半爪一丝一毫百里挑一沧海一粟千古绝唱摩肩接踵车水马龙川流不息纷至沓来花花世界举袖为云挥汗如雨络绎不绝门庭若市万人空巷水泄不通人声鼎沸人欢马叫人山人海震耳欲聋座无虚席包罗万象琳琅满目美不胜收目不暇接无奇不有无穷无尽无所不包五花八门眼花缭乱洋洋大观一应俱全应有尽有应接不暇比比皆是不可计数层出不穷绰绰有余多多益善多如牛毛俯拾皆市举不胜举漫山遍野星罗棋布丰富多彩九霄云外腾云驾雾壮志凌云风云变幻风起云涌行云流水风卷残云浮云蔽日孤云野鹤烘云托月过眼云烟烟消云散大雨倾盆血雨腥风风雨交加风调雨顺枪林弹雨风雨同舟风雨无阻和风细雨狂风暴雨满城风雨滂沱大雨春风化雨风雨飘摇斜风细雨未雨绸缪水流湍急水平如镜高山流水千山万水水滴石穿水乳交融滴水不漏杯水车薪洪水猛兽流水无情直言不讳无所顾忌拐弯抹角真心诚意故弄玄虚侃侃而谈滔滔不绝虚情假意推心置腹旁敲侧击喋喋不休慢条斯理含糊其词唠唠叨叨振振有辞肆无忌惮大言不惭娓娓动听绘声绘色对答如流自圆其说闲言碎语闭月羞花沉鱼落雁出水芙蓉明眸皓齿美如冠玉倾国倾城国色天香鹤发童颜眉清目秀和蔼可亲心慈面善张牙舞爪愁眉苦脸冰清玉洁雍容华贵文质彬彬威风凛凛老态龙钟虎背熊腰如花似玉容光焕发落落大方骨瘦如柴大腹便便面黄肌瘦其貌不扬蓬头垢面弱不禁风口若悬河对答如流滔滔不绝谈笑风生高谈阔论豪言壮语夸夸其谈花言巧语忐忑不安心惊肉跳心神不定心猿意马心慌意乱七上八下心急如焚班门弄斧孤芳自赏居功自傲目中无人妄自尊大忘乎所以惟我独尊自高自大自鸣得意自我陶醉自命不凡目空一切不骄不躁功成不居戒骄戒躁洗耳恭听虚怀若谷慎言谨行学无止境学而不厌真才实学学而不倦发奋图强废寝忘食争分夺秒孜孜不倦笨鸟先飞闻鸡起舞自强不息只争朝夕不甘示弱";
var chengyuNum = 500;
var answer;
var answerIndex;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showErrorChoiceDialog: false,
    chengyuQuestion: "问题",
    choice1Text: "选项1",
    choice2Text: "选项2",
    choice3Text: "选项3",
    choice4Text: "选项4",
  },

  newGame: function (e) {
    var chengyuStart = Math.floor(Math.random() * chengyuNum) * 4; //[0, chengyuNum - 1]
    var deletedIndex = Math.floor(Math.random() * 4);
    answer = chengyuString[chengyuStart + deletedIndex];
    var question = "";
    for (var i = 0; i < 4; i++) {
      if (i != deletedIndex)
        question += chengyuString[i + chengyuStart];
      else question += "__";
    }
    this.setData({
      chengyuQuestion: question,
    });

    var num4 = new Array();
    num4[0] = -1;
    num4[1] = -1;
    num4[2] = -1;
    num4[3] = -1;
    for (var i = 0; i < 4; i++) {
      var temp;
      do {
        temp = Math.floor(Math.random() * wordNum);
      } while (temp == num4[0] || temp == num4[1] || temp == num4[2] || temp == num4[3]);
      num4[i] = temp;
    }
    this.setData({
      choice1Text: commonWords[num4[0]],
      choice2Text: commonWords[num4[1]],
      choice3Text: commonWords[num4[2]],
      choice4Text: commonWords[num4[3]],
    })

    answerIndex = Math.floor(Math.random() * 4) + 1;

    if (answerIndex == 1)
      this.setData({
        choice1Text: answer
      })
    else if (answerIndex == 2)
      this.setData({
        choice2Text: answer
      })
    else if (answerIndex == 3)
      this.setData({
        choice3Text: answer
      })
    else if (answerIndex == 4)
      this.setData({
        choice4Text: answer
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newGame();
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
  choice1Tap: function (e) {

    if (answerIndex == 1) {
      this.correctAnswer();
      this.newGame();
    } else {
      this.wrongAnswer();
    }
  },
  choice2Tap: function (e) {
    if (answerIndex == 2) {
      this.correctAnswer();
      this.newGame();
    } else {
      this.wrongAnswer();
    }
  },
  choice3Tap: function (e) {
    if (answerIndex == 3) {
      this.correctAnswer();
      this.newGame();
    } else {
      this.wrongAnswer();
    }
  },
  choice4Tap: function (e) {
    if (answerIndex == 4) {
      this.correctAnswer();
      this.newGame();
    } else {
      this.wrongAnswer();
    }
  },
  correctAnswer: function (e) {
    wx.showToast({
      icon: "success",
      title: "答案正确",
      duration: 1000,
    })
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/correct.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })

  },
  wrongAnswer: function (e) {
    wx.showToast({
      icon: "none",
      title: "答案错误",
      duration: 1000,
    })
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/file/wrong.mp3'
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  }

})