import {redirect} from "next/navigation";
import Tab from "@/components/header/tab";

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
        title: `${metaData.subject} | ${metaData.topic} - AQuiz`,
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
    // console.log(response.question)
    if (response.error) {
        redirect('/questions')
    }
    const question = response.question

    if (arr.length !== 2) {
        redirect(`/questions/${questionId}/${((question.question).replace(/\s/g, '-')).toLowerCase()}`)
    }


    return (
        <>
            <Tab/>
            <div className="my-24">
                <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-50">
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
                            {/*<img src="https://source.unsplash.com/50x50/?portrait" alt="avatar"*/}
                            {/*     className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"/>*/}
                            {/*<span className="cursor-pointer dark:text-gray-600">Like</span>*/}
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
