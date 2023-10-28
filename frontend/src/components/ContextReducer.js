// import { reduce } from "lodash";
import { indexOf } from "lodash";
import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      console.log("Adding to cart:", action);
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newState = [...state];
      newState.splice(action.index, 1);
      return newState;
    case "UPDATE":
      let arr = [...state];
      arr.find((item, index) => {
        if (item.id === action.id) {
          arr[index] = {
            ...item,
            qty: +action.qty + item.qty,
            price: +action.price + item.price,
          };
        }
        // return arr;
      });
      return arr;
    case "DROP":
      let emptyArray = [];
      return emptyArray;
    default:
      console.log("Error in reducer");
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
