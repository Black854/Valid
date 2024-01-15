import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/auth/'
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