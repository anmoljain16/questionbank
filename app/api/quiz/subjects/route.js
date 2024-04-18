import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";


export async function handler(req) {
    await connect();
    const quiz = await Quiz.aggregate([
        {
            $group: {
                _id: { $toUpper: "$subject" }, // Convert subject to lowercase for grouping
                total: { $sum: 1 }
            }
        },
        {
            $sort: { total: -1 }
        }
    ]);

    return Response.json({
        message: 'Hello from the API',
        data: quiz
    })
}

export {handler as GET};
