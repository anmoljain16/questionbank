import Link from 'next/link'
import QuizButton from "@/components/GenerateQuiz/QuizButton"
import SearchButton from '@/components/Search/SearchButton'
export default function Tab() {
    return (
        <div
            className="mt-4 flex items-center  -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:text-gray-800 ">
            <Link rel="noopener noreferrer" href={'/'}
               className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b transition duration-1000 ease-in-out focus:border-b-0 focus:rounded-t-lg focus:border  dark:border-gray-600 dark:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>


                <span>Home</span>
            </Link>
            <Link rel="noopener noreferrer" href={'/quiz'}
               className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b focus:border-b-0 focus:rounded-t-lg focus:border dark:border-gray-600 dark:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span>Quizzes</span>
            </Link>
            
            <SearchButton/>
            <QuizButton/>
            <Link rel="noopener noreferrer" href={`/profile`}
               className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b focus:border-b-0 focus:rounded-t-lg focus:border  dark:border-gray-600 dark:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                </svg>

                <span>Profile</span>
            </Link>
            {/*<a rel="noopener noreferrer" href="#"*/}
            {/*   className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b dark:border-gray-600 dark:text-gray-600">*/}
            {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"*/}
            {/*         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">*/}
            {/*        <circle cx="12" cy="12" r="10"></circle>*/}
            {/*        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>*/}
            {/*    </svg>*/}
            {/*    <span>Consectetur</span>*/}
            {/*</a>*/}
        </div>
    )
}
