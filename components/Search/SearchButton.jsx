"use client"

import { useState } from "react"
import SearchBar from "./SearchBar";

export default function SearchButton() {
    const [searchModal, setSearchModal] = useState(false);

    const openSearchModal = () => {
        setSearchModal(true);
    }

    const closeSearchModal = () => {
        setSearchModal(false);
    }
    

    return(<>

        
            <button rel="noopener noreferrer" 
onClick={openSearchModal}
               className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b focus:border-b-0 focus:rounded-t-lg focus:border  dark:border-gray-600 dark:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>


                <span>Search</span>
            </button>
                        {searchModal && <SearchBar closeSearchModal={closeSearchModal}/>}
</>
    )
}