import axios from 'axios';

const getLacation = "http//quickxs.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v";
let devURL = 'https://gw.56linked.com';
let prodURL = 'http://quickxs.56linked.com';
let util = axios.create({
  baseURL: devURL
});

export {
  getLacation,
  util
}
