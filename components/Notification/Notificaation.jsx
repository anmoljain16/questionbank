"use client"
import React, { useState } from 'react';

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);

    const notificationHandler = (open) => {
        setIsOpen(open);
    };

    return (
        <div className="py-8 z-50">
            <button onClick={() => notificationHandler(true)} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white">Open Modal</button>
            {isOpen && (
                <div className="w-full h-full z-50 bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                    <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
                        <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                            <div className="flex items-center justify-between">
                                <p tabIndex="0" className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Notifications</p>
                                <button role="button" aria-label="close modal" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer" onClick={() => notificationHandler(false)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 6L18 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            {/* Remaining notification items */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
