// "use client"
import "./cards.css";
import FetchCard from "@/components/quizPage/fetchCard";
import Slider from "@/components/quizPage/Slider";

export default function Cards() {
    return (
        <div className="demo">
           <div>
               <Slider/>
           </div>

            <div className="mainCard bg-white rounded-lg shadow-md overflow-hidden">

                <FetchCard/>

            </div>
        </div>
    );
}
