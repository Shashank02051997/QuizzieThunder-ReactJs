import axiosClient from "../utils/api_client";

export function createQuizCategoryData(data) {
    return axiosClient.get('/quiz/category/create', data);
}

export function deleteQuizCategoryData(id) {
    return axiosClient.delete(`/quiz/category/${id}`);
}

export function getAllQuizCategoriesData() {
    return axiosClient.delete('/quiz/category/all');
}

export function getQuizCategoryDetailData(id) {
    return axiosClient.get(`/quiz/category/${id}`);
}

export function updateQuizCategoryData(id, data) {
    return axiosClient.get(`/quiz/category/update/${id}`, data);
}