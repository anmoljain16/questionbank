import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    quizTag: "",
    score: localStorage.getItem("score") || 0
};

const QuizSlice = createSlice({
    name: "QuizTags",
    initialState,
    reducers: {
        addQuizTag: (state, action) => {
            state.quizTag = {
                id: nanoid(),
                name: action.payload
            };
        },
        addScore: (state, action) => {
            state.score += action.payload;

        },
        resetScore: (state) => {
            state.score = 0;
        }
    }
});

export const {addQuizTag, addScore, resetScore} = QuizSlice.actions;
export default QuizSlice.reducer;
