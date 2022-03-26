import { ActionTypes } from "./ActionTypes";

export const ShopReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.DATA_LOAD:
      return {
        ...state,
        [action.payload.dataType]: action.payload.data,
      };
    default:
      return state || {};
  }
};
