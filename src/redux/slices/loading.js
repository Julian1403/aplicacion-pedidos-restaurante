import { createSlice } from '@reduxjs/toolkit';


const loadingSlice = createSlice({
 name: 'loading',//nombre del alamcen
 //estados inicialies:
 initialState: {
    isLoading: false
 },
 reducers: {
    setLoading:(state, action)=>{//esta es una acción
        return{
            ...state,
            isLoading: action.payload
        }
    }
 }
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;