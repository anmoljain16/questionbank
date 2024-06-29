import {connect} from "@/dbConnection/dbConnect";
import Question from "@/modals/QuestionModal";

export async function handler(request) {
    const newHeaders = new Headers(request.headers);
    newHeaders.set('Cache-Control', 'max-age=5');

        try{
            await connect();

            // const questions = await Question.aggregate([
            //     {
            //         $sample: {size: 20}
            //     }
            // ])

            // get random questions from Question database

            const questions = await Question.aggregate([
                {$sample: {size: 30}}
            ]);


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
