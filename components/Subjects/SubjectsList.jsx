import "./SubjectsList.css";
import {Link} from 'next-view-transitions'
import {redirect} from "next/navigation";

async function fetchSubjects() {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/quiz/subjects`,
            {
                cache: "no-store",
                method: 'GET'
            }
        );
        return res.json();
    } catch (e) {
        return {error: true}
    }
}

export default async function SubjectsList() {
    const subjects = await fetchSubjects();
    // console.log(subjects);
    if (subjects.error) {
        return redirect('/')
    }
    return (
        <main>
            <div className="demo">
                <div className="mainCard w-[90%] bg-gray-50 rounded-lg shadow-md overflow-hidden">
                    <div className="mainCardHeader flex justify-between items-center p-4 bg-indigo-700 text-white">

                    </div>
                    {subjects.data.map((subject, index) => (
                            <Link
                                className={` relative hover:scale-105  min-h-[55px] duration-300 group inline-block mx-2 p-[5px]  flex-col mt-6 text-gray-700  bg-white shadow-md bg-clip-border rounded-md w-[95%] md:w-96 py-3 md:h-[65px] miniCard`}
                                key={index}
                                href={`/subjects/${(subject._id).toLowerCase()}`}>
                                <div className="flex group-hover:text-black duration-300 justify-between items-center">
                                    <div
                                        className="md:text-lg text-sm group-hover:font-semibold  font-medium ml-5">{subject._id}</div>
                                    <div
                                        className="md:text-md text-xs group-hover:hidden   text-gray-500">{subject.total} Quizzes
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-6 w-6 text-gray-500 hidden group-hover:block" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 5l7 7-7 7"/>
                                    </svg>

                                </div>
                            </Link>
                        )
                    )}

                </div>
            </div>
        </main>
    );
}
