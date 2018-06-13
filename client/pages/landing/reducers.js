import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import LoginReducer from './login/main/duck';
import LogoutReducer from './logout/duck';
import ResetReducer from './login/reset/duck';
import ForgotReducer from './login/forgot/duck';
import SignupReducer from './signup/main/duck';
import ActivateReducer from './signup/activate/duck';


export default {
    LoginReducer,
    LogoutReducer,
    ResetReducer,
    ForgotReducer,
    SignupReducer,
    ActivateReducer,

    routing: routerReducer,
    form: reduxFormReducer
};
