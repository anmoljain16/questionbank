import Link from "next/link";
import Tab from "@/components/header/tab";

const QuizScore = ({ score, userAnswers, ques, handleReport, handleReset }) => {

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
            {/*<div className="w-full xl:w-8/12 mb-12 xl:mb-0  mx-auto mt-8 sm:mt-24 ">*/}
            {/*<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">*/}
            {/*        <div className="rounded-t mb-0 px-4 py-3 border-b-0">*/}
            {/*            <div className="flex flex-wrap items-center">*/}
            {/*                <div className="relative w-full px-4 max-w-full flex-grow flex-1">*/}
            {/*                    <h3 className="font-semibold text-base text-gray-800 sm:text-lg">Quiz Report</h3>*/}
            {/*                    <p className="text-sm text-gray-500 mt-1">Your Score: {score}/{ques.length}</p>*/}
            {/*                </div>*/}
            {/*                <div*/}
            {/*                    className="relative w-full px-4 max-w-full flex-grow flex-1 mt-4 sm:mt-0 flex justify-end">*/}
            {/*                    <button*/}
            {/*                        className=" bg-rose-500 text-white hover:bg-rose-600 transition duration-300 py-2 px-4 rounded mr-4"*/}
            {/*                        onClick={handleReset}>Retry*/}
            {/*                    </button>*/}
            {/*                    <Link href={"/quiz"}*/}
            {/*                          className=" bg-green-600 text-white font-light hover:bg-green-700   transition duration-300 py-2 px-4 rounded">*/}
            {/*                        See All Quizzes*/}
            {/*                    </Link>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="block w-full overflow-x-auto">*/}
            {/*            <table className="items-center bg-transparent w-full border-collapse">*/}
            {/*                <thead>*/}
            {/*                <tr>*/}
            {/*                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs sm:text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">*/}
            {/*                        Question*/}
            {/*                    </th>*/}
            {/*                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs sm:text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">*/}
            {/*                        Correct Answer*/}
            {/*                    </th>*/}
            {/*                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs sm:text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">*/}
            {/*                        Your Answer*/}
            {/*                    </th>*/}
            {/*                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs sm:text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">*/}
            {/*                        Explanation*/}
            {/*                    </th>*/}
            {/*                </tr>*/}
            {/*                </thead>*/}

            {/*                <tbody>*/}
            {/*                {ques.map((question, index) => (*/}
            {/*                    <tr key={index}*/}
            {/*                        className={userAnswers[index] === question.correct ? 'bg-green-100' : userAnswers[index] ? 'bg-red-100' : 'bg-amber-100'}>*/}
            {/*                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs sm:text-sm whitespace-nowrap p-4 text-gray-800">*/}
            {/*                            {question.question}*/}
            {/*                        </td>*/}
            {/*                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs sm:text-sm whitespace-nowrap p-4 text-gray-800">*/}
            {/*                            {question.correct}*/}
            {/*                        </td>*/}
            {/*                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs sm:text-sm whitespace-nowrap p-4 text-gray-800">*/}
            {/*                            {userAnswers[index] || "Not Attempted"}*/}
            {/*                        </td>*/}
            {/*                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs sm:text-sm whitespace-nowrap p-4 text-gray-800">*/}
            {/*                            {question.explanation}*/}
            {/*                        </td>*/}
            {/*                        /!*<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs sm:text-sm whitespace-nowrap p-4">*!/*/}
            {/*                        /!*    <button*!/*/}
            {/*                        /!*        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"*!/*/}
            {/*                        /!*        onClick={() => handleReport(index)}>*!/*/}
            {/*                        /!*        Report*!/*/}
            {/*                        /!*    </button>*!/*/}
            {/*                        /!*</td>*!/*/}
            {/*                    </tr>*/}

            {/*                ))}*/}
            {/*                </tbody>*/}
            {/*            </table>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}

        </>
    );
};

export default QuizScore;
