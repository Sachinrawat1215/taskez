const registerUser = (data) => {
    return {type: 'REGISTER_USER', payload: data}
};

const loginUser = (data) => {
    return {type: 'LOGIN_USER', payload: data}
}

const logoutUser = (data) => {
    return {type: 'LOGOUT_USER', payload: data}
}


// Card Actions

const addCard = (data) => {
    return {type: 'ADD_CARD', payload: data}
}

const updateCard = (data) => {
    return {type: 'UPDATE_CARD', payload: data}
}

const deleteCard = (data) => {
    return {type: 'DELETE_CARD', payload: data}
}

export {registerUser, loginUser, logoutUser, addCard, updateCard, deleteCard};