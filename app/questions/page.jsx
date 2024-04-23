import Tab from "@/components/header/tab";
import {Link} from "next-view-transitions";

async function getQuestions(page) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/questions/getquestionbyid/`,
            {
                method: 'GET',
            })
        return await res.json()
    } catch (e) {
        return {message: e.message, error: true};
    }
}

export const metadata = {
    title: "Recent Questions | AQuiz",
    description: "Explore a world of engaging quizzes on diverse topics! " +
        "Create, share, and discover captivating quizzes effortlessly with our intuitive platform. " +
        "Start your A Quiz today!",
    keywords: ["quiz", "quizzes", "AI", "AQuiz", "Questions"],
    url: "https://questionbank.anmoljain.tech/questions",
    type: "website",
    siteName: "AQuiz",
    creator: "Anmol Jain",
    openGraph: {
        title: "Recent Questions | AQuiz",
        description: "Explore a world of engaging quizzes on diverse topics! " +
            "Create, share, and discover captivating quizzes effortlessly with our intuitive platform. " +
            "Start your A Quiz today!",
        url: "https://questionbank.anmoljain.tech/questions",
        type: "website",
        siteName: "AQuiz",
        creator: "Anmol Jain",
    },
};


export default async function Questions() {
    const response = await getQuestions(1);
    if (response.error) {
        return <div>{response.message}</div>
    }

    const questions = response.questions;

    return (
        <>
            <Tab/>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {questions.map((question, index) => (
                        <div key={index} className="bg-white shadow-md p-4">
                            <Link href={`/questions/${question._id}`}>
                                <>
                                    <h2 className="text-xl font-bold">{question.subject} | {question.topic}</h2>
                                    <p>{question.question}</p>
                                    <p>{question.correct}</p>
                                    <p>{question.explanation}</p>
                                </>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
