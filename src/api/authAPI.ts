import { authInstance } from "./instance"

export const authAPI = {
    login(userName: string, password: string, rememberMe: boolean) {
        const requestData = {
            userName,
            password,
            rememberMe
        }
        return authInstance.post(`login.php`, requestData, {}).then(response => {
            return response.data
        })
    },
}