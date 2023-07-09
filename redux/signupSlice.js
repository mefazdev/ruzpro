import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:false,
} 

 export const signupSlice  = createSlice({
    name:'signup',
    initialState,
    reducers:{
        openSignup:(state)=>{
            state.value = true
        },
        closeSignup:(state)=>{
            state.value = false
        }
    }
 })
// Action creators are generated for each case reducer function
export const { openSignup, closeSignup } = signupSlice.actions

export default signupSlice.reducer