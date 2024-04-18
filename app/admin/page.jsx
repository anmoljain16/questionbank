"use client"
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";
import {getTags} from "@/app/api/ai/quiz/createquiz/getTags";
import {log} from "next/dist/server/typescript/utils";

export default function Admin(){
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(search.length === 0){
                fetchQuizzes().then(r=>r).catch(e=>e)
            }
            if (search.length > 0) {
                searchQuiz().then(()=>{
                }).finally(()=>{
                });
            }
        }, 400)

        return () => clearTimeout(delayDebounceFn)
    }, [search]);

    const searchQuiz = async () => {
        try {
            const response = await axios.post('/api/quiz/searchquiz', {search});
            setQuizzes(response.data.data);
            // console.log(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    const fetchQuizzes = async ()=>{
        try{
            const res = await axios.get("/api/admin/getquizzes")

            if(res.data.error){
                setError(res.data.error)
                return
            }
            setQuizzes(res.data.quizzes)
        }catch(e){
            setError(e.message)
        }
    }

    const deleteQuiz = async (id)=>{
        try{
            const res = await axios.delete(`/api/admin/deletequiz/${id}`)
            console.log(res.data)
            if(res.data.error){
                setError(res.data.error)
                return
            }
            setMessage(res.data.message)

            if (search.length > 0) {
                await searchQuiz()
            }else{
                await fetchQuizzes()
            }



        }catch(e){
            setError(e.message)
        }
    }

    const getTag = async (id)=>{
        let subject = "";
        let topic = "";
        let questions = "";
        try{
            const res = await axios.get(`/api/quiz/getquiz/${id}`)
            // console.log(res.data)
            if(res.data.error){
                setError(res.data.error)
                return
            }
            subject = res.data.data.subject;
            topic = res.data.data.topic;
            questions = JSON.stringify(res.data.data.questions)

        }catch(e){
            console.log(e)
        }

        const tags = await getTags({subject, topic, questions})

        console.log(tags)

        const response = await axios.post(`/api/quiz/tags/createtags`, {tags,id})
        console.log(response.data)


    }

    const approveQuiz = async (id)=> {
        try {
            const res = await axios.put(`/api/admin/approvequiz/${id}`)
            if (res.data.error) {
                setError(res.data.error)
            } else {
                setMessage(res.data.message)
            }
        } catch (e) {
            setError(e.message)
        }
    }

    useEffect(()=>{
        fetchQuizzes().then(r=>r).catch(e=>e)
    },[])

    if(error){
        return <div className="text-red-500 text-center">{error} Go to <Link href={"/"} className={"text-blue-800 underline"}>Home</Link>  </div>
    }


    return(
        <>
            {!error && (
                <section className="py-1 bg-blueGray-50">

                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                        {message && (
                            <div className="bg-green-500 text-white text-center py-2">{message}</div>
                        )}
                        {/*Home  with good css some margin bottom and make use of good colors*/}
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 drop-shadow-md rounded">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">Admin Dashboard</h3>
                                    </div>
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                        <Link href={"/"} className={"text-blue-800 underline"}>Home</Link>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">Quiz Table</h3>
                                    </div>
                                    {/*search for quiz*/}
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                        <input type="search" placeholder="Search "
                                               onChange={(e) => setSearch(e.target.value)}
                                               className="bg-white px-3 py-1 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
                                    </div>
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                        <h3 className=" text-base text-blueGray-700">Total
                                            Quizzes: {quizzes.length}</h3>
                                        {/*<button*/}
                                        {/*    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
                                        {/*    type="button">See all*/}
                                        {/*</button>*/}
                                    </div>
                                </div>
                            </div>

                            <div className="block w-full overflow-x-auto">
                                <table className="items-center bg-transparent w-full border-collapse">
                                    <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Subject
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Topic</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">User

                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Difficult
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Approve
                                        </th>
                                        <th className={"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"}>
                                            Delete
                                        </th>
                                        <th className={"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"}>
                                            Get Tag
                                        </th>

                                    </tr>
                                    </thead>

                                    <tbody>

                                    {quizzes.length > 0 && quizzes.map((quiz, index) => (
                                        <tr key={index}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{quiz.subject}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{quiz.topic}</td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{quiz.isAnonymous ? "Anonymous" : "User Created"}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {quiz.difficulty}
                                            </td>

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-center text-xs whitespace-nowrap p-4">
                                                {quiz.isApproved ? "Approved" : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth={1.5} stroke="currentColor"
                                                         className="w-5 h-5 cursor-pointer text-green-600  hover:scale-110 duration-300">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                    </svg>

                                                )}
                                            </td>

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor"
                                                     className="w-5 h-5 cursor-pointer text-red-600 hover:scale-110 duration-300"
                                                     onClick={() => {
                                                         deleteQuiz(quiz._id).then(() => {
                                                         })
                                                     }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                </svg>

                                                {/*<button className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Delete</button>*/}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor"
                                                     className="w-5 h-5 cursor-pointer text-fuchsia-600 hover:scale-110 duration-100"
                                                     onClick={() => {
                                                         getTag( quiz._id).then(() => {
                                                         }).catch(e =>{
                                                             console.log(e)})
                                                     }}
                                                >

                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M12 4.5v15m7.5-7.5h-15"/>
                                                </svg>

                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                </section>
            )}
        </>
    )
}
