import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import axios from 'axios';

const initialState = {
    watches: [],
    loading: false,
    error: null
};

const host = "http://localhost:3000/api";

export const fetchWatches = createAsyncThunk(
    "fetchWatches",
    async(a, {rejectWithValue}) => {
        try {
            const response = await axios.get(host+"/watches");
            return {watches: response.data};
        } catch (error) {
            return rejectWithValue({error: error.message});
        }
    }
);

const watchSlice = createSlice({
    name: "watches",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchWatches.pending, (state,action) => {
            state.loading= true;
        }),
        builder.addCase(fetchWatches.fulfilled, (state,action) => {
            state.watches = action.payload.watches;
            state.loading = false
        }),
        builder.addCase(fetchWatches.rejected, (state,action) => {
            state.error = action.payload.error;
            state.loading= false;
        })
    }
});


export default watchSlice.reducer;


const url = "/watches";

export const loadWatches = () => apiCallBegan({
    url,
    onStart: apiRequested.type,
    onSuccess: getWatches.type,
    onError: apiRequestFailed.type
});