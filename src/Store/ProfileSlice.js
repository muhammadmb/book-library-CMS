import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState =
{
    profile: {},
    errors: null,
    headers: "",
    status: "",
    profileLoading: false,
    profileUpdating: false
}

export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }

        try {
            const profile = await axios.get(`${API_URL}/myProfile`,
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
            return profile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editProfile = createAsyncThunk(
    "profile/editProfile",
    async (profileData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }

        try {
            const profile = await axios.patch(`${API_URL}/myProfile`,
                profileData,
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
            return profile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: {
        [getProfile.pending]: (state, action) => {
            state.profileLoading = true;
            state.errors = null;
        },
        [getProfile.fulfilled]: (state, action) => {
            state.profile = action.payload.data;
            state.headers = action.payload.headers;
            state.status = action.payload.status;
            state.errors = action.payload?.data?.errors;
            state.profileLoading = false;
        },
        [getProfile.rejected]: (state, action) => {
            state.errors = action.payload;
            state.profileLoading = false;
        },

        [editProfile.pending]: (state, action) => {
            state.profileUpdating = true;
            state.errors = null;
        },
        [editProfile.fulfilled]: (state, action) => {
            state.status = action.payload.status;
            state.profileUpdating = false;
        },
        [editProfile.rejected]: (state, action) => {
            state.errors = action.payload;
            state.profileUpdating = false;
        },
    }
});

export default ProfileSlice.reducer;