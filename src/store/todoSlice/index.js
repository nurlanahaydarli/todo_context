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
        toggleTodo: (state, action) => {
            const todo = state.todo_list.find(todo => todo.id === action.payload);
            if (todo) {
                todo.isCompleted = !todo.isCompleted;
            }
        },
        deleteTodo: (state, action) => {
            console.log(action.payload)
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

export const {addGroup, toggleTodo, deleteTodo, editTodo} = todoSlice.actions;

export default todoSlice.reducer;