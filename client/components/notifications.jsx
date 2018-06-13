import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';


const Notifs = ({ notifications }) => {

    return (
        <Notifications
            notifications={notifications}
        />
    );
};
Notifs.propTypes = {
    notifications: PropTypes.array
};

export default connect(
    (state) => ({ notifications: state.notifications })
)(Notifs);
