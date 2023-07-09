import { configureStore } from '@reduxjs/toolkit'
import advSearchSlice  from './advSearch'
 
import loginReducer  from './loginSlice'
import searchrowSlice from './searchrowSlice'
import signupReducer from './signupSlice'
import viewContactSlice from './viewContactSlice'
import searchSlice from './searchSlice'
import footerSlice from './footerSlice'
export const store = configureStore({
  reducer: {
    login:loginReducer,
    signup:signupReducer,
    viewContact:viewContactSlice,
    searchRow:searchrowSlice,
    advSearch:advSearchSlice,
    search:searchSlice,
    footer:footerSlice
    
  },
})   