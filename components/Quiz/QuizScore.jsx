import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";


const QuizScore = ({id, score, userAnswers, ques, handleReport,subject,topic, handleReset }) => {

    const [relatedQuiz, setRelatedQuiz] = useState(null);
    const [recentQuiz, setRecentQuiz] = useState(null);

    async function getRelatedQuiz() {
        const res = await axios.post("/api/quiz/relatedquiz", {subject,topic});
        // console.log(res.data)
        return res.data;
    }

    // console.log(relatedQuiz)
    useEffect(()=>{
        const delayDebounceFn = setTimeout(() => {

            getRelatedQuiz().then((res) => {
                // console.log(res)
                if(res.data.relatedQuizzes){
                    setRelatedQuiz(res.data.relatedQuizzes);
                }
                if(res.data.recentQuizzes){
                    setRecentQuiz(res.data.recentQuizzes);
                }

            });

        }, 500)

        return () => clearTimeout(delayDebounceFn)


    },[id])

    return (
        <>
            <section className="">

                <div className="container flex flex-col justify-center p-4 mx-auto mb-32 md:p-8 ">


                    <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-3xl">Quiz Score</h2>
                    <p className="p-2 text-sm font-medium tracking-wider text-center uppercase mb-5">Your
                        Score: {score}/{ques.length}
                        <button
                            className={"bg-green-500 text-white hover:bg-green-600 transition duration-300 py-2 px-4 rounded ml-5 mb-5"}
                            onClick={handleReset}>Retry
                        </button>

                    </p>

                    <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
                        {ques.map((question, index) => {
                            return (

                                <details key={index}>
                                    <summary
                                        className={`py-2 outline-none cursor-pointer   focus:underline `}>
                                        <span className={"mr-1"}>
                                            {index+1}.
                                        </span>
                                        <span className={` ${userAnswers[index] === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                                        {question.question}
                                        </span>
                                    </summary>
                                    <ul className={"ml-10"}>

                                        <li className={`p-2 ${userAnswers[index] === question.correct ? 'text-green-500' : 'text-red-500'}`}>
                                            <p className="text-md ">Your Answer- {userAnswers[index] || "Not Attempted"}</p>

                                        </li>
                                        <li className="p-2">
                                            <p className="text-md "> Correct- {question.correct}</p>

                                            {/*<p className="text-sm">{definition.example}</p>*/}
                                        </li>

                                        <li className="p-2">
                                            <p className="text-md ">Explanation - {question.explanation}</p>
                                        </li>


                                    </ul>
                                </details>
                            );
                        })}

                    </div>
                </div>
            </section>
            {
                relatedQuiz && (
                    <section className="">
                        <div className="container flex flex-col justify-center p-4 mx-auto mb-14 md:p-8 ">
                            <h2 className={"text-2xl font-bold leading-none text-center  md:text-3xl"}>Related Quizzes</h2>
                            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                                {relatedQuiz.map((quiz, index) => {
                                    return (
                                        <Link href={`/quiz/${quiz._id}`} key={index}

                                              className={" border  border-gray-200 hover:shadow-lg hover:bg-gray-300 hover:scale-105 transition duration-300 p-4 bg-gray-100 shadow-md rounded-md "}>
                                            <h3 className={"text-xl font-semibold"}>{quiz.topic.charAt(0).toUpperCase()+quiz.topic.slice(1)}</h3>
                                            <p className={"text-sm font-medium"}>{quiz.subject}</p>

                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                )
            }

            {
                recentQuiz && (<section className=""><div className="container flex flex-col justify-center p-4 mx-auto mb-32 md:p-8 ">
                            <h2 className={"text-2xl font-bold leading-none text-center sm:text-3xl"}>Recent Quizzes</h2>
                            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
                                {recentQuiz.map((quiz, index) => {
                                    return (
                                        <Link href={`/quiz/${quiz._id}`} key={index}

                                              className={" border border-gray-200 hover:shadow-lg hover:bg-gray-200 hover:scale-105 transition duration-300 p-4 bg-white shadow-md rounded-md "}>
                                            <h3 className={"text-xl font-semibold"}>{quiz.topic.charAt(0).toUpperCase()+quiz.topic.slice(1)}</h3>
                                            <p className={"text-sm font-medium"}>{quiz.subject}</p>

                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                )
            }


        </>
    );
};

export default QuizScore;
