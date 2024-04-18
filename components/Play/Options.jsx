"use client"
import React, { useState } from "react";

export default function Options({ options, correct, explanation }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsCorrect(option === correct);
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
            {/* Display explanation if an option is selected */}
            {selectedOption !== null && (
                <div className="mt-4">
                    <span className="text-sm">{explanation}</span>
                </div>
            )}
        </>
    );
}
