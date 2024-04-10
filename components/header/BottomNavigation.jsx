"use client"

import { useEffect, useState } from 'react';
import Link from "next/link";
import SearchBar from "@/components/Search/SearchBar";
import QuizForm from "@/components/GenerateQuiz/QuizForm";

export default function BottomNavigation() {

    const [showButton, setShowButton] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [searchModal, setSearchModal] = useState(false);

    const openSearchModal = () => {
        setSearchModal(true);
    }

    const closeSearchModal = () => {
        setSearchModal(false);
    }

    const [createQuizModal, setCreateQuizModal] = useState(false);

    const openCreateQuizModal = () => {
        setCreateQuizModal(true);
    }

    const closeCreateQuizModal = () => {
        setCreateQuizModal(false);
    }


    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > prevScrollPos) {
                setShowButton(false); // Scrolling down
            } else {
                setShowButton(true); // Scrolling up
            }
            setPrevScrollPos(currentScrollPos);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);
    return (
        <>
            {showButton && (
                <div
                    className="md:hidden fixed z-50 w-full h-20 max-w-lg -translate-x-1/2  border border-gray-200 rounded-full bottom-4 left-1/2 bg-white  ">
                    <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                        <Link href={"/"}
                              className="inline-flex flex-col items-center justify-center px-5 rounded-s-full group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" strokeWidth={1.5}
                                 className="w-6 h-6 mb-1 text-black dark:text-blackgroup-hover:text-green-600 dark:group-hover:text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                            </svg>
                            <span className="sr-only">Home</span>
                        </Link>
                        <div id="tooltip-home" role="tooltip"
                             className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Home
                            <div className="tooltip-arrow"></div>
                        </div>

                        <button data-tooltip-target="tooltip-search" type="button"
                                onClick={openSearchModal}
                                className="inline-flex flex-col items-center justify-center px-5 rounded-s-full group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor"  className="w-6 h-6 mb-1 text-black dark:text-blackgroup-hover:text-green-600 dark:group-hover:text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div id="tooltip-search" role="tooltip"
                             className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-1000 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Wallet
                            <div className="tooltip-arrow"></div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Link href={"/quiz"}
                                  className="inline-flex items-center justify-center w-14 h-14 font-medium bg-green-600 rounded-full hover:bg-green-700 group focus:ring-1 focus:ring-green-400 focus:outline-none dark:focus:ring-green-500">

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="w-6 h-6 text-white">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                <span className="sr-only">New item</span>
                            </Link>
                        </div>
                        <div id="tooltip-new" role="tooltip"
                             className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Create new item
                            <div className="tooltip-arrow"></div>
                        </div>
                        <button data-tooltip-target="tooltip-newitem" type="button"
                                onClick={openCreateQuizModal}
                                className="inline-flex flex-col items-center justify-center px-5 rounded-s-full group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor"  className="w-7 h-7 mb-1 text-black dark:text-blackgroup-hover:text-green-600 dark:group-hover:text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>

                            <span className="sr-only">New Item</span>
                        </button>
                        <div id="tooltip-newitem" role="tooltip"
                             className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Settings
                            <div className="tooltip-arrow"></div>
                        </div>
                        <Link href={"/profile"} data-tooltip-target="tooltip-profile" type="button"
                                className="inline-flex flex-col items-center justify-center px-5 rounded-s-full group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6 mb-1 text-black dark:text-blackgroup-hover:text-green-600 dark:group-hover:text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                            </svg>

                            <span className="sr-only">Profile</span>
                        </Link>
                        <div id="tooltip-profile" role="tooltip"
                             className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Profile
                            <div className="tooltip-arrow"></div>
                        </div>
                    </div>
                </div>
            )}
            {searchModal && <SearchBar closeSearchModal={closeSearchModal}/>}
            {createQuizModal && <QuizForm closeCreateQuizModal={closeCreateQuizModal}/>}

        </>
    )
}
