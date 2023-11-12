import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../components/delete_modal";


const ShowQuestionDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [questionResult, setQuestionResult] = useState({});
    const [deletingQuestion, setDeletingQuestion] = useState(null);
    const options = ["A", "B", "C", "D"];

    useEffect(() => {
        const loginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result:", loginResult);
        getQuestionDetail(loginResult)
    }, []);

    const openEditQuestion = (question) => {
        navigate(`/admin/update-question/${question._id}`);
    };

    const handleDeleteClick = (question) => {
        setDeletingQuestion(question);
    };

    const handleCloseModal = () => {
        setDeletingQuestion(null)
    };

    const confirmDelete = async () => {
        /*const token = loginResult.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);*/
    };

    const getQuestionDetail = async (data) => {
        const token = data.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);

        try {
            // Perform the API GET call using Axios
            const response = await axios.get(`${base_url}/question/${id}`, { headers });
            if (response.status === 200) {
                if (response.data && response.data.code === 200) {
                    setQuestionResult(response.data.question);
                    toast.success("Quiz Detail Fetched successfully");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                // Handle errors, e.g., display an error message
                console.error("Error:", response.data);
            }
        } catch (error) {
            // Handle network errors
            console.error("Network Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                {/*<!-- Start block -->*/}
                <div className="bg-gray-50 h-screen">
                    <section className="bg-white shadow-md mt-10">
                        <div className="py-8 px-4 mx-auto ">

                            <div className="w-full flex flex-row mb-1">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Question Id</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-cente">{questionResult._id}</p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Quiz Name</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">{questionResult.quiz ? questionResult.quiz.title : ""}</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row mb-1">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Question</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-cente">{questionResult.question}</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row mb-1">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Options</h2>
                                    <ol start="1" className="mb-4 font-medium text-gray-600 space-y-4">
                                        {questionResult.options && questionResult.options.map((option, index) => (
                                            <li key={index}>{options[index]}. {option}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            <div className="w-full flex flex-row mb-1">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Correct Answer</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">{options[questionResult.correctOptionIndex]}</p>
                                </div>
                            </div>

                            <div className="flex flex-row space-x-4 mt-8">
                                <button onClick={() => openEditQuestion(questionResult)} type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteClick(questionResult)} type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>
                </div >
                {/*<!-- End block -->*/}

                {/*<!-- Delete modal -->*/}
                <DeleteModal isOpen={deletingQuestion} onCancel={handleCloseModal}
                    onConfirm={confirmDelete} />

                {/*<!-- Toast -->*/}
                <ToastContainer />
            </div >
        </>

    );
}

export default ShowQuestionDetails;