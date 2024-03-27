    "use client"
    import {useState} from "react";

    export default function Question(props) {
        // console.log(ques)
        const ques = props.ques;

        // const ques = [
        //     {
        //         "question": "Which of the following is NOT a type of AI?",
        //         "options": [
        //             "Narrow AI",
        //             "General AI",
        //             "Super AI",
        //             "Natural AI"
        //         ],
        //         "correct": "Natural AI",
        //         "explanation": "Natural AI is not a recognized type of AI."
        //     },
        //     {
        //         "question": "What is the term used to describe AI systems that can learn from data without being explicitly programmed?",
        //         "options": [
        //             "Machine learning",
        //             "Deep learning",
        //             "Neural networks",
        //             "Natural language processing"
        //         ],
        //         "correct": "Machine learning",
        //         "explanation": "Machine learning is a subfield of AI that allows systems to learn from data without being explicitly programmed."
        //     },
        //     {
        //         "question": "Which of the following is NOT a potential benefit of AI?",
        //         "options": [
        //             "Increased efficiency",
        //             "Improved accuracy",
        //             "Reduced costs",
        //             "Job displacement"
        //         ],
        //         "correct": "Job displacement",
        //         "explanation": "Job displacement is a potential negative consequence of AI, as AI systems can automate tasks that were previously performed by humans."
        //     },
        //     {
        //         "question": "What is the main ethical concern associated with AI?",
        //         "options": [
        //             "Bias",
        //             "Lack of accountability",
        //             "Job loss",
        //             "Invasion of privacy"
        //         ],
        //         "correct": "Bias",
        //         "explanation": "Bias is a major ethical concern associated with AI, as AI systems can inherit biases from the data they are trained on."
        //     },
        //     {
        //         "question": "Which of the following is a key challenge in developing safe and responsible AI?",
        //         "options": [
        //             "Ensuring data privacy",
        //             "Mitigating bias",
        //             "Preventing misuse",
        //             "All of the above"
        //         ],
        //         "correct": "All of the above",
        //         "explanation": "All of the listed options are key challenges in developing safe and responsible AI."
        //     },
        //     {
        //         "question": "What is the term used to describe AI systems that can reason and plan like humans?",
        //         "options": [
        //             "Symbolic AI",
        //             "Cognitive AI",
        //             "Expert systems",
        //             "Rule-based AI"
        //         ],
        //         "correct": "Cognitive AI",
        //         "explanation": "Cognitive AI refers to AI systems that are designed to mimic human reasoning and planning abilities."
        //     },
        //     {
        //         "question": "Which of the following industries is AI having a significant impact on?",
        //         "options": [
        //             "Healthcare",
        //             "Finance",
        //             "Transportation",
        //             "All of the above"
        //         ],
        //         "correct": "All of the above",
        //         "explanation": "AI is having a significant impact on a wide range of industries, including healthcare, finance, and transportation."
        //     },
        //     {
        //         "question": "What is the goal of reinforcement learning?",
        //         "options": [
        //             "To optimize a reward function",
        //             "To predict future events",
        //             "To generate natural language",
        //             "To classify data"
        //         ],
        //         "correct": "To optimize a reward function",
        //         "explanation": "Reinforcement learning is a type of machine learning that aims to optimize a reward function by interacting with the environment."
        //     },
        //     {
        //         "question": "Which of the following is a potential application of AI in healthcare?",
        //         "options": [
        //             "Early disease detection",
        //             "Personalized treatment planning",
        //             "Drug discovery",
        //             "All of the above"
        //         ],
        //         "correct": "All of the above",
        //         "explanation": "AI has a wide range of potential applications in healthcare, including early disease detection, personalized treatment planning, and drug discovery."
        //     },
        //     {
        //         "question": "What is the ultimate goal of AI research?",
        //         "options": [
        //             "To create machines that are smarter than humans",
        //             "To solve complex problems that are beyond human capabilities",
        //             "To improve human lives",
        //             "All of the above"
        //         ],
        //         "correct": "All of the above",
        //         "explanation": "The ultimate goal of AI research is to create machines that can solve complex problems, improve human lives, and potentially even surpass human intelligence."
        //     }
        // ];

        const [selectedOption, setSelectedOption] = useState(null);
        const [showExplanation, setShowExplanation] = useState(false);

        const handleOptionSelect = (option) => {
            setSelectedOption(option);
            setShowExplanation(true);
        };

        return (
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center my-8">AI Quiz</h1>
                {ques && ques.map((q, index) => (
                    <div key={index} className="my-8">
                        <h3 className="text-xl font-semibold">{q.question}</h3>
                        <ul className="mt-4">
                            {q.options.map((option, i) => (
                                <li key={i} className="my-2">
                                    <label className="inline-flex items-center">
                                        <input type="radio" className="form-radio h-4 w-4 text-indigo-600" name={`question${index}`} value={option} onChange={() => handleOptionSelect(option)} />
                                        <span className={`ml-2 ${selectedOption === option && selectedOption === q.correct ? 'text-green-600 font-bold' : ''}`}>{option}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {showExplanation && selectedOption === q.correct && (
                            <>
                                <p className="mt-4"><strong>Correct Answer:</strong> {q.correct}</p>
                                <p className="mt-2"><strong>Explanation:</strong> {q.explanation}</p>
                            </>
                        )}
                    </div>
                ))}
                <div className="text-center my-8">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
            </div>
        );
    }
