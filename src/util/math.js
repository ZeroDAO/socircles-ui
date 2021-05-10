const math = {
    // 计算价格
    getPrice(apps, count) {
        return Math.floor((Math.pow(apps + count, 1.5) - Math.pow(apps, 1.5)) * 1000) / 10000;
    },
    timeFormat(param) {　　　　　　
        return param < 10 ? '0' + param : param;　　　　
    },
    dealWei(wei){
        return Math.floor(wei / 10000);
    },
    parserDate(date){
        return date.match(/-(\S*) /)[1];
    },
    getTrend(molecule,denominator){
      molecule = Number(molecule);
      denominator = Number(denominator);
      if (molecule == 0 && denominator != 0) {
        return -100;
      }else {
        return denominator == 0 ? 0 : (Math.round((molecule - denominator) / denominator * 10000) / 100.00);
      }
    },
    dealHomeData(param) {
      param.vol = param.vol ? param.vol : 0;
      param.wei = param.wei ? this.dealWei(param.wei) : 0;
      param.users = param.users ? param.users : 0;
      return param;
    },
    dataTrend(param) {
      param.vol = param.vol ? param.vol : 0;
      param.wei = param.wei ? param.wei : 0;
      param.users = param.users ? param.users : 0;
      param.vol_l = param.vol_l ? param.vol_l : 0;
      param.wei_l = param.wei_l ? param.wei_l : 0;
      param.users_l = param.users_l ? param.users_l : 0;
      param.userTrend = this.getTrend(param.users,param.users_l);
      param.volTrend = this.getTrend(param.vol,param.vol_l);
      param.weiTrend = this.getTrend(param.wei,param.wei_l);
      // param.users_l == 0 ? 0 : (Math.round((param.users - param.users_l) / param.users_l * 10000) / 100.00);
      // param.volTrend = param.vol_l == 0 ? 0 : (Math.round((param.vol - param.vol_l) / param.vol_l * 10000) / 100.00);
      // param.weiTrend = param.wei_l == 0 ? 0 : (Math.round((param.wei - param.wei_l) / param.wei_l * 10000) / 100.00);
      return param;　　
    },
    distinct(a, b) {
      let obj = {};
        a.map(function(e, item) {
            obj[e.id] = e;
        });

        let result = a;

        for (let i of b) {
            if (!obj[i.id]) {
                result.push(i);
                obj[i.id] = 1;
            }
        }
        return result;
    },
    nameToColor(name) {
        // eosname 以及一定长度的的纯英文数字，转换为颜色
        if (/^[a-z0-9]{6,12}$/.test(name)) {
            return parseInt(name, 36).toString(16).substr(-6);
        } else {
            var unicode = '';
            for (var i = 1; unicode.length < 8; i++) {
                var temp = name.charAt(name.length - i);
                unicode += temp.charCodeAt(0).toString(16);
            }
            // 针对前置码，英文码数较固定，所以截取到倒数第二位，
            return unicode.substr(unicode.length - 7, 6);
        }
    },
    formatTime(time) {
        let now = new Date();
        let mTime = new Date(time * 1000);
        let c = now - mTime;
        let day = Math.abs(parseInt((c) / 1000 / 3600 / 24)); //计算日期
        let hour = Math.abs(parseInt((c) / 1000 / 3600)); //计算小时
        let minutes = Math.abs(parseInt((c) / 1000 / 60)); //计算分钟
        let seconds = Math.abs(parseInt((c) / 1000)); //计算秒
        let ts;
        if (day > 30) {
            return mTime.getFullYear() + '-' + (mTime.getMonth() + 1) + '-' + mTime.getDate();
        } else if (day >= 2) {
            ts = parseInt(day) + "天前";
        } else if (day > 0 && day < 2) {
            ts = "昨天";
        } else if (hour > 0 && hour < 24) {
            ts = parseInt(hour) + "小时前";
        } else if (minutes > 0 && minutes < 60) {
            ts = parseInt(minutes) + "分钟前";
        } else if (seconds > 0 && seconds < 60) {
            ts = parseInt(seconds) + "秒前";
        }
        return ts;
    },
    dateToTemperature(lastAt, averageTime, averageAmount) {
      // uint64_t diffTime = now() - infoItr->lastAt + 1;
      // log10(diffTime + infoItr->averageTime) / log10(info.averageAmount + 10);
      return (Math.log(Date.parse(new  Date())/1000 - lastAt +averageTime) / Math.log(averageAmount + 10)).toFixed(2);
        // return (2 * Math.log(averageTime + 9) / (Math.log(averageAmount * averageTime) - 10)).toFixed(2);
    }
}

export default math
