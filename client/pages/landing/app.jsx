import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Store, { history } from './store';
import AppUniversal from './app-universal.jsx';


export default (
    <Provider store={ Store }>
        <ConnectedRouter history={ history }>
            <AppUniversal />
        </ConnectedRouter>
    </Provider>
);


/*import React from 'react';
import SplitPane from '../../components/split-pane/index.jsx';

const App = (
    <SplitPane size="50%">
        <div className="a1">Hi</div>
        <div className="a2">
            <div className="auth-btns">
                <button className="btn btn-primary">Continuer en temps que ...</button>
                <div className="auth-btn fb">
                    <a href="/login/employee/facebook" className="btn btn-block btn-social btn-facebook">
                        <span className="fa fa-facebook"></span>
                        Sign in with Facebook
                    </a>
                    <a href="/login/employee/google" className="btn btn-block btn-social btn-google">
                        <span className="fa fa-google"></span>
                        Sign in with Google
                    </a>
                </div>
            </div>
        </div>
    </SplitPane>
);


module.exports = App;
*/
