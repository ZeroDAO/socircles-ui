const tools = {
    getDateStr(addDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() - addDayCount);
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);
        var d = dd.getDate();
        return m + "-" + d;
    },
    toChecksumAddress(address) {
        address = address.toLowerCase().replace("0x", "");
        var hash = createKeccakHash("keccak256").update(address).digest("hex");
        var ret = "0x";
  
        for (var i = 0; i < address.length; i++) {
          if (parseInt(hash[i], 16) >= 8) {
            ret += address[i].toUpperCase();
          } else {
            ret += address[i];
          }
        }
        return ret;
      },
}

export default tools
