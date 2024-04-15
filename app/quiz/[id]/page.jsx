"use client"
import axios from "axios";
import {useState, useEffect} from "react";
import QuestionsSlider from "@/components/QuestionsSlider";
import QuizPage from "@/components/Quiz/QuizPage";
import Tab from "@/components/header/tab";
import MeaningAccordion from "@/components/Quiz/MeaningAccordion";
import Link from "next/link";

export default function AttemptQuiz({params}) {



    const [data, setData] = useState(null);
    const [meanings, setMeanings] = useState(null);

    async function getQuiz() {
        const res = await axios.get(`/api/quiz/getquiz/${params.id}`);
        return res.data;

    }
    useEffect(() => {
        const handleWordDoubleClick = () => {
            const selection = window.getSelection();
            // console.log(selection)
            if (selection && selection.toString()) {
                const selectedWord = selection.toString().trim();
                // Fetch data from the API
                fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // console.log(data[0]?.meanings[0]);
                        setMeanings(data[0]);

                    })
                    .catch(error => {
                        // console.error('There was a problem with the fetch operation:', error);
                        setMeanings({notFound: true});
                        setTimeout(()=>{setMeanings(null)}, 1500);
                    });
            }
        };

        document.addEventListener("selectionchange", handleWordDoubleClick);
        // document.addEventListener("selectionchange", () => {
        //     console.log(document.getSelection().toString());
        // });
        return () => {
            document.removeEventListener("selectionchange", handleWordDoubleClick);
        };
    }, []);





    useEffect(() => {
        getQuiz().then((res) => {
            setData(res.data);
        });
    }, [])


    return (
        <div>
            {/*{data && <QuestionsSlider ques={data.questions} topic={data.topic}  />}*/}
            {/*<Tab/>*/}

            {!data && <p>Loading...</p>}
            {data && <QuizPage ques={data.questions} id={params.id} topic={data.topic} subject={data.subject} setMeanings={setMeanings} />}
            {(!meanings && data) && (
                <div className="container">
                    {/*<p className="text-center text-2xl font-semibold max-[769px]:hidden mt-8">Double click on any word to get its meaning</p>*/}
                    <p className={"text-center max-[769px]:text-xs text-lg mt-8 font-normal"}>Select any word to get its meaning</p>
                </div>

            )}
            {meanings && <MeaningAccordion meanings={meanings} />}

        </div>


    )
}
