// "use client"
// import ImageToText from "@/components/textExtractor/imageToText"
import SearchTopic from "@/components/SearchTopic";
import Question from "@/components/Question";
import Card from "@/components/Card";
import NavBar from "@/components/header/header";
// import {signIn,signOut} from "next-auth/react";

export default function App(){

  return(
      <>
          {/*<button onClick={() => signIn()}>Sign in</button>*/}
          {/*<button onClick={() => signOut()}>Sign out</button>*/}
          <NavBar/>
          {/*<SearchTopic/>*/}
      {/*<ImageToText/>*/}
          {/*<Question/>*/}
          {/*<Card/>*/}
    </>
  )
}
