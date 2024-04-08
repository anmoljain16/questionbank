import Tab from "@/components/header/tab";
import Hero from "@/components/Home/hero";
import BottomNavigation from "@/components/header/BottomNavigation";
import Footer from "@/components/Footer/Footer";

export const metadata = {
    title: "AQuiz",
    description: "Explore a world of engaging quizzes on diverse topics! " +
        "Create, share, and discover captivating quizzes effortlessly with our intuitive platform. " +
        "Start your A Quiz today!",
    keywords:["quiz", "quizzes", "AI", "artificial intelligence", "machine learning"] ,
    url: "https://questionbank.anmoljain.tech/",
    type: "website",
    siteName: "AQuiz",
    creator: "Anmol Jain",
};


export default function App(){

  return(
      <>
      <Tab/>
          <Hero/>
          <Footer/>
          <BottomNavigation/>

    </>
  )
}
