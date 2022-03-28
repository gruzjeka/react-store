import { ActionTypes } from "./ActionTypes";

export const CartReducer = (state, action) => {
  let newState = { cart: [], cartItems: 0, cartPrice: 0, ...state };
  switch (action.type) {
    case ActionTypes.CART_ADD:
      const { product, quantity } = action.payload;
      let existing = newState.cart.find((i) => i.product.id === i.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        newState.cart = [...newState.cart, action.payload];
      }
      newState.cartItems += quantity;
      newState.cartPrice += product.price * quantity;
      return newState;
    case ActionTypes.CART_UPDATE:
      newState.cart = newState.cart.map((item) => {
        if (item.product.id === action.payload.product.id) {
          const diff = action.payload.quantity - item.quantity;
          newState.cartItems += diff;
          newState.cartPrice += item.product.price * diff;
          return action.payload;
        } else {
          return item;
        }
      });
      return newState;
    case ActionTypes.CART_REMOVE:
      let selection = newState.cart.find(
        (item) => item.product.id === action.payload.id
      );
      newState.cartItems -= selection.quantity;
      newState.cartPrice -= selection.quantity * selection.product.price;
      newState.cart = newState.cart.filter((item) => item !== selection);
      return newState;
    case ActionTypes.CART_CLEAR:
      return { ...state, cart: [], cartItems: 0, cartPrice: 0 };
    default:
      return state || {};
  }
};
