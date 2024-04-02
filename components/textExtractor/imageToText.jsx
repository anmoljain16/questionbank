"use client"

import { useState} from 'react';
import Tesseract from 'tesseract.js';
import "@/components/textExtractor/ImageToText.css"
import {getQuestions} from "@/utils/GeminiAi";

export default function ImageToText() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState({
        data:null
  });

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }

  const handleClick = () => {

    Tesseract.recognize(
        imagePath,'eng',
        {
          // logger: m => console.log(m)
        }
    )
        .catch (err => {
          console.error(err);
        })
        .then(result => {
          // Get Confidence score
          let confidence = result.data.confidence
          console.log(confidence);
          let text = result.data.text
          setText(text);
            getQuestions(text).then((res)=>{
                // console.log(res)
                setQuestions(
                    {
                        data:res
                    }
                )
            }).catch((err)=>{
                console.log(err)
            })
        })
        .finally(() => {
          // Show the hidden image and canvas after processing is complete
          // imageRef.current.classList.add('visible');
          // canvasRef.current.classList.add('visible');
          //   document.querySelector(".question-box").style.display = "block";
          //   document.querySelector("img").style.display = "none";
          //   document.querySelector(".text-box").style.display = "none";
            console.log(questions)
        });
  }

  return (
      <div className="App">
          <main className="App-main">
              <h3>Actual imagePath uploaded</h3>
              <img
                  src={imagePath} className="App-image" alt="logo"/>

              <h3>Extracted text</h3>
              <div className="text-box">
                  <p> {text} </p>
              </div>
              <input type="file" onChange={handleChange} accept="image/*"/>

              <button onClick={handleClick} style={{height: 50}}> convert to text</button>

          </main>
          {questions.data && (
              <div>
              <h3>Questions</h3>
                    <div className="question-box">
                        {questions.data.map((question, index) => (
                            <div key={index} className="question">
                                <p>Question {index} : {question.question}</p>
                                {question.options.map((option, index) => (
                                    <p key={index+1}>{option}</p>
                                ))}
                                <p>Correct Answer: {question.correctOption || question.correct_option}</p>
                                <p>Explanation: {question.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>

          )}
      </div>
  );
}











// import { useState, useRef } from 'react';
// import preprocessImage from './preprocess';
// import Tesseract from 'tesseract.js';
// import './imageToText.css';

// function App() {
//   const [image, setImage] = useState("");
//   const [text, setText] = useState("");
//   const canvasRef = useRef(null);
//   const imageRef = useRef(null);

//   const handleChange = (event) => {
//     const uploadedImage = event.target.files[0];
//     const imageUrl = URL.createObjectURL(uploadedImage);

//     // Create a new Image object
//     const img = new Image();
//     img.onload = () => {
//       // Once the image is loaded, set the dimensions of the canvas to match the image
//       canvasRef.current.width = img.width;
//       canvasRef.current.height = img.height;

//       // Draw the image onto the canvas
//       const ctx = canvasRef.current.getContext('2d');
//       ctx.drawImage(img, 0, 0);

//       // Set the state to update the displayed image
//       setImage(imageUrl);

//       // Show the hidden image and canvas
//       imageRef.current.classList.add('visible');
//       canvasRef.current.classList.add('visible');
//     };

//     // Set the src attribute of the Image object to trigger the onload event
//     img.src = imageUrl;
//   };

//   const handleClick = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(imageRef.current, 0, 0);
//     ctx.putImageData(preprocessImage(canvas), 0, 0);
//     const dataUrl = canvas.toDataURL("image/jpeg");

//     Tesseract.recognize(
//       dataUrl, 'eng',
//       {
//         logger: m => console.log(m)
//       }
//     )
//       .catch(err => {
//         console.error(err);
//       })
//       .then(result => {
//         // Get Confidence score
//         let confidence = result.data.confidence
//         console.log(confidence);
//         // console.log(confidence)
//         // Get full output
//         let text = result.data.text

//         setText(text);
//       })
//       .finally(() => {
//         // Show the hidden image and canvas after processing is complete
//         // imageRef.current.classList.add('visible');
//         canvasRef.current.classList.add('visible');
//       });
//   };

//   return (
//     <div className="App">
//       <main className="App-main">
//         <h3>Actual image uploaded</h3>
//         <img
//           src={image} className="App-logo"
//           alt="logo"
//           ref={imageRef}
//         />
//         <h3>Canvas</h3>
//         <canvas ref={canvasRef} width={700} height={700}></canvas>
//         <h3>Extracted text</h3>
//         <div className="pin-box">
//           <p> {text} </p>
//         </div>
//         <input type="file" onChange={handleChange} />
//         <button onClick={handleClick} style={{ height: 50 }}>Convert to text</button>
//       </main>
//     </div>
//   );
// }

// export default App;





