import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5173/api',
})

api.interceptors.request.use(
    (request) => request,
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use((response)=>{
    if(response.status === 200){
        if(response.data.code == 200){
            return response.data.data
        }
        return Promise.reject('请求出错了')
    }
})


export default api;