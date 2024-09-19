import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items:[] 
}


const wishSlice = createSlice({
    name:'wishlist',
    initialState,
    reducers:{
        addToWishlist: (state, action) => {
            const isItemInCart = state.items.some(item => item.id === action.payload.id);
            
            if (isItemInCart) {
                state.items.forEach(item => {
                    if (item.id === action.payload.id) {
                        item.quantity += 1;
                    }
                });
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromWishlist: (state,action) => {
            state.items = state.items.filter((item) => item.id !== action.payload );

        },
        clearWishlist: (state) => {
            state.items = []
        },
        updateQuantity: (state, action) => {
            const {id,quantity} = action.payload;
            const item = state.items.find(item => item.id === id);
            if(item){
                item.quantity = quantity;
            }
        }
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, updateQuantity } = wishSlice.actions;
export default wishSlice.reducer;