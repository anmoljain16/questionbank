import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getQuestions(...args) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { subject, topic, questionsCount, difficulty, detail } = args[0];

    const prompt = `Your task is to create multiple-choice questions (MCQs) covering ${topic} in ${subject}. 
Each question should include options, a correct answer, and an explanation. 
Generate a variety of questions across different difficulty levels (${difficulty}) to effectively challenge participants.

Format:
[
    {
        "question": "String",
        "options": ["String", "String", "String", "String"],
        "correct": "String",
        "explanation": "String"
    }
]
`;

    const additionalDetail = detail !== 'none' ? `Additionally, incorporate ${detail} where relevant for engagement.` : '';

    const information = `Information:
- Aim: Create ${questionsCount} well-crafted MCQs covering a range of difficulties.
- Approach: Include conceptual, factual, and application-based questions.
- Detail: ${additionalDetail}`;

    const finalPrompt = `${prompt} ${information}`;

    console.log(`Final prompt: ${finalPrompt}`);

    let response = ""; // Initialize an empty string to store the response

    try {
        const result = await model.generateContentStream([finalPrompt]);

        // Concatenate each chunk of text into the response
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            response += chunkText;
        }

        // Once the stream ends, you can handle further processing if needed
        console.log("Stream ended");
    } catch (e) {
        console.error('Error in generating questions:', e);
        throw new Error('Error in generating questions. Please try again.');
    }

    console.log("Generated response:", response);

    const jsonData = extractJSON(response);
    console.log("Extracted JSON:", jsonData);

    if (jsonData !== null) {
        return jsonData;
    } else {
        return false;
    }
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



