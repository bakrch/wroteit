import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import LogoutReducer from './logout/duck';


export default {
    LogoutReducer,

    routing: routerReducer,
    form: reduxFormReducer
};
