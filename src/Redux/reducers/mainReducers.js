import {combineReducers} from 'redux';
import userData from './registeredUser';
import cardData from './cardData';

const rootReducer = combineReducers({
    userData, cardData
});

export default rootReducer;