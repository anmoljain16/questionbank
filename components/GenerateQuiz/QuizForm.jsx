"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {getQuestions} from "@/app/api/ai/quiz/createquiz/gemini";
import Alert from "@/components/Alerts/Alert";

export default function QuizForm({closeCreateQuizModal}) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        subject: "" ,
        topic: "",
        questionsCount: 10,
        difficulty: "",
        detail: "" ,
    });
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)


    const createQuiz = async () => {
        setLoading(true)

        if (!formData.subject || formData.subject.trim() === "") {
            setError("Please enter a subject")
            setTimeout(()=>{
                setError(null)
            },3000)
            setLoading(false)
            return;
        }
        if (!formData.topic || formData.topic.trim() === "") {
            setError("Please enter a topic")
            setTimeout(()=>{
                setError(null)
            },3000)
            setLoading(false)
            return;
        }



        if (!formData.detail || formData.detail.trim() === "") {
            formData.detail = "none"
        }

        if(!formData.difficulty || formData.difficulty.trim() === ""){
            formData.difficulty = "Easy"
        }

        try{
            setLoading(true)

            const questions = await getQuestions(formData)
            if(!questions){
                setError("Error in generating questions. Please try again.")
                setTimeout(()=>{
                    setError(null)
                },3000)
                setLoading(false)
                return;
            }

            const response = await axios.post("/api/ai/quiz/createquiz", {
                subject: (formData.subject).charAt(0).toUpperCase() + (formData.subject).slice(1).toLowerCase(),
                topic: (formData.topic).charAt(0).toUpperCase() + (formData.topic).slice(1).toLowerCase(),
                questions: questions,
                difficulty: formData.difficulty,
                detail: formData.detail,
            })

            const responseData = response.data;
            // console.log(responseData)
            if(responseData.error){
                setError(responseData.error)
                setTimeout(()=>{
                    setError(null)
                },3000)
                setLoading(false)
                return;
            }

            setSuccess("Quiz created successfully | Redirecting to quiz page..")

            setTimeout(()=>{

                router.push(`/quiz/${responseData.quiz}`)
            },5000)


        }catch (error) {
            console.log(error)
            setError("Error in creating quiz. Please try again.")
            setTimeout(()=>{
                setError(null)
            },3000)
            setLoading(false)
            return;
        }


        setFormData({
            subject: "" ,
            topic: "",
            questionsCount: 10,
            difficulty: "" ,
            detail: "",
        })



        setLoading(false)

    }

    return(
        <>

            {success && <Alert message={success} type={"Success"} />}
            {error && <Alert message={error} type={"Danger"} />}
            <div
                className="min-h-screen  [&::-webkit-scrollbar]:hidden  fixed bg-black inset-0 z-50 overflow-auto md:backdrop-blur-sm bg-black/30   py-6 flex flex-col justify-center sm:py-12 ">

                <div className="relative py-3 transition ease-in-out duration-1000  sm:mx-auto">

                    <div
                        className="relative px-4 py-10  transition ease-in-out duration-1000 bg-white md:mx-0 shadow rounded-3xl sm:p-10">

                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div
                                    className=" h-14 w-14  rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono ">
                                </div>
                                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed  ">Create New Quiz</h2>
                                    <p className="text-sm text-gray-500 font-normal leading-relaxed"></p>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div
                                    className="py-8 text-base  leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">

                                        <label className="leading-loose">Subject</label>
                                        <input type="text"
                                               value={formData.subject}
                                               onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                               className="px-4 py-2 capitalize border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                               placeholder="Subject"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Topic</label>
                                        <input type="text"
                                               value={formData.topic}
                                               onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                               className="px-4 py-2 capitalize border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                               placeholder="Topic"/>
                                    </div>
                                    <div className="flex md:flex-row flex-col   ">
                                        <div className="flex flex-col">
                                            <label className="leading-loose">No. of questions</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input type="text"
                                                       value={formData.questionsCount}
                                                       onChange={(e) => setFormData({...formData, questionsCount: 10})}
                                                       className=" pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-400"
                                                       placeholder="10 (Default)"

                                                />
                                                <div className="absolute left-3 top-2">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="leading-loose">Difficulty</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <select
                                                    value={formData.difficulty }
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        difficulty: e.target.value
                                                    })}

                                                    className="pr-4 capitalize pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                >

                                                    <option value={"Easy"} >Easy</option>
                                                    <option value={"Medium"}>Medium</option>
                                                    <option value={"Hard"}>Hard</option>


                                                </select>
                                                <div className="absolute left-3 top-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                         className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                                    </svg>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button
                                        onClick={closeCreateQuizModal}
                                        className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        Cancel
                                    </button>
                                    {loading ? (

                                        <button
                                            disabled={true}
                                            className="bg-orange-600 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Loading..
                                        </button>) : (
                                        <button
                                            onClick={createQuiz}
                                            className="bg-orange-600 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
