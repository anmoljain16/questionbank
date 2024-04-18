// import { NextResponse } from "next/server";
// import { connect } from "@/dbConnection/dbConnect";
// import Question from "@/modals/QuestionModal";
// import Quiz from "@/modals/quizModal";
// import { getQuestions } from "@/app/api/ai/quiz/createquiz/gemini";
// import axios from "axios";

export async function handler(req, res) {

    return Response.json({
        message: 'Hello from the API'
    })
    //
    // const data = {
    //     subject_name: "Computer Graphics and Visualization",
    //     topics: [
    //         "Applications of computer Graphics in various fields",
    //         "Evolution of computer Graphics",
    //         "Graphics Systems",
    //         "Introduction to Computer Graphics and OpenGL",
    //         "Rasterization and Transformations",
    //         "2D viewing pipeline",
    //         "3D viewing pipeline",
    //         "Visibility and Shading",
    //         "Discrete Techniques and Object Representation",
    //         "DDA and Bresenham line drawing algorithm",
    //         "Mid-point circle generating algorithm",
    //         "Clipping algorithms",
    //         "Projection Transformations",
    //         "Basic Illumination Models",
    //         "Bezier and B-spline curves"
    //     ]
    // }
    //
    // try {
    //     const quizPromises = [];
    //
    //     for (const topic of data.topics) {
    //         const formData = {
    //             subject: data.subject_name,
    //             topic: topic,
    //             difficulty: "Medium",
    //             questionsCount: 10,
    //             detail :"none"
    //         }
    //
    //         await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
    //
    //         const questions = await getQuestions(formData)
    //
    //         if (!questions) {
    //             console.log(`No questions found for topic: ${topic}`)
    //             continue; // Continue to the next topic
    //         }
    //
    //         const response = await axios.post("/api/ai/quiz/createquiz", {
    //             subject: formData.subject.charAt(0).toUpperCase() + formData.subject.slice(1).toLowerCase(),
    //             topic: formData.topic.charAt(0).toUpperCase() + formData.topic.slice(1).toLowerCase(),
    //             questions: questions,
    //             difficulty: "Medium",
    //             questionsCount: 10
    //
    //         })
    //
    //         console.log(response.data)
    //
    //         const responseData = response.data;
    //
    //         if (responseData.error) {
    //             // Send error response with topic information
    //             return NextResponse.json({ error: `Error creating quiz for topic: ${topic}. ${responseData.error}` }, { status: 500 });
    //         }
    //
    //         // Send success response with topic and quiz information
    //         NextResponse.json({ topic: topic, quiz: responseData.quiz });
    //
    //         quizPromises.push(responseData.quiz); // Push quiz ID to array
    //     }
    //
    //     // Send final success response with all quiz IDs
    //     return NextResponse.json({ quizzes: quizPromises });
    //
    // } catch (error) {
    //     console.error(error);
    //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    // }
}

export { handler as GET };


// import { NextResponse } from "next/server";
// import fs from "fs/promises";
// import { connect } from "@/dbConnection/dbConnect";
// import Question from "@/modals/QuestionModal";
// import Quiz from "@/modals/quizModal";
//
// export async function handler() {
//     try {
//         // Read data from the file
//         const data = await readDataFromFile('quizzesData.json');
//
//         // Connect to the database
//         await connect();
//
//         // Process each quiz data in parallel
//         const quizDataPromises = data.map(async (quiz) => {
//             try {
//                 // Extract quiz information
//                 const { subject, topic, difficulty, questions } = quiz;
//
//                 // Prepare array to hold inserted question IDs
//                 const insertedQuestionIds = [];
//
//                 // Process each question in the quiz
//                 const processedQuestions = await Promise.all(questions.map(async (q) => {
//                     // Insert question into database
//                     const insertedQuestion = await Question.create({
//                         subject,
//                         topic,
//                         difficulty,
//                         ...q,
//                         isAnonymous: true
//                     });
//                     insertedQuestionIds.push(insertedQuestion._id); // Assuming _id field exists in MongoDB documents
//                     return insertedQuestion.toObject(); // Convert Mongoose document to plain JavaScript object
//                 }));
//
//                 // Insert quiz into database
//                 const createdQuiz = await Quiz.create({
//                     subject,
//                     topic,
//                     difficulty,
//                     questions: insertedQuestionIds,
//                     isAnonymous: true,
//                     questionsCount: processedQuestions.length
//                 });
//
//                 return {
//                     quizData: createdQuiz.toObject(), // Convert Mongoose document to plain JavaScript object
//                     questions: processedQuestions
//                 };
//             } catch (error) {
//                 console.error("Error processing quiz:", error);
//                 throw error; // Rethrow error to be caught by the outer catch block
//             }
//         });
//
//         // Wait for all quiz data promises to resolve
//         const allQuizData = await Promise.all(quizDataPromises);
//
//         // Return response
//         return NextResponse.json({
//             quizData: allQuizData.map(({ quizData }) => quizData),
//             questions: allQuizData.flatMap(({ questions }) => questions)
//         });
//     } catch (error) {
//         console.error("Error handling request:", error);
//         return NextResponse.json({
//             error: "Internal server error",
//         }); // Return status 500 for internal server error
//     }
// }
//
// async function readDataFromFile(filename) {
//     try {
//         // Read data from the file
//         const jsonData = await fs.readFile(filename, 'utf8');
//
//         // Parse JSON data
//         return JSON.parse(jsonData);
//     } catch (error) {
//         throw error;
//     }
// }
//
// export { handler as GET };

