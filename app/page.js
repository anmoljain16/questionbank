// "use client"
import ImageToText from "@/components/textExtractor/imageToText"
import SearchTopic from "@/components/SearchTopic";
import Question from "@/components/Question";
import Card from "@/components/Card";
import NavBar from "@/components/header/header";
// import {signIn,signOut} from "next-auth/react";
import QuizForm from "@/components/GenerateQuiz/QuizForm";
import SearchBar from "@/components/Search/SearchBar";
import Tab from "@/components/header/tab";
import QuizPage from "@/components/Quiz/QuizPage";
export default function App(){

  return(
      <>
      <Tab/>
          <QuizPage/>
          {/* <NavBar/> */}
          {/* <SearchBar/> */}
          {/*<QuizForm/>*/}
          {/*<button onClick={() => signIn()}>Sign in</button>*/}
          {/*<button onClick={() => signOut()}>Sign out</button>*/}
          {/*<SearchTopic/>*/}
      {/*<ImageToText/>*/}
          {/*<Question/>*/}
          {/*<Card/>*/}
    </>
  )
}
