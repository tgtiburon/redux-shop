// REDUX version of the global store

// We only need the createStore function from redux
import { createStore } from "redux";

// import the rootReducer
import rootReducer from '../utils/reducers.js'  ;

// Use createStore and pass it the rootReducer
const store = createStore(rootReducer);


export default store;


