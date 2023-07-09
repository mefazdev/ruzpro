import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    value:true
}

export const footerSlice = createSlice({
    name:'footer',
    initialState,
    reducers:{
        openFooter:(state)=>{
            state.value = true
        },
        closeFooter:(state)=>{
            state.value = false
        }
    }
})

export const {openFooter,closeFooter} = footerSlice.actions

export default footerSlice.reducer