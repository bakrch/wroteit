import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { connect } from 'react-redux';
import {
    push as pushActionCreator,
    replace as replaceActionCreator
} from 'react-router-redux';


const isModifiedEvent = (e) => !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);

class Link extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        target: PropTypes.string,
        replace: PropTypes.bool,
        replaceUrl: PropTypes.func,
        pushUrl: PropTypes.func,
        to: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
        innerRef: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ])
    };

    static defaultProps = {
        replace: false
    };

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.shape({
                push: PropTypes.func.isRequired,
                replace: PropTypes.func.isRequired,
                createHref: PropTypes.func.isRequired
            }).isRequired
        }).isRequired
    };

    handleClick = (e) => {

        const { onClick, target } = this.props;

        if (onClick) {
            onClick(e);
        }

        if (
            !e.defaultPrevented && // onClick prevented default
            e.button === 0 &&      // ignore everything but left clicks
            !target &&             // let browser handle "target=_blank" etc.
            !isModifiedEvent(e)    // ignore clicks with modifier keys
        ) {
            e.preventDefault();

            const { pushUrl, replace, replaceUrl, to } = this.props;

            if (replace) {
                replaceUrl(to);
            }
            else {
                pushUrl(to);
            }
        }
    };

    render() {

        const {
            to,
            innerRef,
            replace,
            pushUrl,
            replaceUrl,
            ...props
        } = this.props;

        invariant(
            this.context.router,
            'You should not use <Link> outside a <Router>'
        );

        const href = this.context.router.history.createHref(
            typeof to === 'string' ? { pathname: to } : to
        );

        return <a {...props} onClick={this.handleClick} href={href} ref={innerRef} />;
    }
}

export default connect(
    undefined,
    {
        pushUrl: pushActionCreator,
        replaceUrl: replaceActionCreator
    }
)(Link);
