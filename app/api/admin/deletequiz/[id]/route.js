import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import User from "@/models/userModal";
import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";
export async function DELETE(request, id){

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
            error:"User not authorized",
            message:"You are not authorized to Delete quizzes. Please contact the admin for more information."
        })
    }




    const deletedQuiz = await Quizzes.findByIdAndDelete(id.params.id)




    return NextResponse.json({
        AdminName:user.name,
        message: `${deletedQuiz.topic} deleted by Admin - ${(user.name)}`,
        deletedQuiz
    })





}
