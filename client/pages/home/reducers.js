import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import LogoutReducer from './logout/duck';
import BrowseReducer from './read/duck';
import MybooksReducer from './write/duck';
import NewbookReducer from './write/newBookForm/duck';
import SaveBookReducer from './write/writer/duck';

export default {
    LogoutReducer,
    BrowseReducer,
    MybooksReducer,
    NewbookReducer,
    SaveBookReducer,
    routing: routerReducer,
    form: reduxFormReducer
};
