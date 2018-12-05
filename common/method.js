const BigNumber = require('bignumber.js');
const moment = require('moment');

export const toTime = function(seconds) {
    // console.log("seconds", seconds)
    let minutes, hours, days;
    minutes = ~~(seconds / 60);
    if(minutes > 0) {
        seconds %= 60;
        hours = ~~(minutes / 60);
        if(hours > 0) {
            minutes %= 60;
            days = ~~(hours / 24);
            if(days > 0) {
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
    for(let i = 0; i < timeType.length; i++) {
        if(i + 1 < timeType.length) {
            // console.log(i ,"timeType[i]", timeType[i])
            if(timeType[i] > 0) {
                time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago':
                                            timeType[i] + ' ' + timeDisplay2[i] + ' ago';
            }
        }
        else time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago':
                                    timeType[i] + ' ' + timeDisplay2[i] + ' ago';
        if(time != '')break;
    }
    // console.log("time", time)
    return time;
}

export const toDate = function(timestamp){
    console.log("Date.now", moment().unix(), timestamp)
    let now = new BigNumber(moment().unix())
    let blockTime = new BigNumber(timestamp)
    let seconds = parseInt(now.minus(blockTime))
    // let seconds = parseInt((Math.floor(Date.now() / 1000) - timestamp))
    console.log("seconds", seconds)
    let minutes, hours, days;
    minutes = ~~(seconds / 60);
    if(minutes > 0) {
        seconds %= 60;
        hours = ~~(minutes / 60);
        if(hours > 0) {
            minutes %= 60;
            days = ~~(hours / 24);
            if(days > 0) {
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
    for(let i = 0; i < timeType.length; i++) {
        if(i + 1 < timeType.length) {
            // console.log(i ,"timeType[i]", timeType[i])
            if(timeType[i] > 0) {
                time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago':
                                            timeType[i] + ' ' + timeDisplay2[i] + ' ago';
            }
        }
        else time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago':
                                    timeType[i] + ' ' + timeDisplay2[i] + ' ago';
        if(time != '')break;
    }
    // console.log("time", time)
    return time;
}

export const toDecimals = function(temp) {
    var e = parseInt(temp.toString().split('e-')[1]);
    // if(!e) e = parseInt(temp.toString().split('e+')[1]);
    // console.log("e",e)
    BigNumber.config({ ERRORS: false });
    let bigTemp = new BigNumber(temp);
    if (e) {
        bigTemp = bigTemp.times(Math.pow(10, e-1));
        temp = '0.' + (new Array(e)).join('0') + bigTemp.toString().substring(2);
    }
    return temp;
}

export const timeToDate = (timestamp) => {
    if(timestamp.length === 10) {
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