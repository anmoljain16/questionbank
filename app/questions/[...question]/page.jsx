import {redirect} from "next/navigation";
import Tab from "@/components/header/tab";
import {Link} from "next-view-transitions";
import Like from "@/components/Question/Like";

async function getQuestion(id) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/questions/getquestionbyid/${id}`,
            {
                method: 'GET',
            })
        return await res.json()
    } catch (e) {
        return {
            error: true,
            message: e.message
        }
    }
}

export async function generateMetadata({params}) {
    const {question: arr} = params

    const id = arr[0]
    const question = await getQuestion(id)
    const metaData = question.question

    return {
        title: `${metaData.topic} | ${metaData.subject} - AQuiz`,
        description: `${metaData.question} | AQuiz`,
        keywords: ["quiz", "quizzes", "AI", "artificial intelligence", "machine learning"],
        url: `https://questionbank.anmoljain.tech/questions/${id}`,
        type: "website",
        siteName: "AQuiz",
        creator: "Anmol Jain",
        published: metaData.createdAt,

        openGraph: {
            title: `${metaData.subject} | ${metaData.topic} - AQuiz`,
            description: `${metaData.question} | ${metaData.correct} | ${metaData.explanation} - AQuiz`,
            url: `https://questionbank.anmoljain.tech/questions/${id}`,
            type: "website",
            siteName: "AQuiz",
            creator: "Anmol Jain",
        },

    }
}

export default async function Question({params}) {
    const {question: arr} = params
    // console.log(question)
    const questionId = arr[0]
    const response = await getQuestion(questionId)
    // console.log(response)
    if (response.error) {
        redirect('/questions')
    }
    const question = response.question
    const relatedQuestions = response.relatedQuestions
    // console.log(relatedQuestions)

    if (arr.length !== 1) {
        redirect(`/questions/${questionId}`)
    }


    return (
        <>
            <Tab/>
            <div className="my-12   ">
                {/*a div that links to questions page for see all questions */}


                <div className="container max-w-4xl px-10 py-6  mx-auto my-12 rounded-lg shadow-sm dark:bg-gray-50">
                    {/*<Link href={"/questions"} className="text-sm flex gap-2 text-blue-700 mb-8 hover:scale-105 duration-500  ">*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}*/}
                    {/*         stroke="currentColor" className="w-4 h-4">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round"*/}
                    {/*              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>*/}
                    {/*    </svg>*/}
                    {/*    <span className={"cursor-pointer"}>Back to Questions</span>*/}
                    {/*</Link>*/}
                    <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-600"> <span
                        className="text-xs md:text-sm dark:text-gray-600">{new Date(question.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}</span></span>
                        <span rel="noopener noreferrer"
                              className="px-2 py-1 font-medium rounded dark:bg-violet-600 dark:text-gray-50">{question.topic}</span>
                    </div>
                    <div className="mt-3">
                        <span rel="noopener noreferrer"
                              className="text-base font-medium md:text-2xl md:font-semibold cursor-default">{question.question}</span>
                        <ul>
                            {question.options.map((option, index) => (
                                <li key={index} className="mt-2 text-sm md:text-base cursor-default">
                                    <label htmlFor={option} className="ml-2">{index + 1}. {option}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <details>
                            <summary
                                className="py-2 outline-none cursor-pointer text-sm md:text-base dark:text-violet-600  ">View
                                Answer
                            </summary>
                            <div className="px-4 pb-4">
                                <p className={"my-3 text-sm md:text-base"}>Answer : {question.correct}</p>
                                <p className={"gap-3 text-sm md:text-base"}>Explanation : {question.explanation}</p>
                            </div>
                        </details>
                        <div>
                        <span rel="noopener noreferrer" className="flex items-center">

                         <Like id={question._id}/>


                        </span>
                        </div>
                    </div>
                </div>

                <div
                    className="relative mb-24 md:mb-0 container flex-col w-[98%] md:w-[90%] px-5 bg-slate-300  mx-auto rounded-lg shadow-sm [&::-webkit-scrollbar-thumb]:dark:bg-black/50 [&::-webkit-scrollbar-thumb]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-3xl  [&::-webkit-scrollbar]:h-1.5   mt-6 flex center gap-4 py-6 overflow-x-auto">
                    <div className={"text-base md:text-2xl font-semibold text-gray-950"}>Related Questions</div>

                    <div
                        className="flex gap-4 py-6  [&::-webkit-scrollbar-thumb]:dark:bg-black/50 [&::-webkit-scrollbar-thumb]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-3xl  [&::-webkit-scrollbar]:h-1.5  overflow-x-auto">
                        {relatedQuestions.map((q, index) => (
                            <Link href={`/questions/${q._id}`}
                                  key={index}
                                  className="  bg-white  rounded-lg shadow-md">
                                <div className=" flex flex-col text-nowrap p-4">

                                    <div className="mt-2 text-sm dark:text-gray-600">{q.question}</div>
                                    <div className="flex items-center justify-between mt-4">
                                        <details>
                                            <summary
                                                className="py-2 outline-none cursor-pointer text-sm dark:text-violet-600  ">View
                                                Answer
                                            </summary>

                                        </details>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
