const BigNumber = require('bignumber.js');
const moment = require('moment');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-test.atnio.net"));
const fs = require('fs')

export const toTime = function (timestamp) {
  if(!timestamp)return "";
  let now;
  let microTimeStamp = false;
  if (timestamp.length > 10) {
    microTimeStamp = true;
    now = new BigNumber(moment().unix() * 1000);
  } else {
    microTimeStamp = false
    now = new BigNumber(moment().unix());
  }
  let blockTime = new BigNumber(timestamp)
  let seconds = parseInt(now.minus(blockTime));
  if (microTimeStamp) seconds /= 1000;
  // console.log("seconds", seconds)
  let minutes, hours, days;
  minutes = ~~(seconds / 60);
  if (minutes > 0) {
    seconds %= 60;
    hours = ~~(minutes / 60);
    if (hours > 0) {
      minutes %= 60;
      days = ~~(hours / 24);
      if (days > 0) {
        hours %= 24;
      }
    }
  }
  // console.log("hours", hours)
  // console.log("minutes", minutes)
  // console.log("seconds", seconds)
  // console.log("days", days)
  let time = '';
  let timeType = [days, hours, minutes, seconds];
  let timeDisplay1 = ["days", "hrs", "mins", "secs"];
  let timeDisplay2 = ["day", "hr", "min", "sec"];
  //  console.log("timeType", timeType)
  for (let i = 0; i < timeType.length; i++) {
    if (i + 1 < timeType.length) {
      // console.log(i ,"timeType[i]", timeType[i])
      if (timeType[i] > 0) {
        time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago' :
          timeType[i] + ' ' + timeDisplay2[i] + ' ago';
      }
    }
    else time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago' :
      timeType[i] + ' ' + timeDisplay2[i] + ' ago';
    if (time != '') break;
  }
  // console.log("time", time)
  return time;
}

export const toDate = function (timestamp) {
  if(!timestamp)return "";
  let now;
  let microTimeStamp = false;
  if (timestamp.length > 10) {
    microTimeStamp = true;
    now = new BigNumber(moment().unix() * 1000);
  } else {
    microTimeStamp = false
    now = new BigNumber(moment().unix());
  }
  let blockTime = new BigNumber(timestamp)
  let seconds = parseInt(now.minus(blockTime));
  if (microTimeStamp) seconds /= 1000;

  let minutes, hours, days;
  minutes = ~~(seconds / 60);
  if (minutes > 0) {
    seconds %= 60;
    hours = ~~(minutes / 60);
    if (hours > 0) {
      minutes %= 60;
      days = ~~(hours / 24);
      if (days > 0) {
        hours %= 24;
      }
    }
  }
  // console.log("hours", hours)
  // console.log("minutes", minutes)
  // console.log("seconds", seconds)
  // console.log("days", days)
  let time = '';
  let timeType = [days, hours, minutes, seconds];
  let timeDisplay1 = ["days", "hrs", "mins", "secs"];
  let timeDisplay2 = ["day", "hr", "min", "sec"];
  //  console.log("timeType", timeType)
  for (let i = 0; i < timeType.length; i++) {
    if (i + 1 < timeType.length) {
      // console.log(i ,"timeType[i]", timeType[i])
      if (timeType[i] > 0) {
        time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago' :
          timeType[i] + ' ' + timeDisplay2[i] + ' ago';
      }
    }
    else time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago' :
      timeType[i] + ' ' + timeDisplay2[i] + ' ago';
    if (time != '') break;
  }
  // console.log("time", time)
  return time;
}

export const toDecimals = function (temp) {
  if(!temp)return 0;
  var e = parseInt(temp.toString().split('e-')[1]);
  // if(!e) e = parseInt(temp.toString().split('e+')[1]);
  // console.log("e",e)
  BigNumber.config({ ERRORS: false });
  let bigTemp = new BigNumber(temp);
  if (e) {
    bigTemp = bigTemp.times(Math.pow(10, e - 1));
    temp = '0.' + (new Array(e)).join('0') + bigTemp.toString().substring(2);
  }
  return temp;
}

export const timeToDate = (timestamp) => {
  if(!timestamp)return "";
  if (timestamp.length === 10) {
    timestamp = timestamp * 1000;
  }
  else timestamp = parseInt(timestamp);
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}

