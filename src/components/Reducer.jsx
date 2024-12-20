// reducer.js
export const initialState = {
    basket: [],
    user: null,
  };
  
  // Function to calculate total basket value
  export const calculateTotal = (basket) => {
    return basket.reduce((amount, item) => item.price + amount, 0);
  };
  
  // Reducer function to handle actions
  export const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
  
      case "REMOVE_FROM_BASKET":
        { const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];
  
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.warn(`Can't remove item (id: ${action.id}) as it is not in the basket`);
        }
  
        return { ...state, basket: newBasket }; }
  
      case "SET_USER":
        return { ...state, user: action.user };
  
      default:
        return state;
    }
  };
  