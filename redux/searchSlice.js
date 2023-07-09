import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:false,
} 

 export const searchSlice  = createSlice({
    name:'search',
    initialState,
    reducers:{
        onSearch:(state)=>{
            state.value = true
        },
        offSearch:(state)=>{
            state.value = false
        }
    }
 })
// Action creators are generated for each case reducer function
export const { onSearch, offSearch } = searchSlice.actions

export default searchSlice.reducer