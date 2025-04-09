import axios from "axios";
const ws = (prams) =>{
    const ws = new WebSocket(`ws://47.109.128.124:8080/ws/${prams}`);
    return ws;
}


const api = axios.create({
    baseURL:'http://47.109.128.124:8080/',
    timeout:5000
})

api.interceptors.response.use((res)=>{
    return res.data;
})

export default api;
export {
    ws
};