import { ADD_TO_CART, REMOVE_FROM_CART } from "./actions";

const initialState = {
  items: [],
  totalCount: 0,
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.payload;
      const qtyToAdd = Number(addedProduct.quantity) || 1;
      const existingItem = state.items.find((item) => item.id === addedProduct.id);

      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === addedProduct.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item,
        );
      } else {
        newItems = [...state.items, { ...addedProduct, quantity: qtyToAdd }];
      }

      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount + qtyToAdd,
      };
    }
    case REMOVE_FROM_CART: {
      const { id, quantity = 1 } = action.payload;
      const qtyToRemove = Number(quantity) || 1;
      const existingItem = state.items.find((it) => it.id === id);

      if (!existingItem) return state;

      let newItems;

      if (existingItem.quantity > qtyToRemove) {
        newItems = state.items.map((it) =>
          it.id === id ? { ...it, quantity: it.quantity - qtyToRemove } : it,
        );
      } else {
        newItems = state.items.filter((it) => it.id !== id);
      }

      const newTotal = Math.max(0, state.totalCount - qtyToRemove);

      return {
        ...state,
        items: newItems,
        totalCount: newTotal,
      };
    }
    default:
      return state;
  }
}
