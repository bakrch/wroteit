import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './home/index.jsx';
import Read from './read/index.jsx';
import Reader from './read/reader/index.jsx';
import Bookpage from './read/bookpage/index.jsx';
import Write from './write/index.jsx';
import Writer from './write/writer/index.jsx';
import NewBookForm from './write/newBookForm/index.jsx';
import Profile from './profile/index.jsx';

import Logout from './logout';

import NotFound from './404.jsx';

//import FixedMenu from './menu.jsx';

const AppUniversal = (props) => {

    return (
        <div>
            {/* { /^\/$|\/(contact|login|logout|signup)/.test(location) && <FixedMenu location={location} /> } */}
            <Switch>
                <Route path="/home/" exact component={Home} />
                <Route path="/home/read" exact component={Read} />
                <Route path="/home/read/:id" exact component={Bookpage} />
                <Route path="/home/read/reader/:id" component={Reader} />

                <Route path="/home/write" exact component={Write} />
                <Route path="/home/write/new" exact component={NewBookForm} />
                <Route path="/home/write/writer/:id" exact component={Writer} />

                <Route path="/home/profile" exact component={Profile} />
                <Route path="/home/logout" exact component={Logout} />

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
