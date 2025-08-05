import { configureStore } from '@reduxjs/toolkit'
import Slice from './Slice'


const Store = configureStore({
     reducer : {
          data : Slice
     },
     devTools : false
})

export default Store