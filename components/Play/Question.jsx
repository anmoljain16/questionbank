'use client'

import {useEffect, useState} from 'react';
import Options from "@/components/Play/Options";
import Link from "next/link";

export default function Question({questions}) {
    const [questionOnScreen, setQuestionOnScreen] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const questionElements = document.getElementsByClassName('question');
            Array.from(questionElements).forEach((questionElement, index) => {
                const {top, bottom} = questionElement.getBoundingClientRect();
                const isVisible = top >= window.innerHeight * 0.25 && bottom <= window.innerHeight - (window.innerHeight * 0.40);
                if (isVisible) {
                    setQuestionOnScreen(index);
                    return; // Exit the loop once a visible question is found
                }
            });
        };

        // window.addEventListener('scroll', handleScroll);
        return () => {
            // window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to filter questions based on selected unit
    const filterQuestionsByUnit = (unit) => {
        if (unit === selectedUnit) {
            setSelectedUnit(null); // If the same unit is clicked again, remove the filter
        } else {
            setSelectedUnit(unit); // Set the selected unit to filter questions
        }
    };

    // Filter questions based on selected unit
    const filteredQuestions = selectedUnit ? questions.filter(question => question.topic === selectedUnit) : questions;


    return (
        <>
            <div
                className="container my-4 flex flex-row justify-evenly duration-300 cursor-pointer max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg">
                <button
                    onClick={() => filterQuestionsByUnit('Unit 4')} // Button to filter by Unit 4
                    className={`px-4 py-2 ${selectedUnit === 'Unit 4' ? 'bg-gray-500 text-white scale-110 hover:scale-105 hover:bg-gray-600 ' : 'bg-green-400 text-white'} rounded-md transition duration-300 ease-in-out hover:scale-105 hover:bg-green-500`}>
                    {selectedUnit === 'Unit 4' ? "Clear Filter" : "Unit 4"}
                </button>
                <button
                    onClick={() => filterQuestionsByUnit('Unit 5')} // Button to filter by Unit 5
                    className={`px-4 py-2 ${selectedUnit === 'Unit 5' ? 'bg-gray-500 text-white scale-110 hover:scale-105 hover:bg-gray-600 ' : 'bg-green-400 text-white'} rounded-md transition duration-300 ease-in-out hover:scale-105 hover:bg-green-400`}>
                    {selectedUnit === 'Unit 5' ? "Clear Filter" : "Unit 5"}
                </button>
                <button
                    onClick={() => filterQuestionsByUnit('Unit 6')} // Button to filter by Unit 6
                    className={`px-4 py-2 ${selectedUnit === 'Unit 6' ? 'bg-gray-500 text-white scale-110 hover:scale-105 hover:bg-gray-600 ' : 'bg-green-400 text-white'} rounded-md transition duration-300 ease-in-out hover:scale-105 hover:bg-green-400`}>
                    {selectedUnit === 'Unit 6' ? "Clear Filter" : "Unit 6"}
                </button>
            </div>

            {filteredQuestions.map((question, index) => (
                <div key={index}
                     className={`container my-4 ${questionOnScreen === index ? 'scale-105 bg-gray-100 border-2 shadow-2xl ' : ' shadow-sm  '} bg-gray-50 cursor-pointer duration-300   max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg  `}>
                    <div className="flex items-center justify-between">
                        <span className="text-sm dark:text-gray-600">
                            {new Date(question.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                        <span rel="noopener noreferrer"
                              className="px-2 py-1 text-xs md:text-sm rounded dark:bg-green-500 dark:text-gray-50">
                            {question.topic}
                        </span>
                    </div>
                    <div className="mt-3">
                        <span rel="noopener noreferrer" className="md:text-xl question" id={`question-${index}`}>
                            {question.question}
                        </span>
                        <Options options={question.options} id={question._id} correct={question.correct}
                                 explanation={question.explanation}/>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div rel="noopener noreferrer" className="hover:underline dark:text-violet-600"></div>
                        <div>
                            <span rel="noopener noreferrer" href="#" className="flex items-center">
                                <span className="text-xs dark:text-gray-600">
                                    <Link href={`/questions/${question._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className={`w-5 h-5 text-gray-950 cursor-pointer ${questionOnScreen === index ? 'hover:scale-110' : 'hover:scale-100'}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                                        </svg>
                                    </Link>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
