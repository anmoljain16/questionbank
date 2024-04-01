"use client"

import React from 'react';
import QuizForm from "@/components/GenerateQuiz/QuizForm";

const SearchBar = () => {
    const [search, setSearch] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const [createQuizModal, setCreateQuizModal] = React.useState(false);
    const [quizModal, setQuizModal] = React.useState(false);

    const openCreateQuizModal = () => {
        setCreateQuizModal(true);
    }

    const closeCreateQuizModal = () => {
        setCreateQuizModal(false);
    }

    return (
        <div className="fixed flex flex-col inset-0 z-50 flex items-center justify-center  bg-transparent ">
            <div className=" flex flex-col gap-4 p-4 rounded-lg max-h-[500px] mb-10 overflow-x-auto">
                <div className="flex items-center justify-between w-full p-2 rounded-full bg-white shadow-lg">
                    <div className="flex items-center">
                        <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
                            <svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            className="font-bold uppercase w-full py-2 pl-4 text-gray-700 bg-transparent leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                    <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div className="text-sm font-bold text-gray-700">Related Quiz</div>


                <div
                    className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
                    <div className="lg:flex md:flex items-center">
                        <div className="h-12 w-12 mb-2 lg:mb-0 border md:mb-0 rounded-full mr-3"></div>
                        <div className="flex flex-col">
                            <div className="text-sm leading-3 text-gray-700 font-bold w-full">Club de Tenis de
                                Concepcion
                            </div>
                            <div className="text-xs text-gray-600 w-full">
                            </div>
                        </div>
                    </div>
                    <svg
                        className="h-6 w-6 mr-1 invisible md:visible lg:visible xl:visible"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div
                    className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
                    <div className="lg:flex md:flex items-center">
                        <div className="h-12 w-12 mb-2 lg:mb-0 border md:mb-0 rounded-full mr-3"></div>
                        <div className="flex flex-col">
                            <div className="text-sm leading-3 text-gray-700 font-bold w-full">Club de Tenis de
                                Concepcion
                            </div>
                            <div className="text-xs text-gray-600 w-full">Av. veteranos del 93, Parque ecuador,
                                Concepcion.
                            </div>
                        </div>
                    </div>
                    <svg
                        className="h-6 w-6 mr-1 invisible md:visible lg:visible xl:visible"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            <div className="">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={openCreateQuizModal}
                >
                    Create Quiz
                </button>
            </div>
            {createQuizModal && <QuizForm closeCreateQuizModal={closeCreateQuizModal}/>}
        </div>
    );
};

export default SearchBar;
