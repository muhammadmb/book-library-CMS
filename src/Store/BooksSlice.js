import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";

const initialState = {
    books: [],
    errors: "",
    booksLoading: false
}

export const getBooks = createAsyncThunk(
    "books/getBooks",
    async (bookData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const { fields, searchQuery, sortby, pageNumber, pageSize } = bookData;
        try {
            const books = await axios.get(
                `${API_URL}/Genres/00000000-0000-0000-0000-000000000000/Books?${fields ? `fields=${fields}` : ''}${searchQuery ? `&SearchQuery=${searchQuery}` : ''}${pageNumber ? `&PageNumber=${pageNumber}` : ''}${pageSize ? `&PageSize=${pageSize}` : ''}${sortby ? `&sortby=${sortby}` : ''}`
            );
            return books.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const BooksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: {
        [getBooks.pending]: (state, action) => {
            state.booksLoading = true;
            state.errors = null;
        },
        [getBooks.fulfilled]: (state, action) => {
            state.books = action.payload;
            state.booksLoading = false;
        },
        [getBooks.rejected]: (state, action) => {
            state.booksLoading = false;
            state.errors = action.payload;
        }
    }
});

export default BooksSlice.reducer;