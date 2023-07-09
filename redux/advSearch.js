import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value:false
}

export const advSearchSlice = createSlice({
    name:'advsearch',
    initialState,
    reducers:{
        openAdvSearch:(state)=>{
            state.value = true
        },
        closeAdvSearch:(state)=>{
            state.value = false
        }
    }
})

export const {openAdvSearch,closeAdvSearch} = advSearchSlice.actions

export default advSearchSlice.reducer