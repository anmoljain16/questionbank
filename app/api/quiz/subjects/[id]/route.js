import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal";

export async function handler(req,id) {
    const subject =id.params.id;
    await connect()
    const quizzes = await Quiz.aggregate([
        {
            $match: {
                subject: { $regex: new RegExp("^" + subject + "$", "i") } // Case-insensitive match
            }
        },
        {
            $project: {
                questions: 0
            }
        }
    ]);


    if(quizzes.length < 1){
        return Response.json({
            error:true,
            quizzes:null
        })

    }
    return Response.json({
        name:subject,
        quizzes:quizzes,
        error:null
    })

}

export {handler as GET};
