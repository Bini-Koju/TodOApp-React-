import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./ActionTypes";

const initialState = {
  items: [],
};

// Add item handler
const addItem = (state, action) => {
  const existingItem = state.items.find(
    (item) => item.id === action.payload.id
  );

  if (existingItem) {
    return {
      ...state,
      items: state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    };
  } else {
    return {
      ...state,
      items: [...state.items, { ...action.payload, quantity: 1 }],
    };
  }
};

// Remove item handler
const removeItem = (state, action) => ({
  ...state,
  items: state.items.filter((item) => item.id !== action.payload),
});

// Increase quantity handler
const increaseQuantity = (state, action) => ({
  ...state,
  items: state.items.map((item) =>
    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
  ),
});

// Decrease quantity handler
const decreaseQuantity = (state, action) => ({
  ...state,
  items: state.items.map((item) =>
    item.id === action.payload && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  ),
});

// Object mapping actions to handlers
const handlers = {
  [ADD_ITEM]: addItem,
  [REMOVE_ITEM]: removeItem,
  [INCREASE_QUANTITY]: increaseQuantity,
  [DECREASE_QUANTITY]: decreaseQuantity,
};

// Cart Reducer
const cartReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
};

export default cartReducer;
