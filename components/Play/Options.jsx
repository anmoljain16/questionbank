"use client"
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addScore} from "@/app/redux/slice";

export default function Options({options, id, correct, explanation}) {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered

    const handleOptionClick = (option) => {
        if (!isAnswered) { // Check if the question is not already answered
            setSelectedOption(option);
            setIsCorrect(option === correct);
            // const score = parseInt(localStorage.getItem("score"));
            const scoreChange = option === correct ? 1 : -2;
            // const scoreChange = option === correct ? score + 1 : score - 2;
            dispatch(addScore(scoreChange));
            setIsAnswered(true); // Mark the question as answered

        }
    };

    return (
        <>
            <ul className="mt-4">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={`flex items-center text-sm cursor-pointer justify-between p-2 mt-2 border rounded-lg ${
                            selectedOption === option
                                ? isCorrect
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => handleOptionClick(option)}
                    >
                        <span>{option}</span>
                        {selectedOption !== null && selectedOption === option && (
                            <span className="text-sm ml-2">
                                {isCorrect ? "✔" : "❌"}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
            {selectedOption !== null && (
                <div className="mt-4">
                    <h6 className="text-sm text-green-500  uppercase">{correct}</h6>
                    <span className="text-sm">{explanation}</span>
                </div>
            )}
        </>
    );
}
