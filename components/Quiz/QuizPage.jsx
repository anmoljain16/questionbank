"use client"
import {useState} from "react";

export default function QuizPage(props) {
    // const ques = props.ques;
    const ques = [
        {
            "question": "Which of the following is NOT a type of AI?",
            "options": [
                "Narrow AI",
                "General AI",
                "Super AI",
                "Natural AI"
            ],
            "correct": "Natural AI",
            "explanation": "Natural AI is not a recognized type of AI."
        },
        {
            "question": "What is the term used to describe AI systems that can learn from data without being explicitly programmed?",
            "options": [
                "Machine learning",
                "Deep learning",
                "Neural networks",
                "Natural language processing"
            ],
            "correct": "Machine learning",
            "explanation": "Machine learning is a subfield of AI that allows systems to learn from data without being explicitly programmed."
        },
        ]

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
            <div className="max-w-md mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">{ques[currentQuestion].question}</h2>
                <div className="grid grid-cols-1 gap-4">
                    {ques[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`bg-gradient-to-r from-blue-600 via-blue-300 to-blue-100 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
                                "option" === option
                                    ? 'ring-2 ring-offset-2 ring-blue-500'
                                    : ''
                            }`}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
