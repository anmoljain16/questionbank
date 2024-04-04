import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";


export async function POST(req, res) {
    const data = await req.json();
    const search = data.search;
    // console.log(search)
    const regexPattern = new RegExp(search, 'i'); // 'i' flag for case-insensitive matching
    //
    // // Construct the query using the regex pattern
    // const query = {
    //     $or: [
    //         { subject: regexPattern },
    //         { topic: regexPattern },
    //         { createdBy: regexPattern },
    //         { difficulty: regexPattern }
    //     ]
    // };


    try {
        await connect()
        const quiz = await Quizzes.find({
          $or: [
              { subject: regexPattern },
              { topic: regexPattern },
              { difficulty: regexPattern }
          ]
        }).select('subject topic difficulty createdBy _id')
        return Response.json({
            success: true,
            data: quiz,
            message: "Search results",
            error: null
        })
    }catch (e) {
        return Response.json({
            success: false,
            message: e.message,
            data: null,
            error: "Error in searching quiz. Please try again."
        })
    }
}
