import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import User from "@/modals/userModal";
import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal";
export async function GET(request){
    const newHeaders = new Headers(request.headers);
    newHeaders.set('Cache-Control', 'no-cache');

    const session = await getServerSession();
    const sessionData = (session && session.user) ? session.user : null;
    if(!sessionData){
        return Response.json({
            error:"User not logged in",
            message:"Please login to access this page",

        })
    }

    if(!session){
        return NextResponse.json({
            data: null,
            error: "Not Logged in",
            message : "You are not logged in. Please login to access"

        })
    }

    const userId = sessionData.name;

    await connect();

    const user = await User.findById(userId).select("isAdmin name")
    if(!user.isAdmin){
        return NextResponse.json({
            error:"User does not have admin access",
            message:"You are not authorized to access this page"
        })
    }

    const quizzes = await Quiz.find().select("-questions ").sort({createdAt:-1})




    return NextResponse.json({
        AdminName:user.name,
        quizzes
    })





}
