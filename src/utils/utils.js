import { parse } from 'querystring';
import { Base64 } from 'js-base64';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// 是否为对象
export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

// 是否为数组
export const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

// 是否为有内容的对象
export const isEmptyObject = obj => isObject(obj) && Object.keys(obj).length > 0;

// 元素类型判断
const getType = obj => {
  // tostring会返回对应不同的标签的构造函数
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

// 深拷贝方法
export const deepClone = data => {
  const type = getType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i += 1) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    Object.keys(data).map(d => {
      obj[d] = deepClone(data[d]);
      return d;
    });
  }
  return obj;
};

/**
 *
 * @param name cookie名称
 * @param value cookie 对应的 value
 * @param time 设置cookie的有效时长
 */
export const setCookie = (name, value, time) => {
  const times = time || 30 * 30 * 48;
  const d = new Date();
  d.setTime(d.getTime() + times * 60 * 1000);
  document.cookie = `${name}=${Base64.encode(value)};expires=${d.toGMTString()};path=/`;
};

/**
 * 获取cookie
 * @param name
 */
export const getCookie = name => {
  const ca = document.cookie.split('; '); // ca格式例如["name=xiaoming", "age=25"]
  let str;
  for (let i = 0; i < ca.length; i += 1) {
    if (name === 'token') {
      if (ca[i].startsWith('token=')) {
        const c = ca[i].split('token=');
        str = Base64.decode(c[1]);
        return str;
      }
    }
    const c = ca[i].split('='); // c格式例如["name", "xiaoming"]
    if (c[0] === name) {
      str = Base64.decode(c[1]);
      return str;
    }
  }
  return str;
};
