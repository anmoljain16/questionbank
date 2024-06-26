import React from 'react';
import HeaderAccount from "@/components/header/headerAccount";
function NavBar() {
    return (
        <div className="">
            <nav className=" max-[768px]:hidden bg-white md:dark:border-gray-50 dark:bg-gray-800 shadow py-4">
                <div className="px-8  mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center ">
                            <a className="flex-shrink-0" href="/">
                            </a>
                            <div className="hidden md:block">
                                <div className="flex items-baseline ml-10 space-x-4">
                                    <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium" href="/#">
                                        Home
                                    </a>
                                    <a className="text-gray-800 dark:text-white hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium" href="/#">
                                        Gallery
                                    </a>
                                    <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium" href="/#">
                                        Content
                                    </a>
                                    <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium" href="/#">
                                        Contact
                                    </a>
                                </div>
                            </div>
                        </div>
                        <HeaderAccount/>
                        <div className="flex -mr-2 md:hidden">
                            <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                <svg width="20" height="20" fill="currentColor" className="w-8 h-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/*<div className="md:hidden">*/}
                {/*    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">*/}
                {/*        <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">*/}
                {/*            Home*/}
                {/*        </a>*/}
                {/*        <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">*/}
                {/*            Gallery*/}
                {/*        </a>*/}
                {/*        <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">*/}
                {/*            Content*/}
                {/*        </a>*/}
                {/*        <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">*/}
                {/*            Contact*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </nav>
        </div>
    );
}

export default NavBar;
