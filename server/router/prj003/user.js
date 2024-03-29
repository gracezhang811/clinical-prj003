// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import { LoginUsers, Users } from '../src/mock/data/user'
// let _Users = Users
const request = require("request");
const express = require("express");
const router = express.Router();
var myConst = require("../const");

// 搜索
router.post('/search', function (req, res, next) {
  const options = {
    url: myConst.apiurl + "/prj003/search/",
    form: req.body.search,//浏览器发送过来的req的body  和  后端返回的response的body格式类型不一样?
    qs: {page:req.body.page},
    headers: {'Authorization': 'Bearer ' + req.cookies.prj003token.access_token}
  }
    console.log("搜索option", options)
  request.post(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    console.log("搜索返回结果", bodyParse.count)
    var searchResultsNum = bodyParse.count
    var searchResults = bodyParse.results
    res.send({searchResults, searchResultsNum})
  })
})
// 添加患者信息
router.post('/add', function (req, res, next) {
  // console.log('req.body.name->', req.body.patientInfo.name)
  const options = {
    url: myConst.apiurl + "/prj003/info/",
    form: req.body.patientInfo,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj003token.access_token}
  }
  request.post(options, function (error, response, body) {
    console.log("增加信息", body)
    res.send({msg:'成功了'})
  })

})
// 删除患者信息
router.post('/remove', function (req, res, next) {
  const options = {
    url: req.body.url,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj003token.access_token}
  }
  request.del(options, function (error, response, body) {
    console.log("删除",response.statusCode)
    if (response.statusCode == 204) {
      res.send({msg:''})
    } else {
      var bodyParse = JSON.parse(body)
      res.send({msg:bodyParse.detail})
    }
  })

})
// 审查
router.post('/check', function (req, res, next){
  var options = {
        url: req.body.check,
        form:req.body,
        headers: {
            'Authorization': 'Bearer ' + req.cookies.prj003token.access_token
        }
      }
  console.log("审核",options)
  request.post(options, function (error, response, body) {
    console.log("发送",body)
    if (!error && response.statusCode == 200) {
      res.send({msg:'审查成功'})
      } else {
      res.send({msg:'审查失败'})
    }

  })
})


// 所有患者信息列表
router.post('/list', function(req, res, next) {
  // console.log('user.js 1.req.body->', req.body)
  // console.log('user.js 2.req.cookies->', req.cookies)
  const options = {
    url: myConst.apiurl + "/prj003/info/",
    qs: {page:req.body.page},
    headers: {'Authorization': 'Bearer ' + req.cookies.prj003token.access_token}
  }
  request.get(options, function (error, response, body) {
    var bodyParse = JSON.parse(body)
    var totalNum = bodyParse.count
    var patientsList = bodyParse.results
    var is_admin = bodyParse.is_admin
    res.send({patientsList,totalNum,is_admin})
  })

})

/* info summary history experiment bxray cure等6个表单 */
/* 增加权限设置 */
// 获取
router.get('/form', function(req, res, next) {
  console.log('user.js GET获取Form ', req.query.url)
    var options = {
      url: req.query.url,
      headers: {'Authorization': 'Bearer ' + req.cookies.prj003token.access_token}
    }
    request.get(options, function (error, response, body) {
      var patientForm = JSON.parse(body)
      //console.log('get Form ' + JSON.stringify(patientForm))
      res.send(patientForm)
    })
})
// 创建
router.post('/form', function(req, res, next) {
  console.log('user.js POST创建Form ' + req.body.formName)
  //console.log('Formdata ' + JSON.stringify(req.body.formData) )
  var options = {
    url: myConst.apiurl + "/prj003/"+ req.body.formName + "/",
    form: req.body.formData,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj003token.access_token}
  }
  request.post(options, function (error, response, body) {
    // console.log(response)
    res.send({msg:'ok'})
  })
})
// 修改
router.patch('/form', function(req, res, next) {
  console.log('user.js PATCH修改Form ')
  //console.log('Formdata ' + JSON.stringify(req.body.formData) )
  var options = {
    url: req.body.formData.url,
    form: req.body.formData,
    headers: {'Authorization': 'Bearer ' + req.cookies.prj003token.access_token}
  }
    request.patch(options, function (error, response, body) {
      res.send({msg:'ok'})
    })
})

module.exports = router;
