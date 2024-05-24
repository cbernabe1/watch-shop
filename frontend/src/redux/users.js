import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    user: {email:"",password: ""},
    isLogged: false
};

const host = "http://localhost:3000/api";

export const addUser = createAsyncThunk(
    "addUser",
    async(data,{rejectWithValue})=>{
        try {
            const result = await axios.post(host+("/addUser"),data);
            console.log(result);
        } catch (error) {
            return rejectWithValue({error: error.message})
        }
    }
);

export const loginUser = createAsyncThunk(
    "loginUser",
    async(data,{rejectWithValue})=>{
        try {
            const result = await axios.post(host+"/login",data);
            return result.data[0];
        } catch (error) {
            return rejectWithValue({error: error.message});
        }
    }
)

export const contactPage = createAsyncThunk(
    "contactPage",
    async(data,{rejectWithValue})=>{
        try {
            console.log(data);
            const result = await axios.post(host+"/contacts",data);
            return result.status;
        } catch (error) {
            return rejectWithValue({error: error.message});
        }
    }
)

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logoutUser: (state,action)=>{
            state.user = {email: "", password: ""};
            state.isLogged = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            const {email,password} = action.payload;
            state.user = {email: email, password: password};
            state.isLogged = true;
        })
    }
});

export const {logoutUser} = userSlice.actions;

export default userSlice.reducer;