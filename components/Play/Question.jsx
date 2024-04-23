import Options from "@/components/Play/Options";
import ScoreStats from "@/components/Play/ScoreStats";
import GetMoreQuestions from "@/components/Play/GetMoreQuestions";
import Link from "next/link";

async function getQuestions() {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/play/getquestions`,
            {
                method: 'GET',
                next: {revalidate: 5},
            })
        return res.json()
    } catch (e) {
        return {
            error: true,
            data: null
        }
    }
}

export default async function Question(){

    const response = await getQuestions()
    if (response.error) {
        return <h1>Something went wrong</h1>
    }

    const questions = response.data



    return (
        <main>
            <div className=" mt-10">
                <div
                    className="container  my-4 cursor-default max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-800 sticky top-2 z-10">
                    {/*<span className="text-xs dark:text-gray-600 ">Life is Unfair</span>*/}
                    <div className="flex items-center  md:flex-row justify-between">
                        <h1 className="text-lg font-medium hidden md:block text-white">Random Questions</h1>
                        <div
                            className="flex items-center ml-3 text-xs md:text-sm  justify-between ">
                            <ul className={"list-disc "}>
                                <li className={"text-red-400  "}>- 2 points for wrong answer</li>
                                <li className={"text-green-400"}>+ 1 point for right answer</li>
                            </ul>

                        </div>
                        <div className="flex items-center  md:mt-0">
                            {/*    currect score*/}
                            <span
                                className="text-xs md:text-sm font-light dark:text-white ">Current Score: <ScoreStats/></span>
                        </div>

                    </div>
                </div>
                {questions && questions.map((question, index) => (
                    <div key={index}
                         className="container my-4 cursor-default max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-50">
                        <div className="flex items-center justify-between">
                            <span
                                className="text-sm dark:text-gray-600">{new Date(question.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</span>
                            <span rel="noopener noreferrer"
                                  className="px-2 py-1 text-xs md:text-sm rounded dark:bg-green-500 dark:text-gray-50">{question.subject}</span>
                        </div>
                        <div className="mt-3">
                            <span rel="noopener noreferrer" className="md:text-xl">{question.question} </span>
                            <Options options={question.options} id={question._id} correct={question.correct}
                                     explanation={question.explanation}/>
                        </div>


                        <div className="flex items-center justify-between mt-4">
                            <div rel="noopener noreferrer" className="hover:underline dark:text-violet-600"></div>
                            <div>
                        <span rel="noopener noreferrer" href="#" className="flex items-center">
                            {/*<img src="https://source.unsplash.com/50x50/?portrait" alt="avatar"*/}
                            {/*     className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"/>*/}
                            <span className="text-xs dark:text-gray-600">
                                <Link href={`/questions/${question._id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor"
                                         className="w-5 h-5 text-gray-950 hover:scale-105 cursor-pointer">
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
            </div>
            <GetMoreQuestions/>
        </main>

    )
}
