import {connect} from "@/dbConnection/dbConnect";
import Question from "@/modals/QuestionModal";

export async function handler(req) {
    try {
        await connect();

        const questions = await Question.aggregate([
            {
                $sample: {size: 20}
            }
        ])
        return questions
        // return Response.json({
        //     data: questions,
        //     error: false,
        // })
    } catch (e) {
        // return Response.json({
        //     message: e.message,
        //     error: true,
        // })
        return e.message
    }
}


