import {connect} from "@/dbConnection/dbConnect"
import User from "@/modals/userModal"
import Quiz from "@/modals/quizModal";
import {getServerSession} from "next-auth";
export async function GET(req){
    const session = await getServerSession({ req});
    const sessionData = (session && session.user) ? session.user : null;
    if(!sessionData){
        return Response.json({
            error:"User not logged in",
            message:"Please login to access this page",

        })
    }
    const userId = sessionData.name;

    try{
        await connect()
        let user;
        user = await User.findById(userId).select("name avatar")
        if(!user){
            return Response.json({
                error:"User not found",
                message:"User not found in database. Please login again."
            })
        }


        const quiz = await Quiz.find({createdBy:userId}).select("_id topic createdAt").sort("-createdAt");
        if(!quiz){
            return Response.json({
                user:user,
                quizzes:null,
                error:null,
                message:"User found in database but no quizzes found"
            })
        }
        return Response.json({
            user:user,
            quizzes:quiz,
            error:null,
            message:"User found in database"
        })



    }catch(e){
        return Response.json({
            error : e.message,
            message:"Error while fetching dta from db"
        })
    }
}
