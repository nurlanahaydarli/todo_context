import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice/index";

export const store = configureStore({
    reducer: {
        todo_slice: todoSlice,
        // setting:settingSlice
    },
});