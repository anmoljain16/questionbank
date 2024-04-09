import Cards from "@/components/quizPage/cards";
import Tab from "@/components/header/tab";
import Footer from "@/components/Footer/Footer";
import BottomNavigation from "@/components/header/BottomNavigation";

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
