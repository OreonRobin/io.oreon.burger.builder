import * as actionTypes from '../actions';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    purchasable: false
};

const calculateTotalPrice = (ingredients) => {
    return Object.entries(ingredients)
        .reduce((accumulator, entry) => accumulator + (INGREDIENT_PRICES[entry[0]] * entry[1]), initialState.totalPrice)
};

const isPurchasable = (ingredients) => {
    return Object.values(ingredients)
        .some(value => value > 0);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BURGER_ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
                purchasable: true
            };
        case actionTypes.BURGER_REMOVE_INGREDIENT:
            const ingredients = {
                ...state.ingredients,
                [action.payload]: state.ingredients[action.payload] - 1
            };
            return {
                ...state,
                ingredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
                purchasable: isPurchasable(ingredients)
            };
        case actionTypes.BURGER_SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
                totalPrice: calculateTotalPrice(action.payload),
                purchasable: isPurchasable(action.payload)
            };
        default:
            return state;
    }
};

export default reducer;
