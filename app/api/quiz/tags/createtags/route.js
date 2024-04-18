import {NextResponse} from "next/server";
import {connect} from "@/dbConnection/dbConnect";
import Tag from "@/modals/TagModal";
import Quiz from "@/modals/quizModal";

export async function POST(req) {
    const {tags,id} = await req.json();
    // tag is a array of tag strings ["tag1", "tag2", "tag3"] and i want to send it to the database and create tags with the name of the tag string if it does not exist in database
    console.log("On the server for inserting tags")
    await connect();


    const postTag = await Promise.all(tags.map(async (tag) => {
        const tagExists = await Tag.findOne({ name: tag.toLowerCase() });
        if (tagExists) {
            tagExists.quizzes.push(id);
            await tagExists.save();
            return ;
        } else {
            return await Tag.create({ name: tag.toLowerCase(), quizzes: [id]});
        }
    }
    ));

    const postTags = postTag.map((tag) => tag._id);

    const quizTags = await Quiz.updateOne({ _id: id }, { tags: postTags});




    return NextResponse.json(postTag, quizTags);
}
