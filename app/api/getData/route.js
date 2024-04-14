import { NextResponse } from "next/server";
import fs from "fs/promises";
import { connect } from "@/dbConnection/dbConnect";
import Question from "@/modals/QuestionModal";
import Quiz from "@/modals/quizModal";

export async function handler() {
    try {
        // Read data from the file
        const data = await readDataFromFile('quizzesData.json');

        // Connect to the database
        await connect();

        // Process each quiz data in parallel
        const quizDataPromises = data.map(async (quiz) => {
            try {
                // Extract quiz information
                const { subject, topic, difficulty, questions } = quiz;

                // Prepare array to hold inserted question IDs
                const insertedQuestionIds = [];

                // Process each question in the quiz
                const processedQuestions = await Promise.all(questions.map(async (q) => {
                    // Insert question into database
                    const insertedQuestion = await Question.create({
                        subject,
                        topic,
                        difficulty,
                        ...q,
                        isAnonymous: true
                    });
                    insertedQuestionIds.push(insertedQuestion._id); // Assuming _id field exists in MongoDB documents
                    return insertedQuestion.toObject(); // Convert Mongoose document to plain JavaScript object
                }));

                // Insert quiz into database
                const createdQuiz = await Quiz.create({
                    subject,
                    topic,
                    difficulty,
                    questions: insertedQuestionIds,
                    isAnonymous: true,
                    questionsCount: processedQuestions.length
                });

                return {
                    quizData: createdQuiz.toObject(), // Convert Mongoose document to plain JavaScript object
                    questions: processedQuestions
                };
            } catch (error) {
                console.error("Error processing quiz:", error);
                throw error; // Rethrow error to be caught by the outer catch block
            }
        });

        // Wait for all quiz data promises to resolve
        const allQuizData = await Promise.all(quizDataPromises);

        // Return response
        return NextResponse.json({
            quizData: allQuizData.map(({ quizData }) => quizData),
            questions: allQuizData.flatMap(({ questions }) => questions)
        });
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({
            error: "Internal server error",
        }); // Return status 500 for internal server error
    }
}

async function readDataFromFile(filename) {
    try {
        // Read data from the file
        const jsonData = await fs.readFile(filename, 'utf8');

        // Parse JSON data
        return JSON.parse(jsonData);
    } catch (error) {
        throw error;
    }
}

export { handler as GET };
