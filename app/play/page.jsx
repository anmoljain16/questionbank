import Tab from "@/components/header/tab";
import Questions from "@/components/Play/Questions";

export const metadata = {
    title: "Computer graphics and visualization | AQuiz",
    description: "Computer graphics and visualization Questions | AQuiz",
    keywords: "quiz, game, play, aquiz, random questions",
    openGraph: {
        title: "Computer graphics and visualization | AQuiz",
        description: "Computer graphics and visualization Questions | AQuiz",
        type: "website",
        url: `${process.env.NEXTAUTH_URL}/play`,
    },

}

export default function Play() {
    return(
        <>
            <Tab/>
            <Questions/>
        </>
    )
}
