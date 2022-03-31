import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";
const initialState = {
    books: [],
    errors: "",
    booksLoading: false,
    headers: ""
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
            return books;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (bookData, thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        const { bookId, genreId } = bookData;

        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            thunkAPI.dispatch(refreshToken());
        }
        setTimeout(async () => {
            try {
                const books = await axios.delete(`${API_URL}/Genres/${genreId}/Books/${bookId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
                        }
                    });
                return books.data;
            }
            catch (error) {
                return rejectWithValue(error.message);
            }
        }, 200);
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
            state.books = action.payload.data;
            state.headers = action.payload.headers;
            state.booksLoading = false;
        },
        [getBooks.rejected]: (state, action) => {
            state.booksLoading = false;
            state.errors = action.payload;
        },

        [deleteBook.pending]: (state, action) => {
            state.errors = null;
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.books = state.books.filter((b) => b.id !== action.meta?.arg?.bookId);
        },
        [deleteBook.rejected]: (state, action) => {
            state.booksLoading = false;
            state.errors = action.payload;
        }
    }
});

export default BooksSlice.reducer;