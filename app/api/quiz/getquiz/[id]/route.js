import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal";
import Question from "@/modals/QuestionModal";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function handler(req, id) {

    try{
        await connect();

        const quiz = await Quiz.findById(id.params.id)
        if (!quiz) {
            return Response.json({
                data: null,
                error: "Quiz not found",
            });
        }

        quiz.views += 1;
        await quiz.save();
        const questionsIds = quiz.questions;

        const questions = await Question.find({_id: {
            $in: questionsIds
        }}).select({options: 1, correct: 1, explanation: 1, question: 1}).lean();



        return Response.json({
            data:{
                questions:questions,
                subject: quiz.subject,
                topic: quiz.topic,
            },

            error: null,
        });

    }catch (e) {
        return Response.json({
            data: null,
            error: e.message,
        });
    }



}


export async function deleteQuiz(req, id) {
    try {

        const session = await getServerSession(authOptions);
        const sessionData = (session && session.user) ? session.user : null;

        if (!sessionData) {
            return Response.json({
                loggedIn: false,
                data: null,
                error: "User not logged in",
            });
        }

        const userId = sessionData.token.id;

        if (!userId) {
            return Response.json({
                loggedIn: false,
                data: null,
                error: "User not logged in",
            });
        }

        await connect();

        // if the quiz is created by user then only delete the quiz
        const quiz = await Quiz.findOneAndDelete({_id: id.params.id, createdBy: userId});

        if (!quiz) {
            return Response.json({
                data: null,
                error: "Quiz not found",
            });
        }

        return Response.json({
            data: quiz,
            error: null,
        });

    } catch (e) {
        return Response.json({
            data: null,
            error: e.message,
        });
    }
}

export {handler as GET, deleteQuiz as DELETE}
