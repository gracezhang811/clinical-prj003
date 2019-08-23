import axios from 'axios'

//这里api是代理flag,通过这个api告诉webpack把请求发到3000端口,即express后端
let baseUrl = 'http://127.0.0.1:8080/api/api' //开发环境用
// let baseUrl = '/api'

// 添加患者
export const apiAddPatient = params => { return axios.post(`${baseUrl}/prj003/user/add`, params) }
// 审查信息
export const apiCheckPatient = params => { return axios.post(`${baseUrl}/prj003/user/check`, params) }
// 搜索患者
export const apiSearchPatient = params => { return axios.post(`${baseUrl}/prj003/user/search`, params) }
// 获取患者列表
export const apiGetPatientsList = params => { return axios.post(`${baseUrl}/prj003/user/list`, params) }
// 删除单个患者信息
export const apiRemovePatient = params => { return axios.post(`${baseUrl}/prj003/user/remove`, params) }

// tip 使用params,对于get请求,会把params的参数附加在url后面,实际发送的是一个完整的带参数url请求

// 获取单个患者某个Form
export const apiGetPatientDataForm = params => { return axios.get(`${baseUrl}/prj003/user/form`, {params:params}) }
// 创建单个患者某个Form
export const apiCreatePatientDataForm = params => { return axios.post(`${baseUrl}/prj003/user/form`, params) }
// 修改单个患者某个Form
export const apiUpdatePatientDataForm = params => { return axios.patch(`${baseUrl}/prj003/user/form`, params) }


export const batchRemoveUser = params => { return axios.get(`${baseUrl}/prj003/user/batchremove`, { params: params }) }
