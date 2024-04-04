import {GoogleGenerativeAI} from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log(process.env.GEMINI_API_KEY??"No API Key found")
export async function getQuestions(...args) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const {subject, topic, questionsCount, difficulty, detail} = args[0];

    const prompt= `Your task is to create MCQs covering the topics mentioned in the information. 
    Each question should have options, a correct option, and an explanation. 
    Ensure that the questions are well-crafted and cover a range of difficulties to challenge 
    the participants effectively.
    Format:
    [
        {
            "question": "",
            "options": [
                "",
                "",
                "",
                ""
            ],
            "correct": "",
            "explanation": ""
        }
    ]
`
    const information = `Information:
        The topic is ${topic} and it is related to ${subject}. The difficulty of the questions should be ${difficulty}. 
        The number of questions you have to generate is ${questionsCount}. 
        While creating the questions, consider providing a mix of conceptual, factual, and application-based
         questions to assess the participants comprehensively. ${detail !== 'none' ? `Additionally, 
        try to incorporate ${detail} into the questions wherever possible to ensure relevance and engagement.` : ''}`



    const finalPrompt = `${prompt} ${information}`;
    console.log(`Final prompt: ${finalPrompt}`)
    let response;
    try{
        const result = await model.generateContent(finalPrompt);
        response = await result.response;
    }catch(e){
        throw new Error('Error in generating questions. Please try again.');
        return false;
    }


    console.log(`Generated response: ${response}`)
    const text = response.text();
    console.log(`Generated text: ${text}`);
    const jsonData = extractJSON(text);
    console.log(`Extracted JSON: ${jsonData}`)
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



