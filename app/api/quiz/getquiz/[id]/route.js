import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal";
import Question from "@/modals/QuestionModal";

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
        // get all questions options and explations and correct of the Quiz from QUestion Modal
        // quiz.questions = quiz.questions.map((question) => mongoose.Types.ObjectId(question));
        quiz.views += 1;
        await quiz.save();
        const questionsIds = quiz.questions;

        const questions = await Question.find({_id: {
            $in: questionsIds
        }}).select({options: 1, correct: 1, explanation: 1, question: 1, _id: 1, tags: 1, difficulty: 1}).lean();


        // console.log({...quiz,questions:questions})


        return Response.json({
            data:{
                ...quiz,questions:questions
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

export {handler as GET}
