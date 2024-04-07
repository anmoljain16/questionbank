// "use client"
import "./cards.css";
import FetchCard from "@/components/quizPage/fetchCard";

export default function Cards() {
    return (
        <div className="demo">
            <div className="mainCard bg-white rounded-lg shadow-md overflow-hidden">
                <div className="mainCardHeader flex justify-between items-center p-4 bg-indigo-700 text-white">

                    {/*<div className="flex items-center">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Search..."*/}
                    {/*        className="px-3 py-2 ml-20 rounded-l-md border-none text-black placeholder-black focus:outline-none focus:bg-white"*/}
                    {/*    />*/}
                    {/*    <select className="px-3 py-2  absolute right-5 mr-20 rounded-r-md border-none  text-gray-800 focus:outline-none focus:bg-white">*/}
                    {/*        <option value="">Filter Option 1</option>*/}
                    {/*        <option value="">Filter Option 2</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    {/* Add any other content for the header */}
                </div>
                <div className="mainCardContent p-4">
                    <FetchCard />
                </div>
            </div>
        </div>
    );
}
