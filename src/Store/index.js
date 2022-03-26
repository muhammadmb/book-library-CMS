import { configureStore } from "@reduxjs/toolkit";
import auth from "./AuthSlice";

export default configureStore({
    reducer: {
        auth
    },
});