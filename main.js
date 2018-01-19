//1.初始化数据
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

function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name) || "null");
}

var hashInLocalStorage = getFromLocalStorage("uuu"); //取出localStorage中uuu对应的hash
if (hashInLocalStorage) {
  hash = hashInLocalStorage;
} //判断有localstorage就替换掉hash

//2.生成键盘
//遍历keys,生成kbd标签
var index = 0;
while (index < keys.length) {
  // 0 1 2 循环创建div
  var div1 = document.createElement("div"); //创建div
  div1.className = "row";
  main1.appendChild(div1); //添加儿子
  var row = keys[index]; //第一个子数组，第二个子数组，第三个子数组
  var index2 = 0;
  while (index2 < row.length) {
    //添加多少个kbd取决与keys的子数组个数  index2= 0~9 0~8 0~6
    var kbd = document.createElement("kbd"); //创建kbd
    var span = document.createElement("span");
    span.textContent = row[index2]; //把key[0,1,2]中的字符串添加到kbd中
    kbd.className = "key";
    var button1 = document.createElement("button"); //创建button
    button1.textContent = "编辑"; //button内容
    button1.id = row[index2]; //给botton添加id
    var img = document.createElement("img");
    if (hash[row[index2]]) {
      //如果设置存在把图标设置为src
      img.src = "http://" + hash[row[index2]] + "/favicon.ico";
    } else {
      //不存在设置为透明
      img.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
    }
    img.onerror = function(xxx) {
      xxx.target.src = "//i.loli.net/2017/11/10/5a05afbc5e183.png";
    };

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
      localStorage.setItem("uuu", JSON.stringify(hash));
    };
    kbd.appendChild(span);
    kbd.appendChild(img);
    kbd.appendChild(button1); //添加booton到kbd中
    div1.appendChild(kbd); //添加kbd到div中
    index2++;
  }
  index++;
}
//3.监听用户按键
document.onkeypress = function(xxxx) {
  //xxxx中包含你按键的所有信息
  var key = xxxx["key"]; //获用户的按键
  var wbsite = hash[key]; //绑定按键到对应网站
  window.open("http://" + wbsite, "_blank"); //在新窗口打开
};


