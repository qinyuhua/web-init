/**
 *
 * @returns {*}
 * operatorSystem 操作系统
 * browser 浏览器
 * version 浏览器版本
 */
function getExplorerInfo() {
  let explorer = window.navigator.userAgent;
  explorer = explorer.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(explorer);

  if (explorer.indexOf('msie') >= 0) {
    // ie
    const ver = explorer.match(/msie ([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: 'IE', version: ver };
  }
  if (explorer.indexOf('firefox') >= 0) {
    // firefox
    const ver = explorer.match(/firefox\/([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: 'Firefox', version: ver };
  }
  if (explorer.indexOf('chrome') >= 0) {
    // Chrome
    const ver = explorer.match(/chrome\/([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: 'Chrome', version: ver };
  }
  if (explorer.indexOf('opera') >= 0) {
    // Opera
    const ver = explorer.match(/opera.([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: 'Opera', version: ver };
  }
  if (explorer.indexOf('safari') >= 0) {
    // Safari
    const ver = explorer.match(/version\/([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: 'Safari', version: ver };
  }
  if (explorer.indexOf('edge') >= 0) {
    const ver = explorer.match(/edge\/([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: 'edge', version: ver };
  }
  if (explorer.indexOf('maxthon') >= 0) {
    // 遨游浏览器
    const ver = explorer.match(/maxthon\/([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: '傲游浏览器', version: ver };
  }
  if (explorer.indexOf('qqbrowser') >= 0) {
    // QQ浏览器
    const ver = explorer.match(/qqbrowser\/([\d.]+)/)[1] || '';
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: 'QQ浏览器', version: ver };
  }
  if (explorer.indexOf('se 2.x') >= 0) {
    // 搜狗浏览器
    return { operatorSystem: isMac ? 'IOS' : 'PC', browser: '搜狗浏览器', version: '' };
  }
  return { operatorSystem: isMac ? 'IOS' : 'PC', browser: '', version: '' };
}

export default getExplorerInfo;
