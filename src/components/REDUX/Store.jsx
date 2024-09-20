import { createStore } from 'redux';
import cartReducer from './CartReducer'; // Import the cart reducer

const store = createStore(cartReducer);

export default store;