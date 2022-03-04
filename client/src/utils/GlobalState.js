// createContext => instantiates new Context object 
//          will be the container to hold the global state data
// useContext => React hook that will let us use the state created from createContext

import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";     


// instantiate global state object
const StoreContext = createContext();
// Pull the Provider out from StoreContext
// Provider => React Component we wrap our application in
//      makes state data that's passed into it as a prop
//      available to all other components
// Consumer => means of grabbing the data the Provider holds
const { Provider }  = StoreContext;


// StoreProvider is not as much a function as it is
// our own custom <Provider> component
// setup to accept props

const StoreProvider = ({ value=[], ...props }) => {
    // useProductReducer returned state and dispatch
    // state => most up-to-date version of global state object
    // dispatch => method we use to update our state.
    //          looks for an action object passed in as arg
    const [state, dispatch]  = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });
    // confirm it works
    console.log(state);
    // value => lets us pass more data for state if we need to
    // ...props => handle any other props needed example props.children
    // returns new state and a function to update the state
    // if we did not return ...props nothing on the page would be rendered
    return <Provider value={[state, dispatch]} {...props}  />;
};

// useContext Hook to be used by components that need the
// data that <StoreProvider> will be providing 
const useStoreContext = () => {
    return useContext(StoreContext) ;
};


export { StoreProvider, useStoreContext }  ;
