export const toDate = function(timestamp){
    let seconds = parseInt((Date.now() - timestamp * 1000) / 1000)
    let minutes = ~~(seconds / 60);
    seconds %= 60;
    let hours = ~~(minutes / 60);
    minutes %= 60;
    let days = ~~(hours / 24);
    hours %= 24;
    // console.log("hours", hours)
    // console.log("minutes", minutes)
    // console.log("seconds", seconds)
    // console.log("days", days)
    let time = '';
    let timeType = [days, hours, minutes, seconds];
    let timeDisplay1 = ["days", "hours", "minutes", "seconds"];
    let timeDisplay2 = ["day", "hour", "minute", "second"];
    //  console.log("timeType", timeType)
    for(let i = 0; i < timeType.length; i++) {
        if(i + 1 < timeType.length) {
            // console.log(i ,"timeType[i]", timeType[i])
            if(timeType[i] > 0) {
                if(timeType[i + 1] > 0) {
                    if(timeType[i] > 1) {
                        time = timeType[i + 1] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ' + timeType[i + 1] + ' ' + timeDisplay1[i + 1] + ' ago':
                                                timeType[i] + ' ' + timeDisplay1[i] + ' ' + timeType[i + 1] + ' ' + timeDisplay2[i + 1] + ' ago';
                    }
                    else time = timeType[i + 1] > 1 ? timeType[i] + ' ' + timeDisplay2[i] + ' ' + timeType[i + 1] + ' ' + timeDisplay1[i + 1] + ' ago':
                                                timeType[i] + ' ' + timeDisplay2[i] + ' ' + timeType[i + 1] + ' ' + timeDisplay2[i + 1] + ' ago';
                }
                else time = timeType[i] > 1 ? timeType[i] + ' ' + timeDisplay1[i] + ' ago':
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

export const cutStr = function(str){
    if(str.length <= 3) return str;
    let decimals = str.substr(str.indexOf('.'), str.length);
    str = str.substr(0, str.indexOf('.'))
    let newStr= new Array(str.length + parseInt(str.length / 3)); 
    newStr[newStr.length - 1]=str[str.length - 1]; 
    let currentIndex=str.length-1; 
    for(let i = newStr.length - 1; i >= 0; i--) 
    { 
        if((newStr.length - i) % 4 == 0 && i != 0) 
        { 
            newStr[i] = ","; 
        }
        else
        { 
            newStr[i] = str[currentIndex--]; 
        } 
    } 
    return newStr.join("") + decimals
} 

export const toDecimals = function(temp) {
    var e = parseInt(temp.toString().split('e-')[1]);
    // console.log("e",e)
    if (e) {
        temp *= Math.pow(10,e-1);
        temp = '0.' + (new Array(e)).join('0') + temp.toString().substring(2);
    }
    return temp;
}