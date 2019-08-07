import axios from 'axios';

const getLacation = "http//www.quickxs.com/vcloudwood-gateway/vcloudwood/gateway/query.v";
let localUrl='https://gwt.56linked.com';//本地调接口
let devURL = 'http://testllservice.56linked.cn';//测试环境
let prodURL = 'http://www.quickxs.com';//正式环境

let util = axios.create({
  baseURL: devURL
});

export {
  getLacation,
  util
}
