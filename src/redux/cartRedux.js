import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        deleteEntireCart: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        },
        removeProductQuantity: (state, action) => {
            state.quantity = state.products[action.payload].quantity > 1 ? state.quantity : state.quantity - 1;
            state.products[action.payload].quantity > 1 ?
                <>
                    {state.products[action.payload].quantity -= 1}
                </>
                :
                <>
                    {state.products.splice(action.payload, 1)}
                </>;
            state.total = state.products.map((item) => {return item.price * item.quantity}).length>0 ?
            state.products.map((item) => {return item.price * item.quantity}).reduce((a, b=0) => a + b)
            : 0 ;
        },
        addProductQuantity: (state, action) => {
            state.products[action.payload].quantity += 1;
            state.total = state.products.map((item) => {return item.price * item.quantity}).length>0 ?
            state.products.map((item) => {return item.price * item.quantity}).reduce((a, b=0) => a + b)
            : 0 ;
        }
    }
})


export const { addProduct, deleteEntireCart, removeProductQuantity, addProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;