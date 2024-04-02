// "use client"
import "./cards.css";
import FetchCard from "@/components/quizPage/fetchCard";
export default function Cards(){
    return(
        <div className="demo">
            {/*<h2 className="penName">Quizzes</h2>*/}
            <div className="mainCard">
                <div className="mainCardHeader"></div>
                <div className="mainCardContent">
                    <FetchCard/>

                </div>
            </div>
        </div>
    )
}
