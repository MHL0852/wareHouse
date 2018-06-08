import axios from 'axios';

const getLacation = "http//www.quickxs.com/vcloudwood-gateway/vcloudwood/gateway/query.v";
let localUrl='https://gwt.56linked.com';//本地调接口
let devUrl = 'http://192.168.1.181:22226'; //胡欢
let devURL = 'http://testllservice.56linked.cn';//测试环境
let prodURL = 'http://www.quickxs.com';//正式环境
let devFos= 'http://testfos.56linked.net/fos'  //fos 测试
let prodFos= 'http://quickxsfos.56linked.com/fos'  //fos 测试

let util = axios.create({
  baseURL: prodURL
});
let utilFos = axios.create({
  baseURL: prodFos
});

export {
  getLacation,
  util,
  utilFos
}
