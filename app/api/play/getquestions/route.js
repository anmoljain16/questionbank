import {connect} from "@/dbConnection/dbConnect";
import Question from "@/modals/QuestionModal";

export async function handler(request) {
    const newHeaders = new Headers(request.headers);
    newHeaders.set('Cache-Control', 'max-age=5');

        try{
            await connect();

            const questions = await Question.aggregate([
                {
                    $sample: {size: 20}
                }
            ])

            return Response.json({
                data: questions,
                error: false,
            })
        }catch (e) {
            return Response.json({
                message: e.message,
                error: true,
            })
        }
}


export {handler as GET};
