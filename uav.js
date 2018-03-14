const isId = /[0-9]+[a-zA-Z]|[a-zA-Z]+[0-9]+/ // 判断 id是否为字母和数字组成
const isNum = /^-?\d+$/　// 判断是否为整数

// 监控区域类
class Monitor {
  constructor(data){
    this.msgList = []
    this.init(data)
  }
  
  // 初始化
  init(data){
    const rawList = data.split(/\n+/)
    rawList.map((raw, i) => this.format(raw, i))
  }
  
  // 格式化
  format(raw, i){
    const tmp = raw.split(/\s+/)
    const msg = {
      id: tmp[0], // UAV id
      raw: tmp, // 元数据
      index: i, // 序号
      state: 1, // UAV的状态 1: 存在 2: 故障
    }
    // 判断合法性
    if(tmp.length != 4 && tmp.length != 7) msg.state = 2
    if(!isId.test(msg.id)) msg.state = 2
    tmp.map((k, i) => i != 0 ? isNum.test(k) ? k : msg.state = 2 : k )
    
    // 首次
    if(tmp.length === 4 && this.msgList.length === 0){
      msg.x = parseInt(tmp[1])
      msg.y = parseInt(tmp[2])
      msg.z = parseInt(tmp[3])
    }
    // 非首次
    else if (tmp.length === 7 && this.msgList.length != 0) {
      const preMsg = this.msgList[i-1]
      if(preMsg.x == tmp[1] && preMsg.y == tmp[2] && preMsg.z == tmp[3]){
        msg.x = preMsg.x + parseInt(tmp[4])
        msg.y = preMsg.y + parseInt(tmp[5])
        msg.z = preMsg.z + parseInt(tmp[6])
      }else{
        msg.state = 2
      }
    }
    else {
      msg.state = 2
    }
    this.msgList.push(msg)
  }
  
  // 返回输出
  get(index){
    const data = this.msgList[index]
    if(data){
      if(data.state === 1){
        return `${data.id} ${index} ${data.x} ${data.y} ${data.z}`
      }else if (data.state === 2) {
        return `Error: ${index}`
      }
    }else{
      return `Cannot find ${index}`
    }  
  }
}

module.exports = Monitor

