import axios from "axios"

export  const axiosInstance = axios.create({
    baseURL:"http://4.213.100.69/api",
    withCredentials: true,
})

// const commonAPI = async(httpMethod, url, reqBody, reqHeader)=>{
//     try{
//         const reqConfig = {
//             method: httpMethod,
//             url,
//             data:reqBody,
//             headers:reqHeader? reqHeader: {"Content-Type":"Application/json"},
//             withCredentials:true
//         }
//         const response = await axiosInstance(reqConfig)
//         return response
//     }catch(error){
//         if (error.response){
//             return error.response
//         }else{
//             return{status:500, data:{error: "Network error"}}
//         }
//     }
// }
// export default commonAPI