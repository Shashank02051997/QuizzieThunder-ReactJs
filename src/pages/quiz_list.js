import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import HeaderWithLink from "../components/header_with_link";
import Loader from "../components/loader";
import DeleteModal from "../components/delete_modal";
import { filterQuizListData, getAllQuizData } from "../network/quiz_api";
import { getAllQuizCategoriesData } from "../network/quiz_category_api";
import { useFormik } from "formik";

const QuizList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [quizListResult, setQuizListResult] = useState([]);
    const [quizCategoryListResult, setQuizCategoryListResult] = useState([]);
    const [activeRowDropdown, setActiveRowDropdown] = useState(null);
    const [deletingQuiz, setDeletingQuiz] = useState(null);
    // Ref to store a reference to the dropdown container
    const rowDropdownRef = useRef(null);

    useEffect(() => {
        getQuizList();
        getQuizCategoryList();
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

    const toggleRowDropdown = (rowId) => {
        setActiveRowDropdown(rowId === activeRowDropdown ? null : rowId);
    };

    const closeRowDropDown = () => {
        //setActiveRowDropdown(null);
    };

    const openQuizPreview = (quiz) => {
        navigate(`/admin/show-quiz-details/${quiz._id}`);
    };

    const openEditQuiz = (quiz) => {
        navigate(`/admin/update-quiz/${quiz._id}`);
    };

    const handleDeleteClick = (quiz) => {
        setDeletingQuiz(quiz);
    };

    const handleCloseModal = () => {
        setDeletingQuiz(null)
    };

    const confirmDelete = async () => {
        /*const token = loginResult.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);*/
    };

    const handleSearch = async (searchValue) => {
        getQuizList(searchValue);
    };

    const handleFilter = async () => {
        setFilterDrawerOpen(!isFilterDrawerOpen);
    };

    const getQuizList = async (search) => {
        formik.resetForm();
        setFilterDrawerOpen(false)
        setLoading(true);

        try {
            const response = await getAllQuizData(search);
            setTotalCount(response.count);
            setQuizListResult(response.quizzes); // Set the QuizListResult state with the data
            toast.success("List Fetched successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getQuizCategoryList = async () => {

        try {
            const response = await getAllQuizCategoriesData();
            setQuizCategoryListResult(response.quiz_categories);

        } catch (error) {
            toast.error(error.message);
        } finally {

        }
    };


    const formik = useFormik({
        initialValues: { quiz_category: '' },
        initialErrors: {
            quiz_category: 'Quiz Category is required',
        },
        validate: (values) => {
            const errors = {};
            if (!values.quiz_category) {
                errors.quiz_category = 'Quiz Category is required';
            }
            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            const modifiedValues = {
                category: values.quiz_category,
            };
            handleSubmit(modifiedValues);
            setSubmitting(false);
        },
    });

    const handleSubmit = async (values) => {
        handleFilter();
        setLoading(true);
        try {
            const response = await filterQuizListData(values.category);
            setTotalCount(response.count);
            setQuizListResult(response.quizzes); // Set the QuizListResult state with the data
            toast.success("List Fetched successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div>
            {/*<!-- Loader -->*/}
            <Loader isShow={loading} />

            {/*<!-- Start block -->*/}
            <section className="bg-gray-50 antialiased mt-10">
                <HeaderWithLink title={"Quiz List"} total={totalCount} linkTo={"/admin/add-quiz"} searchPlcehoder={"Search by title"} onSearch={handleSearch} displayFilterBtn={true} onFilter={handleFilter} />

                {!loading ? (
                    <div className="mx-auto max-w-screen-xl px-4">

                        <div className="bg-white relative shadow-md rounded-lg">

                            <div className="overflow-x-visible">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Id</th>
                                            <th scope="col" className="px-4 py-3">Title</th>
                                            <th scope="col" className="px-4 py-3">Description</th>
                                            <th scope="col" className="px-4 py-3">Question Count</th>
                                            <th scope="col" className="px-4 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quizListResult.map((quiz, index) => (
                                            <tr key={quiz._id} className="border-b relative">
                                                <th type="button" onClick={() => openQuizPreview(quiz)} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap max-w-[10rem] truncate hover:text-primary-700">{quiz._id}</th>
                                                <td className="px-4 py-3 max-w-[15rem] truncate">{quiz.title}</td>
                                                <td className="px-4 py-3 max-w-[20rem] truncate">{quiz.description}</td>
                                                <td className="px-4 py-3 text-center flex items-center justify-center">
                                                    <span className="bg-primary-700 rounded-full text-white font-bold h-8 w-8 flex items-center justify-center">
                                                        {quiz.questionCount}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 relative">
                                                    <button onClick={() => toggleRowDropdown(quiz._id)} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none " type="button">
                                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </button>
                                                    {/* Drop down */}
                                                    <div ref={rowDropdownRef} className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute right-0 ${activeRowDropdown === quiz._id ? 'block' : 'hidden'} ${index >= quizListResult.length - 2 ? '-top-28' : 'top-10'}`}>
                                                        <ul className="py-1 text-sm" aria-labelledby={`apple-imac-27-dropdown-button-${quiz._id}`}>
                                                            <li>
                                                                <button onClick={() => openEditQuiz(quiz)} type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700 ">
                                                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button onClick={() => openQuizPreview(quiz)} className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700">
                                                                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                    </svg>
                                                                    Preview
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button onClick={() => handleDeleteClick(quiz)} type="button" data-modal-target="deleteModal" data-modal-toggle="deleteModal" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-red-500">
                                                                    <svg className="w-4 h-4 mr-2" viewbox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                                                    </svg>
                                                                    Delete
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

            {/*<!-- Delete modal -->*/}
            <DeleteModal isOpen={deletingQuiz} onCancel={handleCloseModal}
                onConfirm={confirmDelete} />

            {/* <!-- Drawer Filter-->*/}
            {isFilterDrawerOpen ? (
                <>
                    <div
                        className="fixed top-0 left-0 z-50 w-full h-screen bg-black opacity-50"
                        onClick={handleFilter}></div>
                    <div
                        className={`fixed top-0 right-0 z-50 w-full h-screen max-w-sm p-4 overflow-y-auto transition-transform ${isFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                            } bg-white`}
                        tabIndex="-1"
                        aria-labelledby="drawer-label">
                        <h5 class="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase">Filter List</h5>
                        <button onClick={handleFilter} type="button" data-drawer-dismiss="drawer-update-product-default" aria-controls="drawer-update-product-default" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close menu</span>
                        </button>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="space-y-4">
                                <div>
                                    <label class="block mb-2 text-sm font-medium text-gray-900">Quiz Category</label>
                                    <select name="quiz_category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " onChange={formik.handleChange}
                                        value={formik.values.quiz_category}>
                                        <option value="" disabled>Select a category</option>
                                        {quizCategoryListResult.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.quiz_category && formik.errors.quiz_category && (
                                        <div className="text-red-500">{formik.errors.quiz_category}</div>
                                    )}
                                </div>

                            </div>
                            <div class="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                                <button type="submit" class="w-full justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Search
                                </button>
                                <button onClick={getQuizList} type="button" class="w-full justify-center text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg aria-hidden="true" class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            ) : null}


            {/*<!-- Toast -->*/}
            <ToastContainer />
        </div>
    )
};

export default QuizList;