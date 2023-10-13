import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    client: null,
    table: null,
    products: [],
    subtotal: 0,
    total: 0,
    impuesto: 0
  };

const pedidosSlice = createSlice({
 name: 'pedidosStore',
 initialState,
 reducers: {
    setClientDataAction:(state, action)=>{
        
        return{
            ...state,
            client: action.payload
        }
    },
    //ahora agreguemos otra acción
    setAddProductAction:(state, action)=>{
        //estos renglones no los tenia antes 
        const price = parseFloat(action.payload.price);
        const impuesto = price * 0.19; // Calcula el impuesto (19% del precio)
        const propina = (state.total + price + impuesto) * 0.10; // Calcula la propina (10% del total)

        return{
            ...state,
            // products: [...state.products, action.payload.id],
            // subtotal: state.subtotal + parseFloat(action.payload.price),
            // impuesto:state.impuesto+(0.19*subtotal),
            // total: state.total + parseFloat(action.payload.price)
    products: [...state.products, action.payload.id],
    subtotal: state.subtotal + price,
    impuesto: state.impuesto + impuesto, // Actualiza el impuesto
    total: state.total + price + impuesto+ propina // Actualiza el total incluyendo el impuesto
        }
    },
    selectTableAction:(state, action)=>{
        return{
            ...state,
            table:action.payload//acá recibo el id de la table seleccionada
        }
    },
    resetStateAction: () => {
      return initialState; // Reinicia al estado inicial
    }

 }
});

export const { setClientDataAction, setAddProductAction, selectTableAction, resetStateAction } = pedidosSlice.actions;

export default pedidosSlice.reducer;