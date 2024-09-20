// actions/cartActions.js
export const addItem = (item) => ({
    type: 'ADD_ITEM',
    payload: item,
  });
  
  export const removeItem = (itemId) => ({
    type: 'REMOVE_ITEM',
    payload: itemId,
  });
  
  export const increaseQuantity = (itemId) => ({
    type: 'INCREASE_QUANTITY',
    payload: itemId,
  });
  
  export const decreaseQuantity = (itemId) => ({
    type: 'DECREASE_QUANTITY',
    payload: itemId,
  });