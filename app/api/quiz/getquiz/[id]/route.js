import mongoose from "mongoose";
import {connect} from "@/dbConnection/dbConnect";
import Quizzes from "@/models/questionsModal";

export async function handler(req, id) {

    try{
        await connect();

        const quiz = await Quizzes.findById(id.params.id);

        if (!quiz) {
            return Response.json({
                data: null,
                error: "Quiz not found",
            });
        }
        return Response.json({
            data: quiz,
            error: null,
        });

    }catch (e) {
        return Response.json({
            data: null,
            error: e.message,
        });
    }



}

export {handler as GET}
