import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import User from "@/modals/userModal";
import {connect} from "@/dbConnection/dbConnect";
export async function DELETE(request){
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

    const user = await User.findById(userId).select("isAdmin")
    if(!user.isAdmin){
        return NextResponse.json({
            error:"User not authorized",
            message:"You are not authorized to Delete quizzes. Please contact the admin for more information."
        })
    }

    const {id} = request.query;

    // const quizzes = await Quizzes.findByIdAndDelete()
    //
    //
    //
    //
    // return NextResponse.json({
    //     AdminName:user.name,
    //     quizzes
    // })





}
