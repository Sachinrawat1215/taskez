const cardData = [];

const cardDataReducer = (state = cardData, action) => {
    if (action.type === 'ADD_CARD') {
        return state.concat(action.payload);
    } else if (action.type === 'UPDATE_CARD') {
        const result = state.filter(card => { return card.id == action.payload.id });
        result[0].status = action.payload.status;
        return state;
    }else if (action.type === 'DELETE_CARD') {
        const result = state.findIndex(card => { return card.id == action.payload.id });
        state.splice(result, 1);
        return state;
    } else {
        return state;
    }
}

export default cardDataReducer;