import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/ov/api/vmp/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
})

export const vmpAPI = {
    getVMPData(tablename: string, year: string) {
        return instance.get(`getVMPData.php?tablename=${tablename}&year=${year}`).then(response => {
            return response.data
        })
    },
}