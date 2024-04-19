"use client"
import React, {useEffect, useRef, useState} from 'react';
import CountUp from 'react-countup'; // Importing CountUp from react-countup library

const Card = () => {
    const [cardOpen, setCardOpen] = useState(false);
    const totalRef = useRef(null);
    const cardRef = useRef(null);
    const deviceRefs = useRef([]);

    const cardData = {
        countUp: function (target, startVal, endVal, decimals, duration) {
            // Using CountUp component provided by react-countup library
            return <CountUp start={startVal || 0} end={endVal} decimals={decimals || 0} duration={duration || 2}>
                {({countUpRef}) => {
                    cardRef.current = countUpRef; // Assigning countUpRef to cardRef.current
                    return <span ref={target}/>;
                }}
            </CountUp>;
        },
        sessions: [
            {
                label: "Phone",
                size: 60,
                color: "indigo-600"
            },
            {
                label: "Tablet",
                size: 30,
                color: "indigo-400"
            },
            {
                label: "Desktop",
                size: 10,
                color: "indigo-200"
            }
        ]
    };

    useEffect(() => {
        if (cardOpen) {
            cardData.countUp(totalRef.current, 0, 11602, null, 0.8);
            cardData.sessions.forEach((el, i) => {
                cardData.countUp(deviceRefs.current[i].current, 0, cardData.sessions[i].size, null, 1.6);
            });
        }
    }, [cardOpen]);

    useEffect(() => {
        setTimeout(() => {
            setCardOpen(true);
        }, 100);
    }, []);

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-800 text-gray-500 rounded shadow-xl py-5 px-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                <div className="flex w-full">
                    <h3 className="text-lg font-semibold leading-tight flex-1">TOTAL SESSIONS</h3>
                    <div className="relative h-5 leading-none">
                        <button className="text-xl text-gray-500 hover:text-gray-300 h-6 focus:outline-none"
                                onClick={() => setCardOpen(!cardOpen)}>
                            <i className={`mdi mdi-chevron-${cardOpen ? 'up' : 'down'}`}></i>
                        </button>
                    </div>
                </div>
                <div className="relative overflow-hidden transition-all duration-500" ref={cardRef} style={{
                    maxHeight: `${cardOpen ? cardRef.current.scrollHeight : 0}px`,
                    opacity: `${cardOpen ? 1 : 0}`
                }}>
                    <div>
                        <div className="pb-4 lg:pb-6">
                            <h4 className="text-2xl lg:text-3xl text-white font-semibold leading-tight inline-block"
                                ref={totalRef}>0</h4>
                        </div>
                        <div className="pb-4 lg:pb-6">
                            <div className={cardOpen ? 'w-full' : 'w-0'}>
                                {cardData.sessions.map((item, index) => (
                                    <div className={`h-full bg-${item.color}`} style={{width: `${item.size}%`}}
                                         key={index}></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex -mx-4">
                            {cardData.sessions.map((item, index) => {
                                deviceRefs.current[index] = useRef(null);
                                return (
                                    <div className={`w-1/3 px-4 ${index !== 0 ? 'border-l border-gray-700' : ''}`}
                                         key={index}>
                                        <div className="text-sm">
                                            <span
                                                className={`inline-block w-2 h-2 rounded-full mr-1 align-middle bg-${item.color}`}>&nbsp;</span>
                                            <span className="align-middle">{item.label}</span>
                                        </div>
                                        <div className="font-medium text-lg text-white"
                                             ref={deviceRefs.current[index]}>0%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