export async function getANSInfo(addr) {
  // const data = fs.readFileSync('../contracts/ans.abi')
  const data = `[{"constant":false,"inputs":[],"name":"reBid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_content","type":"bytes32"}],"name":"setContent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"bidPrice","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"getNameSpace","outputs":[{"name":"addr","type":"address"},{"name":"price","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nss","outputs":[{"name":"name","type":"string"},{"name":"content","type":"bytes32"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getAuction","outputs":[{"name":"price","type":"uint256"},{"name":"blockNo","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unregister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"getAuction","outputs":[{"name":"addr","type":"address"},{"name":"price","type":"uint256"},{"name":"blockNo","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_content","type":"bytes32"},{"name":"_price","type":"uint256"}],"name":"setContentAndPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"register","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"}],"name":"EventRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"}],"name":"EventUnRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_price","type":"uint256"}],"name":"EventSetPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_content","type":"bytes32"}],"name":"EventSetContent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_content","type":"bytes32"},{"indexed":false,"name":"_price","type":"uint256"}],"name":"EventContentAndPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_price","type":"uint256"}],"name":"EventBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_price","type":"uint256"}],"name":"EventBidPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_price","type":"uint256"}],"name":"EventSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_price","type":"uint256"}],"name":"EventReBid","type":"event"}]`
  let abi = JSON.parse(data.toString());
  const address = "0x0000000000000000000000000000000000000013";

  let ans = new web3.eth.Contract(abi, address);
  let result = await ans.methods.nss(addr).call();
  let info = {}
  if (result.name != "") {
    info.name = result.name;
    info.content = result.content;
  }
  return info;
}

export const hexToNumber = (hex) => {
  if(!hex)return 0;
  return web3.utils.hexToNumber(hex);
}

export const hexToUtf8 = (hex) => {
  if(!hex)return "";
  return web3.utils.hexToUtf8(hex);
}

//地址显示缩短
export const addressSimplify = (address) => {
  if(!address)return "";
  address = address.toString();
  return address.substr(0, 6) + '...' + address.substr(address.length - 5, address.length);
}

//地址显示缩短
export const addressSimplify2 = (address) => {
  if(!address)return "";
  address = address.toString();
  return address.substr(0, 15) + '...' + address.substr(address.length - 5, address.length);
}

export const addressSimplify3 = (address) => {
  if(!address)return "";
  address = address.toString();
  return address.substr(0, 8) + '...' + address.substr(address.length - 8, address.length);
}

//时间戳转化时分秒显示
export const timeToHms = (time) => {
  if(!time)return "";
  let date = new Date(+(time));
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}

export const search = (self) => {
  // this.$router.push('blocks/248703')
  self.$axios.$get("/search/" + self.input).then(res => {
    let type = res.type;
    if (type == "block") {
      let value = res.result;
      let number = value.Number;
      console.log(value, number)
      self.$router.push('/blocks/' + number);
    }
    else if (type == "transaction") {
      self.$router.push('/transactions/' + self.input);
    }
    else if (type == "dbot") {
      self.$router.push('/dbots/' + self.input);
    }
    else if (type == "account") {
      self.$router.push('/accounts/' + self.input);
    }
    else if (type == "candidate") {
      console.log("=====")
      self.$router.push('/votes/' + self.input);
    }
    else if (type == "delegater") {
      self.$router.push('/votes/' + self.input);
    }
  }).catch(error => {
    self.$router.push('/error');
  })
}

//时间戳转化年月日时分秒显示
export const timeFormat = (timestamp) => {
  if(!timestamp)return "";
  return moment(+timestamp).format("YYYY-MM-DD H:MM:SS");
}

//转账金额wei转换为ATN为单位，不保留小数
export const valueToATNFixed = (value) => {
  if(!value)return 0;
  let result = new BigNumber(value).div(1e18);
  if(result.get(1e7)) {
    result = result.toExponential(0);
  }
  else result = result.toFormat(0);
  return result;
}

//转账金额wei转换为ATN为单位，保留小数点后2位
export const valueToATNFixed2 = (value) => {
  if(!value)return 0;
  let result = new BigNumber(value).div(1e18);
  if(result.gte(1e7)) {
    result = result.toExponential(2);
  }
  else result = result.toFormat(2);
  return result;
}

export const getAbi = (abiFile) => {
  const data = fs.readFileSync(abiFile);
  console.log("data", data);
  return JSON.parse(data.toString());
}