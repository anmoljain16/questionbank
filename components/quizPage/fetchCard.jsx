"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function FetchCard() {

    const [quizzes, setQuizzes] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);


    useEffect(() => {
        setLoading(true)
        axios.get("/api/quiz/getquiz").then((res) => {
            setQuizzes(res.data.quizzes);
            setLoading(false)
        });
        setLoading(false)
    }, []);
    // console.log({loading, quizzes});

    return (
        <>
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
            ) }
            {quizzes && quizzes.map((quiz,index) => {
                return (
                    <div key={index}
                        className="miniCard relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {quiz.topic && quiz.topic.charAt(0).toUpperCase() + quiz.topic.slice(1)}
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                <span className="font-semibold">Difficulty:</span> {quiz.difficulty} <br/>
                                <span className="font-semibold">Total Questions:</span> {quiz.questionsCount} <br/>
                            </p>
                        </div>
                        <div className="p-6 pt-0 absolute bottom-0 left-0 right-0">
                            <Link href={`quiz/${quiz._id}`}>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button"
                                >
                                    Go to Quiz
                                </button>
                            </Link>
                        </div>
                    </div>
                );
            })}

        </>

    )
}
