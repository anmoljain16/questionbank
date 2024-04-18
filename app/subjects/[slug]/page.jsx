import {redirect} from "next/navigation";
import Tab from "@/components/header/tab";

async function getSubject(slug) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/quiz/subjects/${slug}`,
            {
                method: 'GET',
                cache: "no-store",
            })
        const data = await res.json()
        return data
    } catch (e) {
        return {error: true}

    }

}

export default async function Subject({params}) {
    // console.log(params.slug)
    const subject = await getSubject(params.slug)
    if(subject.error){
        redirect('/subjects')
        return
    }

    const quizzes = subject.quizzes
    // console.log(quizzes)

    return (
        <>
            <Tab/>

            {quizzes.map((quiz,index) => (
                <div key={index}>
                    <h1>{quiz.topic}</h1>
                    <p>{quiz.subject}</p>
                </div>
            ))}
        </>
    )
}
