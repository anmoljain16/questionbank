"use client"

import {useState} from "react";
import {signOut,useSession,signIn} from "next-auth/react";
import Image from "next/image";

export default function HeaderAccount() {
    const [toggleOptions, setToggleOptions] = useState(false)
    const {data:session} = useSession();
    // console.log(session?.user?.image)
    return (
        <div className="block">
            <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                    <div className="relative inline-block text-left">
                        <div>
                            <button type="button"
                                    className="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium  text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-transparent transition duration-200"
                                    id="options-menu"
                                    onClick={() => setToggleOptions(!toggleOptions)}
                            >
                                {session?.user?.image ?
                                    (<Image
                                        src={session.user.image}
                                        alt={`Profile Image of ${session.user.name}`}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                        priority
                                    />)
                                    :
                                    (<svg width="20" fill="white" height="20" className="text-gray-800"
                                          viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => signIn()}
                                    >
                                        <path
                                            d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                                    </svg>)
                                }
                            </button>
                        </div>
                        {toggleOptions && <div
                            className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical"
                                 aria-labelledby="options-menu">
                                <a href="#"
                                   className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                                   role="menuitem">
                                                    <span className="flex flex-col">
                                                        <span>
                                                            Settings
                                                        </span>
                                                    </span>
                                </a>
                                <a href="#"
                                   className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                                   role="menuitem">
                                                    <span className="flex flex-col">
                                                        <span>
                                                            Account
                                                        </span>
                                                    </span>
                                </a>
                                <a
                                   className="block cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                                   role="menuitem"
                                   onClick={()=>{signOut()}}

                                >
                                                    <span className="flex flex-col">
                                                        <span>
                                                            Logout
                                                        </span>
                                                    </span>
                                </a>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}
