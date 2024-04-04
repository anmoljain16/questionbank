"use client"
import "@/components/quizPage/cards.css"
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import {signOut} from "next-auth/react";

export default function UserCard(){
    const [user, setUser] = useState(null)



    useEffect(()=>{
        // console.log("asjhfkjas");
        axios.get("/api/profile").then((res)=>{
            setUser(res.data.user)
            console.log(res.data)
        })
    },[])
    return(
        <div className="demo">
            {/*<h2 className="penName">Quizzes</h2>*/}
            <div className="mainCard">
                <div className="mainCardHeader"></div>
                <div className="mainCardContent">
                {user ? (
                    <div
                        className="miniCard relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                        <div className="p-6">
                            <h5 className=" mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {user.name}
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                <span className="font-semibold">{user.email}</span> <br/>
                                <span className="font-semibold">Total Questions:</span> <br/>
                            </p>
                        </div>
                        <div className="p-6 pt-0 absolute bottom-0 left-0 right-0">
                            <Link href={`quiz`}>
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button"
                                >
                                    Go to Quiz
                                </button>
                            </Link>
                        </div>
                    </div>
                ):"Loading..."}
                </div>
                <button
                    onClick={()=>{signOut()}}
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button">Signout</button>
            </div>
        </div>
    )
}
