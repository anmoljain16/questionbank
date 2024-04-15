import {NextResponse} from "next/server";
import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal";

export async function POST(request){
    const {subject,topic}= await request.json();
    try {
        // I want to find related quizzes from the Quiz modal based on subject and title
        await connect();
        const relatedQuizzes = await Quiz.find({subject}).select("_id subject topic").sort({views: -1}).limit(6);

        const recentQuizzes = await Quiz.find().select("_id subject topic").sort({views: -1}).limit(6);



        return NextResponse.json({
            status: 200,
            data: {relatedQuizzes, recentQuizzes},
            error: false
        })

    }catch (e) {
        console.log(e);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
            error: true
        })
    }

}
