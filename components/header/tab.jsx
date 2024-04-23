import {Link} from 'next-view-transitions'
import QuizButton from "@/components/GenerateQuiz/QuizButton"
import BottomNavigation from "@/components/header/BottomNavigation";

export default function Tab() {
    return (
        <>

            {/*<Badge/>*/}
            <div
                className="mt-4 max-[767px]:hidden flex items-center  overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap  dark:text-gray-800 ">
                <Link rel="noopener noreferrer" href={'/'}
                      className="flex items-center hover:scale-105 flex-shrink-0 px-5 py-3 space-x-2 border-b transition duration-100 ease-in-out focus:border-b-0 focus:rounded-t-lg focus:border  dark:border-gray-600 dark:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                    </svg>


                    <span>Home</span>
                </Link>
                <Link rel="noopener noreferrer" href={'/quiz'}
                      className="flex items-center flex-shrink-0 hover:scale-105 duration-100 px-5 py-3 space-x-2 border-b focus:border-b-0 focus:rounded-t-lg focus:border dark:border-gray-600 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span>Quizzes</span>
                </Link>
                <Link rel="noopener noreferrer" href={'/play'}
                      className="flex items-center flex-shrink-0 px-5 py-3 hover:scale-105 duration-100  space-x-2 border-b focus:border-b-0 focus:rounded-t-lg focus:border dark:border-gray-600 dark:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"/>
                    </svg>

                    <span>Play</span>
                </Link>
                {/*<SearchButton/>*/}
                <QuizButton/>
                <Link rel="noopener noreferrer" href={`/profile`}
                      className="flex items-center flex-shrink-0 px-5 py-3 hover:scale-105 duration-100  space-x-2 border-b focus:border-b-0 focus:rounded-t-lg focus:border  dark:border-gray-600 dark:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                    </svg>

                    <span>Profile</span>
                </Link>

            </div>
            <BottomNavigation/>

        </>
    )
}
