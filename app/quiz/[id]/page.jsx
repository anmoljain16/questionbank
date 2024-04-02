"use client"
import axios from "axios";
import {useState, useEffect} from "react";
import QuestionsSlider from "@/components/QuestionsSlider";

export default function AttemptQuiz({params}) {



    // {
    //     "_id": "660af8fe6c8c2801fe53aba9",
    //     "subject": "Programming",
    //     "topic": "C++",
    //     "questions": [
    //         {
    //             "question": "Which of the following is a valid declaration of a pointer variable in C++?",
    //             "options": [
    //                 "int *p;",
    //                 "int p *;",
    //                 "* int p;",
    //                 "int * p"
    //             ],
    //             "correct": "int *p;",
    //             "explanation": "In C++, a pointer variable is declared using the syntax 'data_type *variable_name;'. Therefore, the correct option is 'int *p;'",
    //             "_id": "660af8fe6c8c2801fe53abaa"
    //         },
    //         {
    //             "question": "What is the purpose of using the 'new' operator in C++?",
    //             "options": [
    //                 "To allocate dynamic memory",
    //                 "To deallocate dynamic memory",
    //                 "To initialize a pointer variable",
    //                 "To copy the contents of one pointer to another"
    //             ],
    //             "correct": "To allocate dynamic memory",
    //             "explanation": "The 'new' operator is used to allocate memory dynamically during runtime. It returns a pointer to the allocated memory.",
    //             "_id": "660af8fe6c8c2801fe53abab"
    //         },
    //         {
    //             "question": "Which of the following is a valid way to access the value stored in a pointer variable?",
    //             "options": [
    //                 "*p",
    //                 "&p",
    //                 "p()",
    //                 "p[]"
    //             ],
    //             "correct": "*p",
    //             "explanation": "The asterisk (*) operator is used to dereference a pointer variable and access the value stored at the memory location it points to.",
    //             "_id": "660af8fe6c8c2801fe53abac"
    //         },
    //         {
    //             "question": "What is the difference between a pointer and a reference in C++?",
    //             "options": [
    //                 "Pointers can be reassigned, while references cannot",
    //                 "References cannot be NULL, while pointers can",
    //                 "Pointers are more efficient than references",
    //                 "References are more flexible than pointers"
    //             ],
    //             "correct": "Pointers can be reassigned, while references cannot",
    //             "explanation": "A pointer is a variable that stores the memory address of another variable, and it can be reassigned to point to a different location. A reference, on the other hand, is an alias for another variable and cannot be reassigned.",
    //             "_id": "660af8fe6c8c2801fe53abad"
    //         },
    //         {
    //             "question": "Which of the following is a disadvantage of dynamic memory allocation?",
    //             "options": [
    //                 "It can lead to memory leaks",
    //                 "It requires manual deallocation of memory",
    //                 "It can result in segmentation faults",
    //                 "All of the above"
    //             ],
    //             "correct": "All of the above",
    //             "explanation": "Dynamic memory allocation allows for flexible memory management but comes with certain disadvantages such as the possibility of memory leaks, the need for explicit deallocation, and potential for segmentation faults if memory is not handled properly.",
    //             "_id": "660af8fe6c8c2801fe53abae"
    //         },
    //         {
    //             "question": "What is the purpose of a destructor in C++?",
    //             "options": [
    //                 "To deallocate memory allocated by the class",
    //                 "To initialize the class object",
    //                 "To copy the contents of one class object to another",
    //                 "To print the contents of the class object"
    //             ],
    //             "correct": "To deallocate memory allocated by the class",
    //             "explanation": "A destructor is a special member function that is called when an object of a class is destroyed. Its purpose is to release any resources allocated by the class, such as deallocating memory.",
    //             "_id": "660af8fe6c8c2801fe53abaf"
    //         },
    //         {
    //             "question": "Which of the following is a valid way to define a friend function in C++?",
    //             "options": [
    //                 "friend void func(class_name obj);",
    //                 "friend func void(class_name obj);",
    //                 "friend void func(obj class_name);",
    //                 "friend void class_name func(obj);"
    //             ],
    //             "correct": "friend void func(class_name obj);",
    //             "explanation": "A friend function is a function that is not a member of a class but has access to its private and protected members. It is defined using the 'friend' keyword followed by the function declaration.",
    //             "_id": "660af8fe6c8c2801fe53abb0"
    //         },
    //         {
    //             "question": "What is the difference between a shallow copy and a deep copy in C++?",
    //             "options": [
    //                 "Shallow copy only copies the reference to the object, while deep copy copies the actual data",
    //                 "Deep copy only copies the reference to the object, while shallow copy copies the actual data",
    //                 "Both shallow and deep copies create new objects in memory",
    //                 "Shallow copy is faster than deep copy"
    //             ],
    //             "correct": "Shallow copy only copies the reference to the object, while deep copy copies the actual data",
    //             "explanation": "Shallow copy creates a new object that shares the same memory location as the original object, while deep copy creates a new object with its own memory space and copies the data from the original object.",
    //             "_id": "660af8fe6c8c2801fe53abb1"
    //         },
    //         {
    //             "question": "Which of the following is a valid way to define a lambda function in C++?",
    //             "options": [
    //                 "auto func = [](int x) -> int { return x * x; }",
    //                 "func [](int x) -> int { return x * x; } auto;",
    //                 "int func(auto x) -> int { return x * x; }",
    //                 "int -> int func [](x) { return x * x; } auto;"
    //             ],
    //             "correct": "auto func = [](int x) -> int { return x * x; }",
    //             "explanation": "A lambda function is an anonymous function that can capture variables from the surrounding scope. It is defined using square brackets and can be assigned to a variable or used directly.",
    //             "_id": "660af8fe6c8c2801fe53abb2"
    //         },
    //         {
    //             "question": "What is the use of the 'const' keyword in C++?",
    //             "options": [
    //                 "To declare a constant variable",
    //                 "To prevent modification of a variable",
    //                 "To prevent the function from being overridden",
    //                 "All of the above"
    //             ],
    //             "correct": "All of the above",
    //             "explanation": "The 'const' keyword can be used to declare a constant variable, prevent modification of a variable, or prevent a function from being overridden.",
    //             "_id": "660af8fe6c8c2801fe53abb3"
    //         }
    //     ],
    //     "questionsCount": 10,
    //     "createdBy": "66058f05fbb2aacd73ab54af",
    //     "tags": [],
    //     "difficulty": "Medium",
    //     "isApproved": false,
    //     "isAnonymous": false,
    //     "createdAt": "2024-04-01T18:12:14.795Z",
    //     "updatedAt": "2024-04-01T18:12:14.795Z",
    //     "__v": 0
    // }
    const [data, setData] = useState(null);

    async function getQuiz() {
        const res = await axios.get(`/api/quiz/getquiz/${params.id}`);
        return res.data;
    }


    useEffect(() => {
        getQuiz().then((res) => {
            setData(res.data);
        });
    }, [])


    return (
        <div>
            {data && <QuestionsSlider ques={data.questions} />}
        </div>


    )
}
