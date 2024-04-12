import Quizzes from "@/models/questionsModal";
import {connect} from "@/dbConnection/dbConnect";


export async function getSubjects(){


    try{
        await connect();
        // const TotalSubjects = await Quizzes.distinct("subject");
        // i want to get all subject in ascending order of quiz count



        const TotalSubjects = await Quizzes.aggregate([
            {
                $group: {
                    _id: "$subject",
                    quizCount: { $sum: "$questionsCount" },
                },
            },
            {
                $sort: { quizCount: -1 } // Sort by quizCount in ascending order
            }
        ]);
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
