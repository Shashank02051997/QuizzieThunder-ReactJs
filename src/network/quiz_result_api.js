import axiosClient from "../utils/api_client";

export function getAllQuizResultsData(search) {
    return axiosClient.get('/quiz/result/all', { params: { search: search } });
}

export function getQuizResultDetailData(id) {
    return axiosClient.get(`/quiz/result/${id}`);
}
