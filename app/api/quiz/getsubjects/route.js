import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal"

export async function getSubjects(){


    try{
        await connect();



        const TotalSubjects = await Quiz.aggregate([
            {
                $group: {
                    _id: "$subject",
                    quizCount: { $sum: "$questionsCount" },
                },
            },
            {
                $sort: { quizCount: -1 } // Sort by quizCount in ascending order
            }
        ]).limit(11);
        return {
            data: TotalSubjects,
            error: null,
        }


    }catch (e) {
        return {
            data: null,
            error: "Server Error"
        }

    }
}

