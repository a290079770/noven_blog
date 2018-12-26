import Vue from 'vue'

/** ------------------------  cookie操作  -------------------------- */


/*cookie操作*/
function setCookie(key, value, time) {
  var r = key + "=" + escape(value);
  if(time > 0) {
    var i = new Date();
    i.setTime(i.getTime() + time );
    r = r + "; expires=" + i.toGMTString() + "; path=/";
  } else {
    r = r + "; path=/";
  }
  document.cookie = r;
};

function getCookie(key) {
  var t = document.cookie;
  var n = t.split("; ");
  try {
    for(var r = 0; r < n.length; r++) {
      var i = n[r].split("=");
      if(i[0] == key) return unescape(i[1]);
    }
  } catch(e) {
    return "";
  }
  return "";
};

function delCookie(key) {
  var t = new Date();
  t.setTime(t.getTime() - 10000);
  document.cookie = key + "=; expires=" + t.toGMTString() + "; path=/";
};




let utils = {

  //cookie操作
  setCookie,  //设置cookie
  getCookie,  //获取某个key的cookie
  delCookie,  //移除cookie

}

Vue.prototype = Object.assign(Vue.prototype,utils);




