import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './home/index.jsx';
import Contact from './contact/index.jsx';
import Login from './login/main';
import LoginForgot from './login/forgot';
import LoginReset from './login/reset';
import Logout from './logout';
import Signup from './signup/main/index.jsx';
import SignupActivate from './signup/activate/index.jsx';
import NotFound from './404.jsx';


const AppUniversal = (props) => {

    return (
        <div>
            {/* { /^\/$|\/(contact|login|logout|signup)/.test(location) && <FixedMenu location={location} /> } */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/login" exact component={Login} />
                <Route path="/login/forgot" exact component={LoginForgot} />
                <Route path="/login/reset/:email/:key" component={LoginReset} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signup/activate/:email/:key" component={SignupActivate} />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
};
export default AppUniversal;
// AppUniversal.propTypes = {
//     location: PropTypes.string
// };
// const mapStateToProps = (state, ownProps) => {
//
//     return {
//         location: state.routing.location.pathname
//     };
// };
//
// export default connect(mapStateToProps)(AppUniversal);
