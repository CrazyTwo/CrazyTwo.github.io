function loginPage(){
  window.location.href="pyq_login.html?backurl="+window.location.href;
}
function backUrl() {
  window.history.back(-1);
}
function setH(wrap) {
  var winH = document.documentElement.clientHeight;
  wrap.style.height = winH + 'px';
}
