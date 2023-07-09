import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:false,
} 

 export const loginSlice  = createSlice({
    name:'login',
    initialState,
    reducers:{
        openLogin:(state)=>{
            state.value = true
        },
        closeLogin:(state)=>{
            state.value = false
        }
    }
 })
// Action creators are generated for each case reducer function
export const { openLogin, closeLogin } = loginSlice.actions

export default loginSlice.reducer