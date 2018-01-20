//1.初始化数据
var hashA = init();
var keys = hashA.keys;
var hash = hashA.hash;

//2.生成键盘
//遍历keys,生成kbd标签
generateKeyboard(keys, hash);

//3.监听用户按键
listenKeyborad(hash);

//下面是方法函数-----------------------------------------------------------------------------------------------------------------------//
function init() {
  var keys = {
    0: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    1: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    2: ["z", "x", "c", "v", "b", "n", "m"],
    length: 3
  };
  var hash = {
    q: "qq.com",
    w: "weibo.com",
    e: "ele.me",
    r: "renren.com",
    t: "taobao,com",
    y: "yy.com",
    u: "uc.com",
    i: "iqiyi.com",
    o: "opera.com",
    p: "pptv.com",
    a: "alibaba.com",
    s: "souhu.com",
    d: "douyu.com",
    z: "zhihu.com"
  };

  var hashInLocalStorage = getFromLocalStorage("uuu"); //取出localStorage中uuu对应的hash
  if (hashInLocalStorage) {
    hash = hashInLocalStorage;
  }
  return {
    keys: keys,
    hash: hash
  };
}

function generateKeyboard(keys, hash) {
  for (var index = 0; index < keys.length; index++) {
    var div1 = tag("div", { className: "row" }); //创建div ,key:value
    main1.appendChild(div1); //添加儿子

    var row = keys[index]; //第一个子数组，第二个子数组，第三个子数组
    for (var index2 = 0; index2 < row.length; index2++) {
      //添加多少个kbd取决与keys的子数组个数  index2= 0~9 0~8 0~6

      var span = createSpan(row[index2]);

      var button1 = creatButton(row[index2]);

      var img = creatImg(hash[row[index2]]);

      var kbd = tag("kbd", { className: "key" }); //创建kbd
      kbd.appendChild(span);
      kbd.appendChild(img);
      kbd.appendChild(button1); //添加booton到kbd中

      div1.appendChild(kbd); //添加kbd到div中
    }
  }
}


function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || "null");
}


function tag(tagName, attributes) {
  var element = document.createElement(tagName);
  for (var key1 in attributes) {
    element[key1] = attributes[key1];
  }
  return element;
}


function createSpan(textContent) {
  var span = tag("span");
  span.textContent = textContent;
  span.className = "text";
  return span;
}


function creatButton(id) {
  var button1 = tag("button", { textContent: "编辑" }); //创建button //给botton添加id
  button1.id = id;
  button1.onclick = function(xxx) {
    var button2 = xxx.target; //拿到用户点击的取值
    var key = button2.id;
    var userUrl = prompt("请输入网址"); //用户输入的网址
    hash[key] = userUrl; //改变hash的对应默认网址
    var img2 = button2.previousSibling;
    img2.src = "http://" + userUrl + "/favicon.ico";
    img2.onerror = function(xxx) {
      xxx.target.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
    }; //图片为加载保险事件
    window.localStorage.setItem("uuu", JSON.stringify(hash));
  };
  return button1;
}


function creatImg(domain) {
  var img = tag("img");
  if (domain) {
    //如果设置存在把图标设置为src
    img.src = "http://" + domain + "/favicon.ico";
  } else {
    //不存在设置为透明
    img.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
  }
  img.onerror = function(xxx) {
    xxx.target.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
  };
  return img;
}


function listenKeyborad(hash) {
  document.onkeypress = function(xxxx) {
    //xxxx中包含你按键的所有信息
    var key = xxxx["key"]; //获用户的按键
    var wbsite = hash[key]; //绑定按键到对应网站
    window.open("http://" + wbsite, "_blank"); //在新窗口打开
  };
}