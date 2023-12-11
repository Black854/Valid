import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/auth/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
})

export const authAPI = {
    login(userName: string, password: string, rememberMe: boolean) {
        const requestData = {
            userName,
            password,
            rememberMe
        }
        return instance.post(`login.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}