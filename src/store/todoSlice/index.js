import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    todo_list: [],
};
const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        addGroup: (state, action) => {
            state.todo_list = [...state.todo_list, action.payload];
        },
        completedTodo: (state, action) => {
            const index = state.todo_list.findIndex(obj => obj.id === action.payload.id);
            if (index !== -1) {
                state.todo_list[index].isCompleted = {...state.todo_list[index].isCompleted, ...action.payload};
            }
        },
        deleteTodo: (state, action) => {
            state.todo_list = state.todo_list.filter((data) => {
                return data.id !== action.payload.id
            })
        },
        editTodo: (state, action) => {
            const index = state.todo_list.findIndex(obj => obj.id === action.payload.id);
            if (index !== -1) {
                state.todo_list[index] = {...state.todo_list[index], ...action.payload};
            }
        }
    },
});

export const {addGroup, completedTodo, deleteTodo, editTodo} = todoSlice.actions;

export default todoSlice.reducer;