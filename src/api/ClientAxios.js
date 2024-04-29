import axios from "axios";

export const clientAxios = axios.create(
    {
        baseURL: "https://barreltrackerback.onrender.com/api",
        timeout: 12000,
        headers: {
            "Content-Type": "application/json"
        }
    }
)

clientAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtoken")
    config.headers.Authorization = token ?? ""
    return config
}
)

clientAxios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.response.status === 401 ) {
            localStorage.removeItem("jwtoken")
        }
        return Promise.reject(error)
    }
)

