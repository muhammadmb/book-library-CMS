import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../API/axios";

const initialState =
    localStorage.getItem("user") ?
        JSON.parse(localStorage.getItem("user"))
        :
        {
            name: "",
            isLoggedIn: false,
            roles: [],
            success: false,
            errors: null,
            loading: false
        };

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const log = await axiosPrivate.post('/AuthenticationManagement/Login', {
                email: userData.email,
                password: userData.password
            });
            console.log(log.data);
            return log.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.success = true;
            state.errors = null;
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.errors = action.payload.errors;
            state.success = action.payload.success;
            state.name = action.payload.name;
            state.roles = action.payload.roles;
            state.isLoggedIn = true;
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(state));
        },
        [login.rejected]: (state, action) => {
            state.errors = action.payload;
            state.success = false;
            state.loading = false;
        }
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;