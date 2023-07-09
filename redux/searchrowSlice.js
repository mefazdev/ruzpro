import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value:false
}

export const searchrowSlice = createSlice({
    name:'searchrow',
    initialState,
    reducers:{
        openSearchrow:(state)=>{
            state.value = true
        },
        closeSearchrow:(state)=>{
            state.value = false
        }
    }
})

export const {openSearchrow,closeSearchrow} = searchrowSlice.actions

export default searchrowSlice.reducer