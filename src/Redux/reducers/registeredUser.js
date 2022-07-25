const registerUsers = [];

const userData = (state = registerUsers, action) => {
    if (action.type === 'REGISTER_USER') {
        return state.concat(action.payload);
    } else if (action.type === 'LOGIN_USER') {
        const result = state.findIndex(user => { return user.email === action.payload.email });
        state[result].loggedIn = true;
        return state;
    } else if (action.type === 'LOGOUT_USER') {
        const result = state.findIndex(user => { return user.email === action.payload.email });
        state[result].loggedIn = false;
        return state;
    } else {
        return state;
    }
}

export default userData;