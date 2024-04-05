// "use client"
import ImageToText from "@/components/textExtractor/imageToText"
import SearchTopic from "@/components/SearchTopic";
import Question from "@/components/Question";
import NavBar from "@/components/header/header";
// import {signIn,signOut} from "next-auth/react";
import QuizForm from "@/components/GenerateQuiz/QuizForm";
import SearchBar from "@/components/Search/SearchBar";
import Tab from "@/components/header/tab";
import Hero from "@/components/Home/hero";
import BottomNavigation from "@/components/header/BottomNavigation";
export default function App(){

  return(
      <>
      <Tab/>
          <Hero/>
          <BottomNavigation/>
          {/* <NavBar/> */}
          {/* <SearchBar/> */}
          {/*<QuizForm/>*/}
          {/*<button onClick={() => signIn()}>Sign in</button>*/}
          {/*<button onClick={() => signOut()}>Sign out</button>*/}
          {/*<SearchTopic/>*/}
      {/*<ImageToText/>*/}
          {/*<Question/>*/}
    </>
  )
}
