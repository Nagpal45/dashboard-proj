import axios from 'axios';

const apiRequest = axios.create({
    baseURL: "https://dashboard-proj-eight.vercel.app/api",
    withCredentials: true
})

export default apiRequest;