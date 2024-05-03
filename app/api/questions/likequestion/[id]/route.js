import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {connect} from "@/dbConnection/dbConnect";
import LikeModal from "@/modals/LikeModal";

async function loggedIn() {
    const session = await getServerSession(authOptions);
    return (session && session.user) ? session.user : null;
}


export async function handler(req, id) {

    if (req.method !== 'POST') {
        return Response.json({
            error: true,
            message: "This route only accepts POST requests"
        })
    }

    const userData = await loggedIn();

    if (!userData) {
        return Response.json({
            loggedIn: false,
            error: true,
            message: "You need to be logged in to like a question"
        })
    }


    const question = id.params.id;
    const user = userData.token.id;

    await connect();

    const userLiked = await LikeModal.findOne({likedBy: user, likedTo: question})
        .lean()
        .exec();

    if (userLiked) {
        await LikeModal.findByIdAndDelete(userLiked._id);
        return Response.json({
            message: "Questions unliked successfully",
            question,
            user: userData.token
        })
    }

    await LikeModal.create({
        likedBy: user,
        likedTo: question,
        type: "question"
    })


    return Response.json({
        message: "Questions liked successfully",
        question,
        user: userData.token
    })

}

export async function checkIfLike(req, id) {

    const user = await loggedIn();

    if (!user) {
        return Response.json({
                loggedIn: false,
            }
        )
    }

    const question = id.params.id;
    const userId = user.token.id;


    await connect();

    const userLiked = await LikeModal.findOne({likedBy: userId, likedTo: question})
        .lean()
        .exec();

    return Response.json({
        liked: !!userLiked,
        loggedIn: true
    })
}

export {handler as POST, checkIfLike as GET};
