// REDUX version of the global store
// Might move this file to utils folder later
// Redux docs showed it in an app folder


// We only need the createStore function from redux
import { createStore } from "redux";

// import the rootReducer
import rootReducer from '../utils/reducers.js'  ;

// Use createStore and pass it the rootReducer
const store = createStore(rootReducer);


export default store;


