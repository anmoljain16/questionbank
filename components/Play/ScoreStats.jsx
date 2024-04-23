"use client"
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export default function ScoreStats() {
    const [prevScore, setPrevScore] = useState(null);
    const score = parseInt(useSelector((state) => state.score));

    useEffect(() => {
        setPrevScore(score);
    }, [score]);

    return (
        <>
            <span className={`text-base ${score >= 0 ? "text-green-500" : "text-red-500"} `}>
                {score}
            </span>
        </>
    )
}
