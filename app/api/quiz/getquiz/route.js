import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";

export async function handler(request) {
    const newHeaders = new Headers(request.headers);
    newHeaders.set('Cache-Control', 'no-cache');
    try{
        await connect();
        const quizzes = await Quizzes.find().select("-questions").sort({createdAt: -1}).limit(22);
        return Response.json({
            quizzes: quizzes,
            error: null,
            message: "Quizzes fetched successfully",
        });
    }catch(e){
        return Response.json({
            data: null,
            error: true,
            message: "Failed to fetch quizzes",
        });


    }

}

export { handler as GET}


