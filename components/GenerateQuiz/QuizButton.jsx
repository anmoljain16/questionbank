"use client"
import { useState } from "react"
import QuizForm from "@/components/GenerateQuiz/QuizForm";
export default function QuizButton() {
    const [createQuizModal, setCreateQuizModal] = useState(false);

    const openCreateQuizModal = () => {
        setCreateQuizModal(true);
    }

    const closeCreateQuizModal = () => {
        setCreateQuizModal(false);
    }
    

    return(<>

        <button rel="noopener noreferrer" 
        onClick={openCreateQuizModal}
               className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b focus:border-b-0 focus:rounded-t-lg focus:border  dark:border-gray-600 dark:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>


                <span>Create New Quiz</span>
            </button>
                        {createQuizModal && <QuizForm closeCreateQuizModal={closeCreateQuizModal}/>}
</>
    )
}