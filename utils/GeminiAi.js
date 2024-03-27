// const { GoogleGenerativeAI } = require("@google/generative-ai");
import {GoogleGenerativeAI} from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyBqQUtkRBMrenwiSwogcOgMjE8f-Y0-qrM");

export async function getQuestions(extractedText, type) {
    // console.log(`GEN AI: ${genAI}`)

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    // const prompt = extractedText;
    // console.log(`Model: ${model}`)



    // const prompt = `I am giving you the extracted text from an image you have to make 10 questions from it. \n extractedText =f""" ${extractedText}""". the format of the questions should be json type`
    let extrcttext = `Extracted text from the image = f""" ${extractedText}"""`
    let prompt= `Generate multiple-choice questions (MCQs) in JSON format based on the provided text.
     Your task is to create MCQs covering the topics mentioned in the text.
     Each question should have options, a correct option, and an explanation. Return the MCQs in JSON format.
     format = [{
                "question": "",
                "options": [
                    "",
                    "",
                    "",
                    ""
                ],  
                "correct": "",
                "explanation": ""
            },],`

    type === "topic" ?
        extrcttext = `Topic is ${extractedText}.`
        :""

    // console.log(`${prompt} ${extrcttext}.Questions must be Related to Biology`)
    const givenText = `${prompt} ${extrcttext}. Minimum 10 questions`

    const result = await model.generateContent(givenText);
    const response = await result.response;
    console.log(`Generated response: ${response}`)
    const text = response.text();
    // console.log(`Generated text: ${text}`);
    const jsonData = extractJSON(text);

    if (jsonData !== null) {
        console.log(jsonData); // Output: { data: "some value" }
    } else {
        console.log("No valid JSON data found in the string.");
    }
    return jsonData;
}



function extractJSON(str) {
    // Try parsing the entire string as JSON
    try {
        return JSON.parse(str);
    } catch (e) {
        if (e instanceof SyntaxError) {
            // If parsing the entire string fails, try finding a JSON object within curly braces
            const openingBraceIndex = str.indexOf("[");
            const closingBraceIndex = str.lastIndexOf("]");
            // console.log(`Opening brace index: ${openingBraceIndex} Closing brace index: ${closingBraceIndex}`)

            if (openingBraceIndex !== -1 && closingBraceIndex > openingBraceIndex) {
                try {
                    // Extract the JSON object and parse it
                    const jsonText = str.substring(openingBraceIndex, closingBraceIndex + 1);
                    return JSON.parse(jsonText);
                } catch (e) {
                    // Ignore any errors during parsing the extracted text
                }
            }
        }
    }

    // No valid JSON data found
    return null;
}



