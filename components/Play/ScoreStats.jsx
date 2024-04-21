"use client"
import {useSelector} from "react-redux";

export default function ScoreStats() {

    const score = parseInt(useSelector((state) => state.score));


    return (
        <>
            <span className={`${score >= 0 ? " text-green-500" : "text-red-500"} text-base`}>{score}</span>

        </>
    )
}
