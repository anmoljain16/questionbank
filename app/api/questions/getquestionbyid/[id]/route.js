import {connect} from "@/dbConnection/dbConnect";
import QuestionModal from "@/modals/QuestionModal";

export async function handler(req, id) {
    const questionId = id.params.id;
    // console.log(`Question ID: ${questionId}`)
    await connect();
    try {
        const question = await QuestionModal.findById(questionId).select("-reports -reportedBy -commentedBy -likedBy");

        if (!question) return Response.json({
            error: true,
            message: 'Question not found'
        })
        question.views = question.views + 1;
        await question.save();
        return Response.json({
            error: false,
            question
        });
    } catch (e) {
        return Response.json({
            message: e.message,
            error: true
        });
    }
}

export {handler as GET};
