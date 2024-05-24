import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const host = "http://localhost:3000/api";


export const fetchCart = createAsyncThunk(
    "fetchCart",
    async(a,{rejectWithValue})=>{
        try {
            const response = await axios.get(host+"/fetchCart");
            return {cart: response.data};
        } catch (error) {
            return rejectWithValue({error: error.messagee});
        }
    }
)

export const addToCart = createAsyncThunk(
    "addToCart",
    async(data,{rejectWithValue})=>{
        try {
            const response = await axios.post(host+"/addToCart",{id: data.watch.id, quantity: data.quantity}); 
            return response.data;   
            } catch (error) {
            return rejectWithValue({error: error.message});
        }
    }
);

export const updateCart = createAsyncThunk(
    "updateCart",
    async(data,{rejectWithValue})=>{
        try {
            const response = await axios.patch(host+"/updateCart",data);
            return response.data;
        } catch (error) {
            return rejectWithValue({error: error.message});
        }
    }
);

export const removeItem = createAsyncThunk(
    "removeItem",
    async(data,{rejectWithValue})=>{
        try {
            console.log(host+"/removeItem",data);
            const response = await axios.post(host+"/removeItem",data);
            if(response.status === 200){
                return data;
            }
        } catch (error) {
            return rejectWithValue({error: error.message});
        }
    }
)

const initialState = {
    cart: [],
    loading: false,
    error: null
}


const cartSlice = createSlice({ 
    name: "carts",
    initialState,
    reducers:{
        apiRequested: (state,action)=>{
            state.loading = true;
        },
        apiRequestedFailed: (state,action)=>{
            state.loading = false;

        },
        getCart: (state,action) =>{
            state = action.payload;
            state.loading = false
            console.log(state);
        },
        deleteCartItem: (state,action)=>{
            const findItem = state.cart.findIndex(item => item.id === action.payload.id);
            state.cart.splice(findItem,1); 
        }
    },
    extraReducers:builder => {
        builder
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.cart = action.payload.cart;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.cart = action.payload;
        })
        .addCase(updateCart.fulfilled,(state,action)=>{
            state.cart = action.payload;
        })
        .addCase(removeItem.fulfilled,(state,action)=>{
            const findItem = state.cart.findIndex(item => item.id === action.payload.id);
            state.cart.splice(findItem,1);
        })
    }
})
export const {addItem,updateItem,getCart, apiRequested, apiRequestedFailed} = cartSlice.actions;
export default cartSlice.reducer;



