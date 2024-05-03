import {connect} from "@/dbConnection/dbConnect";
import QuestionModal from "@/modals/QuestionModal";

export async function handler(req, id) {
    const questionId = id.params.id;
    // console.log(`Questions ID: ${questionId}`)
    await connect();
    try {
        const question = await QuestionModal.findById(questionId).select("-reports -reportedBy -commentedBy -likedBy");

        if (!question) return Response.json({
            error: true,
            message: 'Questions not found'
        })
        question.views = question.views + 1;
        await question.save();

        const relatedQuestions = await QuestionModal.find({subject: question.subject}).select("_id question").limit(9);

        // console.log(relatedQuestions)
        return Response.json({
            error: false,
            question,
            relatedQuestions: relatedQuestions.filter(q => q._id.toString() !== questionId)
        });
    } catch (e) {
        return Response.json({
            message: e.message,
            error: true
        });
    }
}

export {handler as GET};
