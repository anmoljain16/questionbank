"use client"
import {useState} from "react";

export default function QuestionsSlider(props) {
    const ques = props.ques;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(ques.length).fill(null));
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (option) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestion] = option;
        setUserAnswers(updatedUserAnswers);
        setShowExplanation(true);
        if (option === ques[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < ques.length) {
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        } else {
            setShowResults(true);
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
            <div className="container mx-auto ">
                {!showResults && (
                    <div className="my-8">
                        {/*<h2 className="text-2xl font-semibold">{props.topic}</h2>*/}
                        <h3 className="text-xl font-semibold">{ques[currentQuestion].question}</h3>
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
                                        <span>{option}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {showResults && (
                    <div className="my-8">
                        <h3 className="text-xl font-semibold">Quiz Completed!</h3>
                        <p className="mt-4">Your Score: {score} out of {ques.length}</p>
                        <h3 className="text-xl font-semibold mt-4">Your Answers:</h3>
                        {ques.map((question, index) => (
                            <div key={index} className="mt-4">
                                <p><strong>Question {index + 1}:</strong> {question.question}</p>
                                <p><strong>Your Answer:</strong> <span
                                    className={userAnswers[index] === question.correct ? "text-green-300" : "text-red-500"}>{userAnswers[index]}</span>
                                </p>
                                {/* <p><strong>Correct Answer:</strong> {question.correct}</p> */}
                                {userAnswers[index] !== question.correct &&
                                    <p><strong>Correct Answer:</strong> {question.correct}</p>}
                                <p><strong>Explanation:</strong> {question.explanation}</p>
                            </div>
                        ))}
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={handleReset}>Retry
                        </button>
                    </div>
                )}
                {!showResults && (
                    <div className="text-center my-8">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleNextQuestion}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <main className="grid min-h-screen w-full place-items-center bg-gray-300">
                {/* show question*/}

                <div className="grid min-w-full grid-rows-4 gap-2 rounded-xl bg-gray-200 p-2">
                    <h1 className="text-center text-2xl font-bold">Who was known as the Maharana of Mewar during the
                        Battle of Haldighati?
                    </h1>
                    <div>
                        <input type="radio" name="option" id="1" value="1" className="peer hidden" defaultChecked/>
                        <label htmlFor="1"
                               className="block mt-4 mb-4 cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Udai
                            Singh II
                        </label>
                    </div>

                    <div>
                        <input type="radio" name="option" id="2" value="2" className="peer hidden"/>
                        <label htmlFor="2"
                               className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">2</label>
                    </div>

                    <div>
                        <input type="radio" name="option" id="3" value="3" className="peer hidden"/>
                        <label htmlFor="3"
                               className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">3</label>
                    </div>

                    <div>
                        <input type="radio" name="option" id="4" value="4" className="peer hidden"/>
                        <label htmlFor="4"
                               className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">4</label>
                    </div>
                </div>
                <div className="text-center my-8">
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleNextQuestion}
                    >
                        Next
                    </button>
                </div>
            </main>
        </>
    );
}
