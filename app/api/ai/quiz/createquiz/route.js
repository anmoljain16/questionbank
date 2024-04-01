import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getQuestions} from "@/app/api/ai/quiz/createquiz/gemini";
import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";

export async function handler(req) {
    const session = await getServerSession({ req, authOptions});
    console.log(session)
    const user = (session && session.user) ? session.user : null;
    console.log(user ?? "No user found");
    const data = await req.json();

return NextResponse.json({
    mess:"Hello"
});
    try{
        let questions = await getQuestions(data)
        if(!questions){
            return NextResponse.json({
                data: null,
                error: "Error in generating questions. Please try again."
            });
        }

        return NextResponse.json({
            subject: data.subject,
            topic: data.topic,
            questions: questions,
            createdBy: user.name || "Anonymous",
            difficulty: data.difficulty,
            questionsCount: parseInt(data.questionsCount) || 10,
            tags: [],
            error: null
        });
    }catch (e) {
        console.log(e)
        return NextResponse.json({
            data: null,
            error: "Error in generating questions. Please try again."
        });
    }


    // console.log(questions)



}

export { handler as POST };
