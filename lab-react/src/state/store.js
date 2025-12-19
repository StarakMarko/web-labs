import { legacy_createStore as createStore } from 'redux';
import { cartReducer } from "./reducer";


const store = createStore(cartReducer);

export default store;