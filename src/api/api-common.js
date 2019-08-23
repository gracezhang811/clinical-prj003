import axios from 'axios'

//这里api是代理flag,通过这个api告诉webpack把请求发到3000端口,即express后端
let baseUrl = 'http://127.0.0.1:8080/api/api' //开发环境用
// let baseUrl = '/api'


// 登录
export const apiLogin = params => { return axios.post(`${baseUrl}/login`, params).then(res => res.data) }
//进入项目列表
export const apiHome = params => { return axios.post(`${baseUrl}/home`, params) }
//进入项目主页
export const apiPrj = params => { return axios.post(`${baseUrl}/home` + params.linkurl, params) }