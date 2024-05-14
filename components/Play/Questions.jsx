import ScoreStats from "@/components/Play/ScoreStats";
import GetMoreQuestions from "@/components/Play/GetMoreQuestions";
import Question from "@/components/Play/Question";

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

export default async function Questions() {

    const response = await getQuestions()
    if (response.error) {
        return <h1>Something went wrong</h1>
    }

    const questions = response.data


    return (
        <main>
            <div className=" mt-10 bg-gray-100">
                <div
                    className="container  my-4 cursor-default max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-800 sticky top-2 z-10">
                    {/*<span className="text-xs dark:text-gray-600 ">Life is Unfair</span>*/}
                    <div className="flex items-center  md:flex-row justify-between">
                        <h1 className="text-lg hidden md:block text-white">Computer graphics and
                            visualization {questions.length} Questions</h1>
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
                <Question questions={questions}/>
            </div>
            <GetMoreQuestions/>
        </main>

    )
}
