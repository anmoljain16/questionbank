
import {NextResponse} from "next/server";

export async function PUT(req){
    const {id} = await req.json()
    // console.log(id)
    // await connect();
    // const quiz = await Quizzes.updateOne({_id:id},{viewsCount:1}).select("-questions");
    // const quiz = await Quizzes.updateOne({_id:id},{
    //     $set:{
    //         viewsCount:1
    //     }
    // },{upsert:false}).then((result,err)=>{
    //     console.log(result,err)
    // })
    // const quiz = await Quizzes.findById("661a7794003abd0f99b488b5")
    // console.log(quiz)

    // if(quiz.viewsCount){
    //     quiz.viewCount += 1;
    //     console.log(quiz.viewCount)
    //     await quiz.save();
    // }
    // else{
    //     const newCount=  await Quizzes.aggregate().addFields(
    //         {
    //             viewsCount :1
    //         }
    //     )
    //     console.log(newCount)
    // }

    return NextResponse.json({
        data: "Quiz view count updated",
        error: null,
    })




}
