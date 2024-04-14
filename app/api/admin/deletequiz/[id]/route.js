import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import User from "@/modals/userModal";
import {connect} from "@/dbConnection/dbConnect";
import Quiz from "@/modals/quizModal";
import DeletedQuiz from "@/modals/DeletedQuizModal";
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




    const deletedQuiz = await Quiz.findByIdAndDelete(id.params.id)
    if(!deletedQuiz){
        return NextResponse.json({
            error:"Quiz not found",
            message:"The quiz you are trying to delete does not exist"
        })
    }

    const deleted = await DeletedQuiz.create({
        subject: deletedQuiz.subject,
        topic: deletedQuiz.topic,
        questions: deletedQuiz.questions,
        questionsCount: deletedQuiz.questionsCount,
        createdBy: deletedQuiz.createdBy,
        tags: deletedQuiz.tags,
        difficulty: deletedQuiz.difficulty,
        isApproved: deletedQuiz.isApproved,
        approvedBy: deletedQuiz.approvedBy,
        isAnonymous: deletedQuiz.isAnonymous,
        deletedBy: user.name,
    })



    return NextResponse.json({
        AdminName:user.name,
        message: `${deletedQuiz.topic} deleted by Admin - ${(user.name)}`,
        deletedQuiz : deleted._id
    })





}
