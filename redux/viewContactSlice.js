import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:false,
} 

 export const viewContactSlice  = createSlice({
    name:'viewContact',
    initialState,
    reducers:{
        openContact:(state)=>{
            state.value = true
        },
        closeContact:(state)=>{
            state.value = false
        }
    }
 })
// Action creators are generated for each case reducer function
export const { openContact,closeContact } = viewContactSlice.actions

export default viewContactSlice.reducer