// "use client"
// import {useState} from "react";
//
export default function QuestionsSlider(props) {
    return(
        <></>
    )
}
//     const ques = props.ques;
//
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [userAnswers, setUserAnswers] = useState(Array(ques.length).fill(null));
//     const [showExplanation, setShowExplanation] = useState(false);
//     const [score, setScore] = useState(0);
//     const [showResults, setShowResults] = useState(false);
//
//     const handleOptionSelect = (option) => {
//         const updatedUserAnswers = [...userAnswers];
//         updatedUserAnswers[currentQuestion] = option;
//         setUserAnswers(updatedUserAnswers);
//         setShowExplanation(true);
//         if (option === ques[currentQuestion].correct) {
//             setScore(score + 1);
//         }
//     };
//
//     const handleNextQuestion = () => {
//         if (currentQuestion + 1 < ques.length) {
//             setCurrentQuestion(currentQuestion + 1);
//             setShowExplanation(false);
//         } else {
//             setShowResults(true);
//         }
//     };
//
//     const handleReset = () => {
//         setCurrentQuestion(0);
//         setUserAnswers(Array(ques.length).fill(null));
//         setShowExplanation(false);
//         setScore(0);
//         setShowResults(false);
//     };
//
//     return (
//         <>
//             <div className="container mx-auto">
//                 {!showResults && (
//                     <div className="my-8 px-4">
//                         {/* Show topic */}
//                         <h1 className="text-2xl font-semibold text-center mb-4">{props.topic}</h1>
//                         {/* Question numbering */}
//                         <p className="text-lg">Question {currentQuestion + 1} of {ques.length}</p>
//                         <h3 className="text-xl font-semibold mt-4">{ques[currentQuestion].question}</h3>
//                         <ul className="mt-4">
//                             {ques[currentQuestion].options.map((option, i) => (
//                                 <li key={i} className="my-2">
//                                     <label className="inline-flex items-center">
//                                         <input
//                                             type="radio"
//                                             className="form-radio h-4 w-4 text-indigo-600"
//                                             name={`question${currentQuestion}`}
//                                             value={option}
//                                             checked={option === userAnswers[currentQuestion]}
//                                             onChange={() => handleOptionSelect(option)}
//                                         />
//                                         <span className="ml-2">{option}</span>
//                                     </label>
//                                 </li>
//                             ))}
//                         </ul>
//                         <div className="text-center mt-8">
//                             <button
//                                 className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
//                                 onClick={handleNextQuestion}
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 {showResults && (
//                     <div className="my-8 px-4">
//                         <h3 className="text-xl font-semibold">Quiz Completed!</h3>
//                         <p className="mt-4">Your Score: {score} out of {ques.length}</p>
//                         <h3 className="text-xl font-semibold mt-4">Your Answers:</h3>
//                         {ques.map((question, index) => (
//                             <div key={index} className="mt-4">
//                                 <p><strong>Question {index + 1}:</strong> {question.question}</p>
//                                 <p><strong>Your Answer:</strong> <span
//                                     className={userAnswers[index] === question.correct ? "text-green-300" : "text-red-500"}>{userAnswers[index]}</span>
//                                 </p>
//                                 {userAnswers[index] !== question.correct &&
//                                     <p><strong>Correct Answer:</strong> {question.correct}</p>}
//                                 <p><strong>Explanation:</strong> {question.explanation}</p>
//                             </div>
//                         ))}
//                         <button
//                             className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-8"
//                             onClick={handleReset}>Retry
//                         </button>
//                     </div>
//                 )}
//             </div>
//
//
//         </>
//     );
// }
