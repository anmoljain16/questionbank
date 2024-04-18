import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
// console.log('API key:', process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function getTags({subject,topic,questions}) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt= `Generate up to 10 relevant tags based on the provided subject, topic, questions. Output the tags in an array format.

Subject/Topic/Question/Explanation: [${subject}, ${topic}, ${questions}]
`
    // console.log(`Prompt: ${prompt}`)


    // console.log(`Final prompt: ${finalPrompt}`);

    let response = ""; // Initialize an empty string to store the response

    try {
        const result = await model.generateContentStream([prompt]);

        // Concatenate each chunk of text into the response
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            // console.log(chunkText);
            response += chunkText;
        }

        // Once the stream ends, you can handle further processing if needed
        // console.log("Stream ended");
    } catch (e) {
        console.error('Error in generating questions:', e);
        throw new Error('Error in generating questions. Please try again.');
    }

    // console.log("Generated response:", response);

    const jsonData = extractJSON(response);
    // console.log("Extracted JSON:", jsonData);

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



