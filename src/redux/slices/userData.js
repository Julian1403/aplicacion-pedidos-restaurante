import { createSlice } from '@reduxjs/toolkit';

const userDataSlice=createSlice({
    name:'userData', 
    initialState:{// es initial state no satate. 
        token: null,
        isAuth: false,
        email: null,
        name: null
     },
     //los reducers son acciones. 
     reducers: {
        setSignIn:(state, action)=>{
            localStorage.setItem("token", action.payload.token);
            return{
                ...state,
                token: action.payload?.token,
                isAuth: true, //cuando se llama el setSignIn el isAuth cambia de estado(de false a true) sin necesidad de modificarlo en el obejto de la accion. 
                email: action.payload.email,
                name:  action.payload.name
            }
        },
        setLogout:(state, action)=>{
            localStorage.clear();
            return{
                ...state,
                isAuth: false,
                token: null
            }
        }
    }
});
export const { setSignIn, setLogout} = userDataSlice.actions;

export default userDataSlice.reducer;