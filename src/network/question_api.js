import axiosClient from "../utils/api_client";

export function createQuestionData(data) {
    return axiosClient.post('/question/create', data);
}

export function getQuestionDetailData(id) {
    return axiosClient.get(`/question/${id}`);
}

export function updateQuestionData(id, data) {
    return axiosClient.put(`/question/update/${id}`, data);
}

export function getAllQuestionsData(id) {
    return axiosClient.get(`/question/${id}/questions`)
}