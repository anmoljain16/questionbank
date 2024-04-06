import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {getQuestions} from "@/app/api/ai/quiz/createquiz/gemini";
import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";

export async function handler(req) {
    const data = await req.json();
    if(!data.questions){
        return NextResponse.json({
            data: null,
            error: "Question Not Found. Please try again."
        });
    }
    let userId=null;
    try{
        const session = await getServerSession({req});
        const sessionData = (session && session.user) ? session.user : null;
        if(sessionData){
            userId = sessionData.name;
        }
    }catch (e) {
        console.log(e)
        return NextResponse.json({
            data: null,
            error: "Error in getting user data. Please try again."
        });
    }





    let Quiz = null;
    try{

        let quizData = {
            subject: data.subject,
            topic: data.topic,
            questions: data.questions,
            createdBy: userId ? userId : null, // Assuming user._id represents the ObjectId of the user
            isAnonymous: !userId, // Set isAnonymous to true if user.name is not available
            difficulty: data.difficulty,
            questionsCount: parseInt(data.questionsCount) || 10,
        };

        if (!userId) {
            delete quizData.createdBy;
        }

        await connect();
        Quiz = await Quizzes.create(quizData);


    }catch (e) {
        console.log(e)
        return NextResponse.json({
            subject: data.subject,
            topic: data.topic,
            questions: data.questions,
            createdBy: userId || "Anonymous",
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

//
//
// let questions = null;
// try{
//     questions = await getQuestions(data)
//     // console.log(typeof questions)
//     if(!questions){
//         return NextResponse.json({
//             data: null,
//             error: "Error in generating questions. Please try again."
//         });
//     }
//
//
// }catch (e) {
//     console.log(e)
//     return NextResponse.json({
//         data: null,
//         error: "Error in generating questions. Please try again."
//     });
// }
// // return NextResponse.json({
// // mess:"Hello"
// // });
