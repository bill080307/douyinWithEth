export function formatDate(inputTime, format = 'standard') {
  let date = new Date();
  date.setTime(inputTime * 1000);
  let y = date.getFullYear();
  if(format === 'short'){
    y = y % 100;
    y = y < 10 ? ('0' + y) : y;
  }
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  if(format === 'short'){
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

export function formatvideotime(inputTime) {
  var Millisecond = inputTime%1000;
  inputTime = Math.floor(inputTime / 1000);
  var second = inputTime % 60;
  inputTime = Math.floor(inputTime / 60);
  return inputTime+':'+second+'.'+Millisecond;
}

export function addressab(address) {
    return address.substr(0,6)+'...'+address.substr(38,4);
}

export function formatdurationtime(inputTime, format = 'standard') {
  let Millisecond = inputTime%1000;
  inputTime = Math.floor(inputTime / 1000);
  let second = inputTime % 60;
  inputTime = Math.floor(inputTime / 60);
  if(format==='millisecond'){
    return inputTime+':'+second+'.'+Millisecond;
  }
  if(inputTime < 60){
    return inputTime+':'+second;
  }
  let minute = inputTime % 60;
  inputTime = Math.floor(inputTime / 60);
  return inputTime+':'+minute+':'+second;
}

export function formatETH(eth) {
  return Math.floor(eth / 1e+8).toFixed(2);
}
export function uniqueArr(array) {
  let n = [];
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) === i) n.push(array[i]);
  }
  return n;
}

// 日期格式化 'yyyy-MM-dd hh:mm'
// export function formatDate(time, fmt,isDate = false) {
//   let date
//   if(isDate){
//     date = time
//   }else{
//     date = new Date(time)
//   }
//
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }
//   let o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   }
//   for (let k in o) {
//     let str = o[k] + '';
//     if (new RegExp(`(${k})`).test(fmt)) {
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//     }
//   }
//
//   function padLeftZero(str) {
//     return ('00' + str).substr(str.length);
//   }
//
//   return fmt;
// }


