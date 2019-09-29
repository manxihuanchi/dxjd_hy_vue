// import  from './ajax'
import ajax from './ajax'
const config = require('../config/config')
const BASE_URL=config.default.path

/*模板*/
export const tamplate=(arg0)=>ajax(`${BASE_URL}/path/${arg0}`)
/*通用模块*/

/*登录模块*/
export const login=(username,password)=>ajax(BASE_URL+'/api2/auth/token',{username,password},'POST')

export const oldPeople=()=>ajax(BASE_URL+'/api2/ks/c//oldPeople',{},'POST')

export const oldPeople2=(queryKey)=>ajax(BASE_URL+'/api2/ks/query/'+queryKey+'/1',{},'POST')
