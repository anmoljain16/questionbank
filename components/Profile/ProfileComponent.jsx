"use client"

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import {signIn, signOut, useSession} from "next-auth/react";

function ProfileComponent() {
    const session = useSession()
    // console.log(session)
   const [user, setUser] = useState(null)
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(true)



    useEffect(() => {
        // Check if user data is stored in localStorage
        const user = localStorage.getItem("User")
        const quizzes = localStorage.getItem("UserQuizzes")

        // If user data is found, update the user state
        if (user) {
            setUser(JSON.parse(user))
        }

        // If quizzes data is found, update the quizzes state
        if (quizzes) {
            setQuizzes(JSON.parse(quizzes))
        }
    }, [])

    useEffect(() => {

        setLoading(true)

        axios.get("/api/profile")
            .then((res) => {
                // console.log(res.data)
                // Set user and quizzes states with data from API response
                setUser(res.data.user)
                setQuizzes(res.data.quizzes)
                if(res.data.user && res.data.quizzes){
                    // Update localStorage with the latest user and quizzes data
                    localStorage.setItem("User", JSON.stringify(res.data.user))
                    localStorage.setItem("UserQuizzes", JSON.stringify(res.data.quizzes))
                }else{
                    // If user or quizzes data is not found, remove the data from localStorage
                    localStorage.removeItem("User")
                    localStorage.removeItem("UserQuizzes")
                }



            })
            .finally(() => {
                setLoading(false)

            })
    }, [])

    if(session.status === "unauthenticated"){
        signIn('google')
        return <div>Redirecting...</div>
    }


    if(loading && !user && quizzes.length === 0){
        return <div>Loading...</div>
    }


    function timeAgo(timestamp) {
        const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
            return interval + " year" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + " month" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + " day" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
        }
        return Math.floor(seconds) + " second" + (Math.floor(seconds) === 1 ? "" : "s") + " ago";
    }

    return (
        <div>
            {
                user && (
                    <div className="container mx-auto my-32">
                        <div>
                            <div
                                className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">

                                <div className="flex justify-center">
                                    <Image
                                        src={user.avatar || "https://avatars0.githubusercontent.com/u/35900628?v=4"}
                                        width={100}
                                        height={100}
                                        quality={100} // {number 1-100}
                                        priority={true} // {boolean}
                                        alt=""
                                        className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                                    />
                                </div>
                                {/*<div className="flex justify-between w-full ml-12 ">*/}
                                {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer"*/}
                                {/*         fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                                {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}*/}
                                {/*              d="M6 18L18 6M6 6l12 12"/>*/}
                                {/*    </svg>*/}
                                {/*</div>*/}

                                <div className="mt-16">
                                    <h1 className="font-bold text-center text-3xl text-gray-900">{user.name}</h1>
                                    {/*<p className="text-center text-sm text-gray-400 font-medium">UI Components Factory</p>*/}
                                    {/*<div className="my-5 px-6">*/}
                                    {/*    <a href="#" className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">*/}
                                    {/*        Connect with <span className="font-bold">@pantazisoft</span>*/}
                                    {/*    </a>*/}
                                    {/*</div>*/}
                                    <div className="flex justify-between items-center my-5 px-6">
                                        <h2 className="text-gray-500 hover:text-gray-900  rounded transition duration-150 cursor-default ease-in font-medium text-sm text-center w-full py-3">{quizzes.length} Quizzes </h2>
                                        <h2 className="text-gray-500 hover:text-gray-900  rounded cursor-default transition duration-150 ease-in font-medium text-sm text-center w-full py-3">{(quizzes.length) * 10} Questions</h2>
                                        {/*<a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>*/}
                                        {/*<a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</a>*/}
                                    </div>

                                    <div className="w-full">
                                        <h3 className="font-medium text-gray-900 text-left px-6">Your Quizzes</h3>
                                        <div className="mt-5 w-full flex flex-col  overflow-hidden text-sm  ">
                                            {quizzes.map((quiz, index) => (
                                                <div key={index}
                                                     className="w-full border-t border-gray-100 text-gray-600  py-4 pl-6 pr-3 mr-5 flex  hover:bg-gray-100 transition duration-150">
                                                    {/* logout svg on the top right corner of the div */}

                                                    <Image src={user.avatar} width={24} height={24} alt=""
                                                           className="rounded-full h-6 shadow-md inline-block mr-2"/>
                                                    <div className="flex justify-between w-full">
                                                        {/*<span className="font-medium">{quiz.topic}</span> its first letter should be capital */}
                                                        <Link href={`/quiz/${quiz._id}`}
                                                              className="font-medium text-base">{quiz.topic.charAt(0).toUpperCase() + quiz.topic.slice(1)}</Link>
                                                        <span
                                                            className="text-gray-500 text-xs ">{timeAgo(quiz.createdAt)}</span>

                                                        {/*    delete button with tailwind css */}
                                                        <button onClick={() => {
                                                            axios.delete(`/api/quiz/getquiz/${quiz._id}`)
                                                                .then((res) => {
                                                                    if (res.data.error) {
                                                                        return alert(res.data.error)
                                                                    }
                                                                    const newQuizzes = quizzes.filter((q) => q._id !== quiz._id)
                                                                    setQuizzes(newQuizzes)
                                                                    localStorage.setItem("UserQuizzes", JSON.stringify(newQuizzes))
                                                                })
                                                        }}
                                                                className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded-full">Delete
                                                        </button>


                                                    </div>

                                                </div>
                                            ))}

                                        </div>

                                    </div>

                                </div>

                            </div>
                            <button onClick={() => signOut().then(() => {
                                localStorage.removeItem("User");
                                localStorage.removeItem("UserQuizzes")
                            }).finally(() => {
                                setLoggedIn(false)
                                window.location.href = "/"
                            })}
                                    className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded-full ml-32 mt-10">
                                Logout
                            </button>
                        </div>
                    </div>

                )
            } {/*    logout button at the bottom right*/}

        </div>
    );

}

export default ProfileComponent;
