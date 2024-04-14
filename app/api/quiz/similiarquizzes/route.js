import {NextResponse} from "next/server";

export async function POST(req) {
    const {quizId, userId, userAnswers} = req.json;
    return NextResponse.json({
        data: {
            quizId,
            userId,
            userAnswers
        },
        error: null
    })

}
