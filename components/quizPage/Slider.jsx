import {getSubjects} from "@/app/api/quiz/getsubjects/route";
import SliderTags from "@/components/quizPage/SliderTags";


export default async function Slider(){
    const data = await getSubjects();
    // console.log(data.data);

    const subjects = data.data

    if(data.error){
        return <></>
    }


    if(data.data) {

        return (
            <div className="mx-10 md:mx-40 justify-self-center">
                <div className="flex gap-4 py-6  [&::-webkit-scrollbar]:hidden  overflow-x-auto">
                    <SliderTags subjects={subjects}/>
                </div>
            </div>

        )

    }
}
