import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    appRoles: [],
    errors: "",
    headers: "",
    status: "",
    rolesLoading: false
}

export const getRoles = createAsyncThunk(
    "roles/getRoles",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const roles = await axios.get(`${API_URL}/setup`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
                    }
                }).catch(
                    function (error) {
                        if (error.response) {
                            return (error.response)
                        } else if (error.request) {
                            return (error.request)
                        } else {
                            return (error.message)
                        }
                    });
            return roles;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const RolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: {
        [getRoles.pending]: (state, action) => {
            state.errors = null;
            state.rolesLoading = true;
        },
        [getRoles.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.appRoles = action.payload.data;
                state.headers = action.payload.headers;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.rolesLoading = false;
        },
        [getRoles.rejected]: (state, action) => {
            state.errors = action.payload;
        }
    }
});

export default RolesSlice.reducer;