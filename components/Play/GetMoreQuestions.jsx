"use client"
import React, {useState} from 'react';
import ScoreStats from "@/components/Play/ScoreStats";
import {useRouter} from "next/navigation";
import {resetScore} from "@/app/redux/slice";
import {useDispatch} from "react-redux";

export default function GetMoreQuestions() {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const dispatch = useDispatch();

    const resetScoreHandler = () => {
        dispatch(resetScore());
        localStorage.removeItem("score");
        window.scrollTo({top: 0, behavior: 'smooth'});

        handleClick();
        // window.scrollTo({ top: 0, behavior: 'smooth'});
    }

    const handleClick = () => {
        if (!isDisabled) {
            setIsDisabled(true);
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 1) {
                        clearInterval(interval);
                        setIsDisabled(false);
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
            setTimeout(() => {
                clearInterval(interval);
                setCountdown(5);
                setIsDisabled(false);
            }, 5000);
        }
        router.refresh();
        window.scrollTo(0, 120);
    };

    return (
        <div
            className="container my-4 mb-10 cursor-default max-w-4xl w-[96%] md:px-10 px-3.5 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-50">
            <div className="my-3">
                <span className="md:text-xl">Current Score : <ScoreStats/></span>
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={handleClick}
                    disabled={isDisabled}
                    className={`px-2 py-1 text-sm md:text-sm rounded ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'dark:bg-fuchsia-500 dark:text-gray-50 cursor-pointer'}`}>
                    {isDisabled ? `More Questions (${countdown})` : 'More Questions'}
                </button>
                <span
                    onClick={() => {
                        resetScoreHandler()

                    }}
                    className="px-2 py-1 text-xs md:text-sm rounded dark:bg-red-500 dark:text-gray-50 cursor-pointer">Reset and Get More</span>
            </div>

        </div>
    );
}
