'use client'

import {useEffect, useState} from 'react';
import Options from "@/components/Play/Options";
import Link from "next/link";

export default function Question({questions}) {
    const [questionOnScreen, setQuestionOnScreen] = useState(null);

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

    return (
        <>
            {questions && questions.map((question, index) => (
                <div key={index}
                     className={`container my-4 ${questionOnScreen === index ? 'scale-105 bg-gray-100 border-2 shadow-2xl ' : ' shadow-sm  '} bg-gray-50 hover:scale-105 duration-300 hover:bg-gray-100 hover:border-2 hover:shadow-2xl cursor-default max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg  `}>
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
