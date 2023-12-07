import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import HeaderWithLink from "../components/header_with_link";
import { getAllQuizResultsData } from "../network/quiz_result_api";

const QuizResultList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [quizResultListResult, setQuizResultListResult] = useState([]);
    const [activeRowDropdown, setActiveRowDropdown] = useState(null);

    // Ref to store a reference to the dropdown container
    const rowDropdownRef = useRef(null);

    useEffect(() => {
        // Add event listener to the document to close the dropdown on outside click
        function handleClickOutside(event) {
            if (rowDropdownRef.current && !rowDropdownRef.current.contains(event.target)) {
                closeRowDropDown();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getQuizResultList();
    }, []);

    const toggleRowDropdown = (rowId) => {
        setActiveRowDropdown(rowId === activeRowDropdown ? null : rowId);
    };

    const closeRowDropDown = () => {
        //setActiveRowDropdown(null);
    };

    const openQuizResultPreview = (quizResult) => {
        navigate(`/admin/show-quiz-result-details/${quizResult._id}`);
    };

    /*const openEditQuizCategory = (quizCategory) => {
        navigate(`/admin/update-quiz-category/${quizCategory._id}`);
    };

    const handleDeleteClick = (quizCategory) => {
        setDeletingQuizCategory(quizCategory); // Set the quiz category to delete
    };

    const handleCloseModal = () => {
        setDeletingQuizCategory(null)
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = deleteQuizCategoryData(deletingQuizCategory._id);
            toast.success(response.message);
            setDeletingQuizCategory(null);
            getQuizCategoryList();

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };*/

    const handleSearch = async (searchValue) => {
        getQuizResultList(searchValue);
    }

    const getQuizResultList = async (search) => {

        setLoading(true);

        try {
            const response = await getAllQuizResultsData(search);
            setTotalCount(response.count);
            setQuizResultListResult(response.quiz_results);
            toast.success("List Fetched successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                {/*<!-- Start block -->*/}
                <section className="bg-gray-50 antialiased mt-10">
                    <HeaderWithLink title={"Quiz Results"} total={totalCount} searchPlcehoder={"Search by name"} onSearch={handleSearch} />
                    <Loader isShow={loading} />
                    {!loading ? (
                        <div className="mx-auto max-w-screen-xl px-4">
                            <div className="bg-white relative shadow-md rounded-lg">

                                <div className="overflow-x-visible">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3">Id</th>
                                                <th scope="col" className="px-4 py-3">Name</th>
                                                <th scope="col" className="px-4 py-3 text-center items-center justify-center">Total Score</th>
                                                <th scope="col" className="px-4 py-3 text-center items-center justify-center">Quiz Played</th>
                                                <th scope="col" className="px-4 py-3">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {quizResultListResult.map((quizResult, index) => (
                                                <tr key={quizResult._id} className="border-b relative">
                                                    <th type="button" onClick={() => openQuizResultPreview(quizResult)} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap max-w-[10rem] truncate hover:text-primary-700">{quizResult._id}</th>
                                                    <td className="px-4 py-3 max-w-[20rem] truncate">{quizResult.user && `${quizResult.user.firstname} ${quizResult.user.lastname}`}</td>
                                                    <td className="px-4 py-3 max-w-[10rem] text-center items-center justify-center">{quizResult.points}</td>
                                                    <td className="px-4 py-3 max-w-[10rem] text-center items-center justify-center">{quizResult.quizPlayed}</td>
                                                    <td className="px-4 py-3 relative">
                                                        <button onClick={() => toggleRowDropdown(quizResult._id)} id={`apple-imac-27-dropdown-button-${quizResult._id}`} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none " type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        {/* Drop down */}
                                                        <div ref={rowDropdownRef} id={`apple-imac-27-dropdown-${quizResult._id}`} className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute right-0 ${activeRowDropdown === quizResult._id ? 'block' : 'hidden'} ${index >= quizResultListResult.length - 2 ? '-top-28' : 'top-10'}`}>
                                                            <ul className="py-1 text-sm" aria-labelledby={`apple-imac-27-dropdown-button-${quizResult._id}`}>
                                                                {/*<li>
                                                                    <button onClick={() => openEditQuizCategory(quizCategory)} type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700 ">
                                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                                        </svg>
                                                                        Edit
                                                                    </button>
                                                                </li>*/}
                                                                <li>
                                                                    <button onClick={() => openQuizResultPreview(quizResult)} className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700">
                                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                        </svg>
                                                                        Preview
                                                                    </button>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}

                </section>
                {/*<!-- End block -->*/}


                {/*<!-- Toast -->*/}
                <ToastContainer />
            </div>

        </>
    )
};

export default QuizResultList;