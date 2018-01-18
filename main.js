keys = {
  0: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  1: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  2: ["z", "x", "c", "v", "b", "n", "m"],
  length: 3
};
hash = {
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
hashInLocalStorage = JSON.parse(localStorage.getItem("uuu") || "null"); //取出localStorage中uuu对应的hash
if (hashInLocalStorage) {
  hash = hashInLocalStorage;
} //判断有localstorage就替换掉hash
index = 0;
//遍历keys,生成kbd标签
while (index < keys.length) {
  // 0 1 2 循环创建div
  div1 = document.createElement("div"); //创建div
  main1.appendChild(div1); //添加儿子
  row = keys[index]; //第一个子数组，第二个子数组，第三个子数组
  index2 = 0;
  while (index2 < row.length) {
    //添加多少个kbd取决与keys的子数组个数  index2= 0~9 0~8 0~6
    kbd = document.createElement("kbd"); //创建kbd
    kbd.textContent = row[index2]; //把key[0,1,2]中的字符串添加到kbd中
    button1 = document.createElement("button"); //创建button
    button1.textContent = "编辑"; //button内容
    button1.id = row[index2]; //给botton添加id
    button1.onclick = function(xxx) {
      key = xxx.target.id; //拿到用户点击的取值
      userUrl = prompt("请输入网址"); //用户输入的网址
      hash[key] = userUrl; //改变hash的对应默认网址
      localStorage.setItem("uuu", JSON.stringify(hash));
    };
    kbd.appendChild(button1); //添加booton到kbd中
    div1.appendChild(kbd); //添加kbd到div中
    index2++;
  }
  index++;
}
//监听用户按键
document.onkeypress = function(xxxx) {
  //xxxx中包含你按键的所有信息
  key = xxxx["key"]; //获用户的按键
  wbsite = hash[key]; //绑定按键到对应网站
  window.open("http://" + wbsite, "_blank"); //在新窗口打开
};
