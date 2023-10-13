import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from './slices/userData';
import loadingSlice from './slices/loading';
import pedidosSlice from './slices/pedidosStore'


export default configureStore({
    reducer: {
        loading:loadingSlice,
        userData: userDataSlice,
        pedidosStore:pedidosSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})