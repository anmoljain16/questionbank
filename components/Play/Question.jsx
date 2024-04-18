import Options from "@/components/Play/Options";

async function getQuestions(){
    const res = await fetch('http://localhost:3000/api/play/getquestions',
        {next:{revalidate:30}})
    return res.json()
}


export default async function Question(){

    const response = await getQuestions()

    if (response.error) return <>..... </>

    const questions = response.data

    return (
        <div className=" mt-10">
            {questions && questions.map((question, index) => (
                <div key={index}
                    className="container my-4 cursor-default max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-50">
                    <div className="flex items-center justify-between">
                        <span className="text-sm dark:text-gray-600">{new Date(question.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <span rel="noopener noreferrer"
                              className="px-2 py-1 text-xs md:text-sm rounded dark:bg-green-500 dark:text-gray-50">{question.subject}</span>
                    </div>
                    <div className="mt-3">
                    <span rel="noopener noreferrer" className="md:text-xl   ">{question.question}
</span>

                        <Options options={question.options} id={question._id} correct={question.correct} explanation={question.explanation} />



                    </div>


                    <div className="flex items-center justify-between mt-4">
                    <span rel="noopener noreferrer" className="hover:underline dark:text-violet-600"></span>
                        <div>
                        <span rel="noopener noreferrer" href="#" className="flex items-center">
                            {/*<img src="https://source.unsplash.com/50x50/?portrait" alt="avatar"*/}
                            {/*     className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"/>*/}
                            <span className="text-xs dark:text-gray-600">{question.isAnonymous?"Anonymous":"User"}</span>
                        </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}