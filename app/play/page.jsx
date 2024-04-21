import Tab from "@/components/header/tab";
import Question from "@/components/Play/Question";

export const metadata = {
    title: "Play | AQuiz",
    description: "Play a quiz game | AQuiz",
    keywords: "quiz, game, play, aquiz, random questions",
    openGraph: {
        title: "Play | AQuiz",
        description: "Play a quiz game | AQuiz",
        type: "website",
        url: `${process.env.NEXTAUTH_URL}/play`,
    },

}

export default function Play() {
    return(
        <>
            <Tab/>
           <Question/>
        </>
    )
}
