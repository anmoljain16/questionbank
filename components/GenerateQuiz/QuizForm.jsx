"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function QuizForm({closeCreateQuizModal}) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        subject: "" || "Biology",
        topic: "",
        questionsCount: 10,
        difficulty: "",
        detail: "" ,
    });

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const createQuiz = async () => {
        setLoading(true)
        // console.log(formData)

        // API call to create quiz
        if (!formData.topic || formData.topic.trim() === "") {
            setError("Please enter a topic")
            setLoading(false)
            return;
        }
        if (!formData.detail || formData.detail.trim() === "") {
            formData.detail = "none"
        }

        if(!formData.difficulty || formData.difficulty.trim() === ""){
            formData.difficulty = "Medium"
        }
        try{
            const response = await axios.post("/api/ai/quiz/createquiz", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 30000 // Timeout in milliseconds
            });

            const responseData = response.data;

            console.log(responseData)
            if(responseData.error){
                console.log(responseData.error)
                setError(responseData.error)
                setLoading(false)
                return;
            }

            router.push(`/quiz/${responseData.quiz}`)
        }catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request timed out');
                setError("Request timed out. Please try again.");
            } else {
                console.log(error);
                setError("Error in creating quiz. Please try again.");
            }
            setLoading(false);
            return;
        }



        // console.log(formData)






        setFormData({
            subject: "" || "Biology",
            topic: "",
            questionsCount: 10,
            difficulty: "" ,
            detail: "",
        })

        setLoading(false)

    }

    return(
        <>
            <div
                className="min-h-screen fixed bg-black inset-0 z-50 overflow-auto bg-opacity-50 py-6 flex flex-col justify-center sm:py-12">

                <div className="relative py-3 sm:max-w-xl transition ease-in-out duration-1000  sm:mx-auto">

                    <div className="relative px-4 py-10  transition ease-in-out duration-1000 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                        <svg
                            onClick={closeCreateQuizModal}
                            className="w-7 h-5 rtl:rotate-180 font-bold   cursor-pointer transition transform hover:scale-125 duration-300 "
                            xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                        </svg>
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div
                                    className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i
                                </div>
                                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed">Create an Quiz</h2>
                                    <p className="text-sm text-gray-500 font-normal leading-relaxed">Lorem ipsum, dolor
                                        sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div
                                    className="py-8 text-base  leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">

                                        <label className="leading-loose">Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        >
                                            <option value="Biology" >Biology</option>
                                            <option value="Maths" >Maths</option>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Physics">Physics</option>
                                            <option value="History">History</option>
                                            <option value="Geography">Geography</option>
                                            <option value="Economics">Economics</option>
                                            <option value="Political Science">Political Science</option>
                                            <option value="Law">Law</option>
                                            <option value="Programming">Programming</option>
                                            <option value="Cricket">Cricket</option>


                                            {/* Add more options as needed */}
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Topic</label>
                                        <input type="text"
                                               value={formData.topic}
                                               onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                               className="px-4 py-2 capitalize border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                               placeholder="Topic"/>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <label className="leading-loose">No. of questions</label>
                                            <div className="relative focus-within:text-gray-600 text-gray-400">
                                                <input type="text"
                                                         value={formData.questionsCount}
                                                         onChange={(e) => setFormData({...formData, questionsCount: 10})}
                                                       className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
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
                                                <input type="text"
                                                         value={formData.difficulty}
                                                         onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                                                       className="pr-4 capitalize pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                       placeholder="default medium"/>
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
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Detail</label>
                                        <input type="text"
                                                  value={formData.detail}
                                                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                                               className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                               placeholder="Any specific point you want to cover"/>
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
                                        </button>):(
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
