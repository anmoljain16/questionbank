import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getQuestions} from "@/app/api/ai/quiz/createquiz/gemini";
import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";

export async function handler(req) {
    let res = NextResponse.next()

    const session = await getServerSession({ req, res,authOptions});

    // console.log(session)
    const sessionData = (session && session.user) ? session.user : null;
    // const user = (sessionData.name ?? "Anonymous");
    const data = await req.json();
    // console.log(user)

    let questions = null;
    try{
         questions = await getQuestions(data)
        // console.log(typeof questions)
        if(!questions){
            return NextResponse.json({
                data: null,
                error: "Error in generating questions. Please try again."
            });
        }


    }catch (e) {
        console.log(e)
        return NextResponse.json({
            data: null,
            error: "Error in generating questions. Please try again."
        });
    }
    // return NextResponse.json({
    // mess:"Hello"
    // });
    let Quiz = null;
    try{

        let quizData = {
            subject: data.subject,
            topic: data.topic,
            questions: questions,
            createdBy: sessionData.name ? sessionData.name : null, // Assuming user._id represents the ObjectId of the user
            isAnonymous: !sessionData.name, // Set isAnonymous to true if user.name is not available
            difficulty: data.difficulty,
            questionsCount: parseInt(data.questionsCount) || 10,
        };

        if (!sessionData.name) {
            delete quizData.createdBy;
        }

        await connect();
        Quiz = await Quizzes.create(quizData);


    }catch (e) {
        console.log(e)
        return NextResponse.json({
            subject: data.subject,
            topic: data.topic,
            questions: questions,
            createdBy: user.name || "Anonymous",
            difficulty: data.difficulty,
            questionsCount: parseInt(data.questionsCount) || 10,
            error: "Error in saving questions. Please try again."
        });
    }

    return NextResponse.json({
        quiz: Quiz._id,
        message: "Quiz created successfully.",
        error: null
    });

    // console.log(questions)



}

export { handler as POST };
