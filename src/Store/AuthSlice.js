import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAuth } from "../API/axios";

const initialState =
    localStorage.getItem("user") ?
        JSON.parse(localStorage.getItem("user"))
        :
        {
            firstName: "",
            LastName: "",
            isLoggedIn: false,
            roles: [],
            success: false,
            errors: null,
            loading: false,
            token: ""
        };

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const log = await axiosAuth.post('/AuthenticationManagement/Login', {
                email: userData.email,
                password: userData.password
            });
            return log.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const token = await axiosAuth.post('/AuthenticationManagement/RefreshToken', {
                token: JSON.parse(localStorage.getItem("user")).token
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
            return token.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: async (state) => {
            localStorage.removeItem("user");
            return state = initialState;
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.success = true;
            state.errors = null;
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.errors = action.payload.errors;
            state.success = action.payload.success;
            state.firstName = action.payload.firstName;
            state.LastName = action.payload.LastName;
            state.roles = action.payload.roles;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(state));
        },
        [login.rejected]: (state, action) => {
            state.errors = action.payload;
            state.success = false;
            state.loading = false;
            localStorage.setItem("user", JSON.stringify(state));
        },

        [refreshToken.pending]: (state, action) => {
            state.success = true;
            state.errors = null;
        },
        [refreshToken.fulfilled]: (state, action) => {
            if (action.payload?.errors === "Refresh token missed") {
                localStorage.removeItem("user");
                return state = initialState;
            }
            state.token = action.payload.token ? action.payload.token : JSON.parse(localStorage.getItem("user"))?.token;
            state.loading = false;
            state.errors = action.payload.errors;
            localStorage.setItem("user", JSON.stringify(state));
        },
        [refreshToken.rejected]: (state, action) => {
            console.log(action.payload)
            console.log(action)
            state.errors = action.payload;
            state.success = false;
            localStorage.setItem("user", JSON.stringify(state));
        }
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;