import Cards from "@/components/quizPage/cards";
import Tab from "@/components/header/tab";
import Footer from "@/components/Footer/Footer";
// import BottomNavigation from "@/components/header/BottomNavigation";

export const metadata = {
    title : "Quizzes",
    description : "Explore a world of engaging quizzes on diverse topics! " +
        "Create, share, and discover captivating quizzes effortlessly with our intuitive platform. " +
        "Start your A Quiz today!",
    keywords : ["quiz", "quizzes", "AI", "nextjs"],
    url : "https://questionbank.anmoljain.tech/quiz",
}

export default function Quiz(){
    return(
        <div>
            {/*<NavBar/>*/}
           <Tab/>

            <Cards/>
            <Footer/>
        </div>
    )
}
