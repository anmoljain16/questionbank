"use client"
import axios from "axios";
import {useState, useEffect} from "react";
import QuestionsSlider from "@/components/QuestionsSlider";
import QuizPage from "@/components/Quiz/QuizPage";
import Tab from "@/components/header/tab";

export default function AttemptQuiz({params}) {



    const [data, setData] = useState(null);

    async function getQuiz() {
        const res = await axios.get(`/api/quiz/getquiz/${params.id}`);
        // console.log(res.data);
        return res.data;

    }


    useEffect(() => {
        getQuiz().then((res) => {
            setData(res.data);
        });
    }, [])


    return (
        <div>
            {/*{data && <QuestionsSlider ques={data.questions} topic={data.topic}  />}*/}
            <Tab/>
            {!data && <p>Loading...</p>}
            {data && <QuizPage ques={data.questions} topic={data.topic} />}
        </div>


    )
}
