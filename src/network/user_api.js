import axiosClient from "../utils/api_client";

export function registerUserData(data) {
    return axiosClient.post('/user/register', data);
}

export function getUserDetailData(id) {
    return axiosClient.get(`/user/${id}`);
}

export function updateUserDetailData(id, data) {
    return axiosClient.put(`/user/update/${id}`, data);
}

export function getAllUsersData(search) {
    return axiosClient.get('/user/all-users', { params: { search: search } });
}
