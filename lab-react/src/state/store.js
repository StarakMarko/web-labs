import { legacy_createStore as createStore } from 'redux';
import { cartReducer } from "./reducer";

const loadCartFromLocalStorage = () => {
    try {
        const savedCart = localStorage.getItem('cartState');
        return savedCart ? JSON.parse(savedCart) : undefined;
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        return undefined;
    }
};

const saveCartToLocalStorage = (state) => {
    try {
        localStorage.setItem('cartState', JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
};

const preloadedState = loadCartFromLocalStorage();
const store = createStore(cartReducer, preloadedState);

store.subscribe(() => {
    saveCartToLocalStorage(store.getState());
});

export default store;
