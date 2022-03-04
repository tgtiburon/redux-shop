import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

import { useReducer } from "react";

// pass the state and the action.type
//
export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of 'UPDATE_PRODUCTS', return a new \
    // state object with an updated products array

    case UPDATE_PRODUCTS:
      // if it's that action type return a new copy of the state argument
      // using the ...state
      return {
        ...state,
        // then set action.products value spread across it
        products: [...action.products],
      };

    // action type = UPDATE_CATEGORIES
    case UPDATE_CATEGORIES:
      // return a new state with an updated categories array
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    //...state preserves everything else on state
    // then we add action.product to the end of the array
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    // filter method only keeps items that don't
    // match the remove _id
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    // we map instead of updating because we want to keep original state
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    // if it's none of these actions, do not update the state at all and keep things
    // the same
    default:
      return state;
  }
};

// initialize our global state object and gives functionality
// for updated that state using reducer function
export function useProductReducer(initialState) {
  // useReducer is a hook for managing big levels of state
  return useReducer(reducer, initialState);
}
