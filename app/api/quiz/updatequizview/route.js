
import {NextResponse} from "next/server";
import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal"

export async function PUT(req){
    const {id} = await req.json()
    // console.log(id)
    await connect();
    const quiz = await Quiz.findById(id);

    if(!quiz){
        return NextResponse.json({
            data: null,
            error: "Quiz not found"
        })
    }

    quiz.views += 1;
    await quiz.save();


    return NextResponse.json({
        viewCount: quiz.views,
        data: "Quiz view count updated",
        error: null,
    })




}
