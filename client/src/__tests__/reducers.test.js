import { reducer } from "../utils/reducers";
// import our actions
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
} from "../utils/actions";

// Create a sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: "Food" }],
  currentCategory: "1",
  cart: [
    {
      _id: "1",
      name: "Soup",
      purchaseQuantity: 1,
    },
    {
      _id: "2",
      name: "Bread",
      purchaseQuantity: 2,
    },
  ],
  cartOpen: false,
};

// testing a reducer function
// takes 2 params: current state of the object (so we can make a copy)
// 2nd: the action we are going to perform on it, which is broken into 2 parts
// type: kind of action we are performing
// value: name representative of the new data we want to use with the action
test("UPDATE_PRODUCTS", () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}],
  });

  // This shows we created a newState but
  // left the initialState the same
  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

test("UPDATE_CATEGORIES", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}],
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test("UPDATE_CURRENT_CATEGORY", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: "2",
  });

  expect(newState.currentCategory).toBe("2");
  expect(initialState.currentCategory).toBe("1");
});

test("ADD_TO_CART", () => {
  let newState = reducer(initialState, {
    type: ADD_TO_CART,
    product: { purchaseQuantity: 1 },
  });

  // treat the original state as immutable...so
  // always check to makesure original did not change
  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test("ADD_MULTIPLE_TO_CART", () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_CART,
    products: [{}, {}],
  });
  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test("REMOVE_FROM_CART", ()=> {
  let newState1 = reducer(initialState, {
    type:REMOVE_FROM_CART,
    _id: '1'
  });
  // cart still open 
  expect(newState1.cartOpen).toBe(true);

  // the second item should now be first
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type:REMOVE_FROM_CART,
    _id: '2'  
  });

  // cart is empty and close
  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);
  // Original state not changed
  expect(initialState.cart.length).toBe(2);
});

// 
test("UPDATE_CART_QUANTITY", ()=> {
  let newState = reducer(initialState, {
    type: UPDATE_CART_QUANTITY,
    _id: '1',
    purchaseQuantity: 3
  });

  expect(newState.cartOpen).toBe(true);
  // Should be 3 since we updated quantity
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  // Should rermain at 2
  expect(newState.cart[1].purchaseQuantity).toBe(2);

  expect(initialState.cartOpen).toBe(false);


});

test("CLEAR_CART", ()=> {
  let newState = reducer(initialState, {
    type: CLEAR_CART
  });

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);

});

test("TOGGLE_CART", ()=> {
  let newState = reducer(initialState, {
    type: TOGGLE_CART
  });

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = reducer(newState, {
    type: TOGGLE_CART 
  });

  expect(newState2.cartOpen).toBe(false);
})


