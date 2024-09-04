// import React, { useReducer, useContext, createContext } from 'react';

// const CartStateContext = createContext();
// const CartDispatchContext = createContext();

// const reducer = (state, action) => {
//     switch (action.type) {
//         case "ADD":
//             return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
//         case "REMOVE":
//             let newArr = [...state];
//             newArr.splice(action.index, 1);
//             return newArr;
//         case "DROP":
//             return [];
//         case "UPDATE":
//             let arr = [...state];
//             arr.find((food, index) => {
//                 if (food.id === action.id) {
//                     arr[index] = { 
//                         ...food, 
//                         qty: parseInt(action.qty) + food.qty, 
//                         price: action.price + food.price 
//                     };
//                 }
//                 return arr;
//             });
//             return arr;
//         default:
//             console.error("Error in Reducer");
//             return state;
//     }
// };

// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, []);

//     return (
//         <CartDispatchContext.Provider value={dispatch}>
//             <CartStateContext.Provider value={state}>
//                 {children}
//             </CartStateContext.Provider>
//         </CartDispatchContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);

import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if the item already exists in the cart
            const existingIndex = state.findIndex(item => item.id === action.id);
            if (existingIndex >= 0) {
                // Item exists, so update it
                return state.map((item, index) =>
                    index === existingIndex
                        ? { ...item, qty: item.qty + action.qty, price: item.price + action.price }
                        : item
                );
            } else {
                // Item doesn't exist, so add it
                return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
            }
        case "REMOVE":
            return state.filter((_, index) => index !== action.index);
        case "DROP":
            return [];
        case "UPDATE":
            return state.map(item =>
                item.id === action.id
                    ? { ...item, qty: action.qty, price: action.price }
                    : item
            );
        default:
            console.error("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
