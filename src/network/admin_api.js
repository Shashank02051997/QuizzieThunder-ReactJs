import axiosClient from "../utils/api_client";

export function getAllAdminData() {
    return axiosClient.get('/user/all-users?isAdmin=true');
}

export function loginData(data) {
    return axiosClient.post('/user/admin-login', data);
}

