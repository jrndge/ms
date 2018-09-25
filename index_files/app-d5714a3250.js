/**
 * 判断当前运行环境
 */
var app = {
  isApp: function () {
    return sessionStorage.getItem('isApp') == 'y';
  },

  isHipac: function () {
    return sessionStorage.getItem('isApp') == 'y';
  },

  isStEnv: function () {
    return sessionStorage.getItem('stEnv') === 'st';
  }
}