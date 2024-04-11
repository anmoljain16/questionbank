"use client"
import {useEffect, useState} from "react";
import QuizScore from "@/components/Quiz/QuizScore";

export default function QuizPage(props) {
    const ques = props.ques;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(ques.length).fill(null));
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (option) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestion] = option;
        // console.log(updatedUserAnswers);
        setUserAnswers(updatedUserAnswers);
        setShowExplanation(true);

    };

    const handleNextQuestion = () => {
        props.setMeanings(null);
        if (currentQuestion + 1 < ques.length) {
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);

        } else {
            // console.log("Quiz completed!");
            // console.log("Score:", score);
            // console.log("User Answers:", userAnswers);
            // console.log(ques)
            setShowResults(true);
        }
        const correctOption = ques[currentQuestion].correct;
        if (userAnswers[currentQuestion] === correctOption) {
            setScore(score + 1);
        }
    };

    const handleReset = () => {
        setCurrentQuestion(0);
        setUserAnswers(Array(ques.length).fill(null));
        setShowExplanation(false);
        setScore(0);
        setShowResults(false);
    };


    return (
        <>
            <div className="container">
                {!showResults && (
                    <div className="my-8 px-4">
                        {/* Subject and Topic */}
                        <h1 className="text-2xl font-semibold text-center mb-4 ">{props.subject} |
                            <span className={"font-normal shadow-2xl border-b-2 border-b-gray-500 w-fit border-dashed"}>  {props.topic}</span>
                        </h1>
                        {/* Question numbering */}
                        <p className="text-lg">Question {currentQuestion + 1} of {ques.length}</p>
                        <h3 className="text-xl font-semibold mt-4 ">{ques[currentQuestion].question}</h3>
                        <ul className="mt-4">
                            {ques[currentQuestion].options.map((option, i) => (
                                <li key={i} className="my-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600"
                                            name={`question${currentQuestion}`}
                                            value={option}
                                            checked={option === userAnswers[currentQuestion]}
                                            onChange={() => handleOptionSelect(option)}
                                        />
                                        <span className="ml-2" >{option}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <div className="text-center mt-8">
                            <button
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleNextQuestion}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {showResults && <QuizScore score={score} userAnswers={userAnswers} ques={ques} handleReport={() => console.log("Reported!")} handleReset={handleReset} />}

            </div>


        </>
    );
}
