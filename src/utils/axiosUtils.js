import axios from "axios"

let axiosInstance = axios.create({
    baseURL:"http://localhost:3000/api",
    headers:{
        "Content-type":"application/json"
    },
    timeout:10000,
})
axiosInstance.interceptors.request.use(function (config){
    console.log("我是请求拦截器")
    return config;
},function(error){
  console.log("接收到")
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response){
    let data;
    if(response.data == undefined){
        data=response.request.responseText
    } else{
        data=response.data
    }
    return data;
},function(err){
  console.log("接收到");
  if(err && err.response){
      console.log(err.response.status)
      switch (err.response.status){
        case 400:
            err.message='请求错误'
            break

        case 400:
            err.message='请求错误'
            break

        case 401:
            err.message='未授权'
            break

        case 408:
            err.message='请求超时'
            break

        case 500:
            err.message='服务器内部错误'
            break
        
        default:
      }
  }


  return Promise.reject(err);
});
export default axiosInstance;