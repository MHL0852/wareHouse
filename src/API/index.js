import axios from 'axios';

const getLacation = "http//quickxsfos.56linked.com/vcloudwood-gateway/vcloudwood/gateway/query.v";
let devURL = 'https://gw.56linked.com';
let prodURL = 'http://quickxsfos.56linked.com';
let util = axios.create({
  baseURL: prodURL
});

export {
  getLacation,
  util
}
