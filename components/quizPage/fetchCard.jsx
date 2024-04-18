"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {createSlice, nanoid} from "@reduxjs/toolkit";
export default function FetchCard() {
    const [quizzes, setQuizzes] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ search, setSearch ] = useState("");

    const selectedTag = useSelector((state) => state.quizTag);
    // console.log(selectedTag.name.name)

    useEffect(()=>{

        if(selectedTag && selectedTag.name.name){
            const fetchQuizzes = async () => {
                try {
                    const response = await axios.post('/api/quiz/getquizbytag', {tag:selectedTag.name.name});
                    // console.log(response.data)
                    if(response.data.error){
                        setError(response.data.error)
                    }
                    if(response.data.data){
                        setQuizzes(response.data.data);
                    }

                } catch (e) {
                    console.log(e);
                }
            }
            fetchQuizzes().then(()=>{
            }).finally(()=>{})
        }else{
            fetchQuizzes().then(()=>{
            }).finally(()=>{})
        }

    },[selectedTag])

    const searchQuiz = async () => {
        try {
            const response = await axios.post('/api/quiz/searchquiz', {search});
            setQuizzes(response.data.data);
            // console.log(response.data)
        } catch (e) {
            console.log(e);
        }
    }
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


    useEffect(()=>{
        if(localStorage.getItem("quizzes")){
            setQuizzes(JSON.parse(localStorage.getItem("quizzes")))
        }
    },[])

    useEffect(() => {
        setLoading(true)
        fetchQuizzes().then(()=>{
        }).finally(()=>{})
        setLoading(false)
    }, []);

const fetchQuizzes = async () => {
        try {
            const response = await axios.get('/api/quiz/getquiz');
            setQuizzes(response.data.quizzes);
            if(response.data.quizzes){
                localStorage.setItem("quizzes", JSON.stringify(response.data.quizzes));
            }
            if(response.data.error){
                setError(response.data.error)
            }

        } catch (e) {
            console.log(e);
        }
}

    return (
        <>
            <div className="mainCardHeader flex justify-between items-center p-4 bg-indigo-700 text-white">
                <div className=" w-full flex justify-center px-4 max-w-full  text-right">
                    <input type="search" placeholder="Search"
                           onChange={(e) => setSearch(e.target.value)}
                           value={search}

                           className="bg-white text-black px-3 py-1 shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"/>
                </div>


            </div>
            {loading || !quizzes && (
                <div
                    className="miniCard relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <div className="p-6">
                        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Loading..
                        </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                            <span className="font-semibold">loading...</span> <br/>
                            <span className="font-semibold">loading...</span> <br/>
                        </p>
                    </div>
                    <div className="p-6 pt-0 absolute bottom-0 left-0 right-0">

                        <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button"
                        >
                            Go to Quiz
                        </button>

                    </div>
                </div>
            )}

            <div className="mainCardContent p-4">


                {quizzes && quizzes.map((quiz, index) => {
                    return (
                        <div key={index}
                             className="miniCard relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                            <div className="p-6">
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {(quiz.subject && quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1)).length > 20 ? (quiz.subject && quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1)).slice(0, 17) + "..." : (quiz.subject && quiz.subject.charAt(0).toUpperCase() + quiz.subject.slice(1))}
                                </h5>
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {(quiz.topic && quiz.topic.charAt(0).toUpperCase() + quiz.topic.slice(1)).length > 20 ? (quiz.topic && quiz.topic.charAt(0).toUpperCase() + quiz.topic.slice(1)).slice(0, 18) + "..." : (quiz.topic && quiz.topic.charAt(0).toUpperCase() + quiz.topic.slice(1))}
                                </h5>
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    <span className="font-semibold">Difficulty:</span> {quiz.difficulty} <br/>
                                    <span className="font-semibold">Total Questions:</span> {quiz.questionsCount} <br/>
                                </p>
                            </div>
                            <div className="p-6 pt-0 absolute bottom-0 left-0 right-0">
                                <Link href={`quiz/${quiz._id}`} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                                        Go to Quiz
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

        </>

    )
}
