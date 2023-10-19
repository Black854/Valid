import axios from "axios"

const instance = axios.create({
    baseURL: 'http://10.85.10.212/',
    // withCredentials: true,
    // headers: {"API-KEY": "4f3d39e5-214f-420c-9ab3-f8c322bdb13c"}
});

// type GetUsersResponseType = {
//     items: Array<UserType>
//     totalCount: number
//     error: string
// }

// type FollowUserResponseType = {
//     resultCode: ResultCodesEnum
//     messages: Array<string>
//     data: {}
// }

// type UnfollowUserResponseType = {
//     resultCode: ResultCodesEnum
//     messages: Array<string>
//     data: {}
// }

export const equipmentAPI = {
    getEquipment () {
        return instance.get(`ov/api/equip.php`).then (response => {
            return response.data
        })
    }
    // followUser (id: number) {
    //     return instance.post<FollowUserResponseType>(`follow/${id}`, {}).then (response => {
    //         return response.data
    //     })
    // },
    // unfollowUser (id: number) {
    //     return instance.delete<UnfollowUserResponseType>(`follow/${id}`).then (response => {
    //         return response.data
    //     })
    // },
    // getProfile (id: number) {
    //     return profileAPI.getProfile(id)
    // }
    // getUsers (pageSize=5, pageNumber=1) {
    //     return instance.get<GetUsersResponseType>(`users?count=${pageSize}&page=${pageNumber}`).then (response => {
    //         return response.data
    //     })
    // },
}