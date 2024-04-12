import {NextResponse} from "next/server";
import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";


export async function POST(req){
    const {tag} = await req.json();
    // console.log(tag)
    try{
        await connect();
        const quiz = await Quizzes.find({subject:tag}).select("-questions").sort({createdAt: -1})
        if (!quiz) {
            return NextResponse.json({
                data: null,
                error: "No quiz found"
            })
        }

        return NextResponse.json({
            data: quiz,
            error: null,
        })
    }catch (e) {
        return NextResponse.json({
            data: null,
            error: e
        })

    }
    // return NextResponse.json({
    //     data: "This is the quiz page",
    //     error: null,
    // })
}
