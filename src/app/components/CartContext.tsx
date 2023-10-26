import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cartItems, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        // Add other cases for updating the cart, such as removing items
        default:
            return state;
    }
}
