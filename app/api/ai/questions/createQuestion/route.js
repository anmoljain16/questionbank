
import {getQuestions} from "@/utils/GeminiAi";



export default async function handler(req,res){

    const {subject, topic, createdBy, difficulty} = req.body;

    const questions = await getQuestions(subject, topic, difficulty);
    console.log(questions);

    // const newQuestion = new Question({
    //     subject,
    //     topic,
    //     questions,
    //     createdBy,
    //     tags,
    //     difficulty,
    //     isApproved,
    //     approvedBy,
    // });
    // try{
    //     const savedQuestion = await newQuestion.save();
    //     res.status(201).json(savedQuestion);
    // }catch(err){
    //     res.status(500).json({message: err});
    // }
}
