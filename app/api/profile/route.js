import {connect} from "@/dbConnection/dbConnect"
import User from "@/models/userModal"
import Quizzes from "@/models/questionsModal";
import {getServerSession} from "next-auth";
export async function GET(req){
    const session = await getServerSession({ req});
    const sessionData = (session && session.user) ? session.user : null;
    if(!sessionData){
        return Response.json({
            error:"User not logged in",
            message:"Please login to access this page"
        })
    }
    // console.log(sessionData)
    const userId = sessionData.name;
    // console.log("route Get profile hit ");

    try{
        await connect()
        let user;
        user = await User.findById(userId)
        if(!user){
            return Response.json({
                error:"User not found",
                message:"User not found in database"
            })
        }

        let quizzes;
        quizzes = await Quizzes.find({createdBy:userId}).select("_id")
        if(!quizzes){
            return Response.json({
                user:user,
                quizzes:null,
                error:null,
                message:"User found in database but no quizzes found"
            })
        }
        return Response.json({
            user:user,
            quizzes:quizzes,
            error:null,
            message:"User found in database"
        })

        // return Response.json({
        //     user:user,
        //     error:null,
        //     message:"User found in database"
        // })

    }catch(e){
        return Response.json({
            error : e.message,
            message:"Error while fetching dta from db"
        })
    }
}
