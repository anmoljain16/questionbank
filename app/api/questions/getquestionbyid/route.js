import {parse} from 'url';
import {connect} from "@/dbConnection/dbConnect";
import QuestionModal from "@/modals/QuestionModal";


export async function handler(req, id) {

    const {page} = parse(req.url, true).query;
    console.log(page)
    try {
        await connect();

        const questions = await QuestionModal.find()
            .sort({createdAt: -1}) // Sort by createdAt field in descending order
            .skip(page ? page * 10 : 0) // Adjust skip logic if needed
            .limit(30)
            .select("-reports -reportedBy -commentedBy -likedBy -correct -explanation");

        // console.log(questions)

        return Response.json({message: 'Questions fetched successfully', error: false, questions});
    } catch (e) {

        return Response.json({message: e.message, error: true});
    }
}

export {handler as GET};
