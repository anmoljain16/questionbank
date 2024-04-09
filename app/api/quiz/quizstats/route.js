import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";
export default async function GetQuizzes(request){
    const newHeaders = new Headers();
    newHeaders.set('Cache-Control', 'no-cache');

    try{
        await connect();

        const quizStats = await Quizzes.aggregate([
            {
                $group:{
                    _id: null,
                    total: {$sum: 1},
                    totalQuestions: {$sum: "$questionsCount"},
                    totalSubject: {$addToSet: "$subject"},
                    totalTopics: {$addToSet: "$topic"},
                }
            }
        ])
            return {
            status: 200,
            body: {
                success: true,
                data:{
                    totalQuizzes:  quizStats[0].total,
                    totalQuestions: quizStats[0].totalQuestions,
                    totalSubject: quizStats[0].totalSubject.length,
                    totalTopics: quizStats[0].totalTopics.length,
                }

            }
        }
    }
    catch(err){
        return {
            status: 500,
            body: {
                success: false,
                error: "Server Error"
            }
        }
    }
}
