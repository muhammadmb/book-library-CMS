import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    statistics: {},
    bookStatistics: [],
    errors: "",
    headers: "",
    status: "",
    statistcsLoading: false
}

export const getStatistics = createAsyncThunk(
    "statistics/getStatistics",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }

        try {
            const statistics = await axios.get(`${API_URL}/statistics`,
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
            return statistics;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const getBookStatistics = createAsyncThunk(
    "statistics/getBookStatistics",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }

        try {
            const bookStatistics = await axios.get(`${API_URL}/statistics/books`,
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
            return bookStatistics;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const StatisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {},
    extraReducers: {
        [getBookStatistics.pending]: (state, action) => {
            state.errors = null;
            state.statistcsLoading = true;
        },
        [getBookStatistics.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.bookStatistics = action.payload.data;
                state.headers = action.payload.headers;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.statistcsLoading = false;
        },
        [getBookStatistics.rejected]: (state, action) => {
            state.errors = action.payload;
            state.statistcsLoading = false;
        },

        [getStatistics.pending]: (state, action) => {
            state.errors = null;
            state.statistcsLoading = true;
        },
        [getStatistics.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.statistics = action.payload.data;
                state.headers = action.payload.headers;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.statistcsLoading = false;
        },
        [getStatistics.rejected]: (state, action) => {
            state.errors = action.payload;
            state.statistcsLoading = false;
        }
    }
});

export default StatisticsSlice.reducer;