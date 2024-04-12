import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    quizTag : ""
}

const QuizSlice = createSlice({
    name:"QuizTags",
    initialState,
    reducers:{
        addQuizTag:(state, action) => {
            // console.log(action)
            state.quizTag = {
                id: nanoid(),
                name: action.payload
            }
        }
    }
})

export const {addQuizTag} = QuizSlice.actions;
export default QuizSlice.reducer;

