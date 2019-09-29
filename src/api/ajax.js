import axios from 'axios'
import Qs from 'qs'

const config = require('../config/config')
const BASE_URL=config.default.path
axios.defaults.withCredentials=true;//让ajax携带cookie

axios.interceptors.response.use(response=>{
  if(response.headers.sessiontimeout){
    window.location.href=BASE_URL+response.headers.sessiontimeout
    Promise.reject(response.data)
  }else if(response.headers.redirect){
    window.location.href=response.headers.redirect
    Promise.reject(response.data)
  }
  return response
},error => {
  return Promise.reject(error.response.data)
})
export default function ajax(url,data={},type='GET') {
  return new Promise(function (resolve,reject) {
    let promise
    let token = sessionStorage.getItem('tokenName')
    if(type==='GET'){
      let dataStr=''
      Object.keys(data).forEach(key=>{
        dataStr+=key+'='+data[key]+'&'
      })

      if(dataStr!==''){
        dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'))
        url=url+'?'+dataStr
      }
      promise=axios.get(url,{headers:{
          'datacenter-token':token,
          'hydrocarbon-token':token,
        }})
    }else{
      // promise=axios.post(url,data)
      promise=axios({
        url,
        data,
        method: 'post',
        headers:{
          'datacenter-token':token,
          'hydrocarbon-token':token,
        },
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理

          return Qs.stringify(data)
        }],
      })
    }
    promise.then(function (response) {
      resolve(response.data)
    }).catch(function(error){
      reject(error)
    })
  })

}
