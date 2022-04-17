import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    suggestions: [],
    errors: null,
    headers: "",
    status: "",
    suggestionLoading: false,
    suggestionDeleting: false
}

export const getSuggestions = createAsyncThunk(
    "suggestions/getSuggestions",
    async (suggestionData, thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }

        const { pageNumber, pageSize, searchQuery } = suggestionData;
        try {
            const Suggestions = await axios.get(`${API_URL}/Suggestions?${searchQuery ? `SearchQuery=${searchQuery}` : ''}${pageNumber ? `&PageNumber=${pageNumber}` : ''}${pageSize ? `&PageSize=${pageSize}` : ''}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
                    }
                })
                .catch(
                    function (error) {
                        if (error.response) {
                            return (error.response)
                        } else if (error.request) {
                            return (error.request)
                        } else {
                            return (error.message)
                        }
                    });
            return Suggestions;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteSuggestion = createAsyncThunk(
    "Suggestions/deleteSuggestion",
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const Suggestion = await axios.delete(`${API_URL}/Suggestions/${id}`,
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
            return Suggestion;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const SuggestionsSlice = createSlice({
    name: "suggestions",
    initialState,
    reducers: {},
    extraReducers: {
        [getSuggestions.pending]: (state, action) => {
            state.errors = null;
            state.suggestionLoading = true;
        },
        [getSuggestions.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.suggestions = action.payload.data;
                state.headers = action.payload.headers;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.suggestionLoading = false;
        },
        [getSuggestions.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [deleteSuggestion.pending]: (state, action) => {
            state.suggestionDeleting = true;
            state.errors = null;
        },
        [deleteSuggestion.fulfilled]: (state, action) => {
            if (action.payload.status === 204) {
                state.errors = null;
                state.suggestions = state.suggestions.filter((g) => g.id !== action.meta?.arg);
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.suggestionDeleting = false;
        },
        [deleteSuggestion.rejected]: (state, action) => {
            state.errors = action.payload;
        }

    }
});

export default SuggestionsSlice.reducer;