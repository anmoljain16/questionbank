"use client"

import{addQuizTag} from "@/app/redux/slice";
import {useState} from "react";
import {useDispatch} from "react-redux";

export default function SliderTags({subjects}) {
    const [tag, setTag] = useState("")
    // console.log(tag)
    const dispatch = useDispatch();

    const setTagfunction = (id) => {
        setTag(id)
        if(tag === id){
            setTag("")
            dispatch(addQuizTag({name: null}))
            return
        }

        dispatch(addQuizTag({name: id}))
    }


    return(
        <>
            <div
                className={`${!tag ? "bg-green-300 text-gray-800":"bg-gray-800 text-white" } px-2 pt-0.5 pb-1 rounded-md cursor-pointer font-normal focus:text-black font-sans`}>
                <div
                    onClick={() => setTagfunction(null)}
                    className="text-center text-sm font-semibold ">
                    All
                </div>

            </div>
        {subjects.map((subject, index) => (
                <div key={index}
                     className={`${tag===subject._id? "bg-green-300 text-gray-800":"bg-gray-800 text-white" }  px-2 pt-0.5 pb-1 rounded-md cursor-pointer font-normal focus:text-black font-sans`}>
                    <div
                        onClick={() => setTagfunction(subject._id)}
                        className="text-center text-sm font-semibold ">
                        {`${(subject._id.split(" ").length > 1) ? (subject._id.split(" ")).join('') : subject._id }(${subject.quizCount})`}
                    </div>

                </div>
            ))}
        </>
    )
}
