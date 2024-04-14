import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {connect} from "@/dbConnection/dbConnect";
import Question from "@/modals/QuestionModal";
import Quiz from "@/modals/quizModal";


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

    try{
        await connect();
        const questions = await Question.insertMany(data.questions.map((question) => {
            return {
                subject: data.subject,
                topic: data.topic,
                question: question.question,
                options: question.options,
                correct: question.correct,
                explanation: question.explanation,
                tags: question.tags,
                difficulty: data.difficulty,
                createdBy: userId ? userId : null, // Assuming user._id represents the ObjectId of the user
                isAnonymous: !userId, // Set isAnonymous to true if user.name is not available
            };
        }   ));
        const questionIds = questions.map((question) => question._id);
        // console.log(questionIds)
        const newQuiz = await Quiz.create({
            subject: data.subject,
            topic: data.topic,
            questions: questionIds,
            createdBy: userId ? userId : null, // Assuming user._id represents the ObjectId of the user
            isAnonymous: !userId, // Set isAnonymous to true if user.name is not available
            difficulty: data.difficulty,
            questionsCount: parseInt(data.questionsCount) || 10,
        })

        // console.log(newQuiz)

        return NextResponse.json({
            quiz: newQuiz._id,
            message: "Quiz created successfully.",
            error: null
        })


    }catch (e) {
        console.log(e)
        return NextResponse.json({
            data: null,
            error: "Error in generating questions. Please try again."
        });

    }
    //
    //
    // let Quiz = null;
    // let questions = null;
    // let questionIds = [];
    // try{
    //
    //     let quizData = {
    //         subject: data.subject,
    //         topic: data.topic,
    //         questions: data.questions,
    //         createdBy: userId ? userId : null, // Assuming user._id represents the ObjectId of the user
    //         isAnonymous: !userId, // Set isAnonymous to true if user.name is not available
    //         difficulty: data.difficulty,
    //         questionsCount: parseInt(data.questionsCount) || 10,
    //     };
    //
    //     if (!userId) {
    //         delete quizData.createdBy;
    //     }
    //
    //     await connect();
    //     Quiz = await Quizzes.create(quizData);
    //     questions = await Question.insertMany(data.questions.map((question) => {
    //         return {
    //             subject: data.subject,
    //             topic: data.topic,
    //             question: question.question,
    //             options: question.options,
    //             correct: question.correct,
    //             explanation: question.explanation,
    //             tags: question.tags,
    //             difficulty: data.difficulty,
    //             createdBy: userId ? userId : null, // Assuming user._id represents the ObjectId of the user
    //             isAnonymous: !userId, // Set isAnonymous to true if user.name is not available
    //         };
    //     }));
    //
    //     questionIds = questions.map((question) => question._id);
    //
    //     const newQuiz = await Quiz.create({
    //         subject: data.subject,
    //         topic: data.topic,
    //         questions: questionIds,
    //         createdBy: userId ? userId : null, // Assuming user._id represents the ObjectId of the user
    //         isAnonymous: !userId, // Set isAnonymous to true if user.name is not available
    //         difficulty: data.difficulty,
    //         questionsCount: parseInt(data.questionsCount) || 10,
    //     })
    //
    //
    // }catch (e) {
    //     console.log(e)
    //     return NextResponse.json({
    //         subject: data.subject,
    //         topic: data.topic,
    //         questions: data.questions,
    //         createdBy: userId || "Anonymous",
    //         difficulty: data.difficulty,
    //         questionsCount: parseInt(data.questionsCount) || 10,
    //         error: "Error in saving questions. Please try again."
    //     });
    // }
    //
    // return NextResponse.json({
    //     quiz: Quiz._id,
    //     questions: questions.map((question) => question._id),
    //     message: "Quiz created successfully.",
    //     error: null
    // });

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
