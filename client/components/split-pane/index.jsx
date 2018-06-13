/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import Prefixer from 'inline-style-prefixer';
import stylePropType from 'react-style-proptype';

import Pane from './pane';

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
const USER_AGENT =
  typeof window.navigator !== 'undefined' ? window.navigator.userAgent : DEFAULT_USER_AGENT;

export default class SplitPane extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        className: PropTypes.string,
        primary: PropTypes.oneOf(['first', 'second']),
        minSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        split: PropTypes.oneOf(['vertical', 'horizontal']),
        prefixer: PropTypes.instanceOf(Prefixer).isRequired,
        style: stylePropType,
        paneClassName: PropTypes.string,
        pane1ClassName: PropTypes.string,
        pane2ClassName: PropTypes.string,
        paneStyle: stylePropType,
        pane1Style: stylePropType,
        pane2Style: stylePropType
    };
    static defaultProps = {
        minSize: 50,
        prefixer: new Prefixer({ userAgent: USER_AGENT }),
        primary: 'first',
        split: 'vertical',
        paneClassName: '',
        pane1ClassName: '',
        pane2ClassName: ''
    };

    render() {

        const {
            children,
            className,
            minSize,
            paneClassName,
            pane1ClassName,
            pane2ClassName,
            paneStyle,
            pane1Style: pane1StyleProps,
            pane2Style: pane2StyleProps,
            primary,
            prefixer,
            size,
            split,
            style: styleProps
        } = this.props;

        const classes = ['SplitPane', className, split];
        const pane1Style = prefixer.prefix(
            Object.assign({}, paneStyle || {}, pane1StyleProps || {})
        );
        const pane2Style = prefixer.prefix(
            Object.assign({}, paneStyle || {}, pane2StyleProps || {})
        );

        const pane1Classes = ['Pane1', paneClassName, pane1ClassName].join(' ');
        const pane2Classes = ['Pane2', paneClassName, pane2ClassName].join(' ');


        const style = Object.assign(
            {},
            {
                display: 'flex',
                flex: 1,
                height: '100%',
                position: 'absolute',
                outline: 'none',
                overflow: 'hidden',
                MozUserSelect: 'text',
                WebkitUserSelect: 'text',
                msUserSelect: 'text',
                userSelect: 'text'
            },
            styleProps || {}
        );

        if (split === 'vertical') {
            Object.assign(style, {
                flexDirection: 'row',
                left: 0,
                right: 0
            });
        }
        else {
            Object.assign(style, {
                bottom: 0,
                flexDirection: 'column',
                minHeight: '100%',
                top: 0,
                width: '100%'
            });
        }

        return (
            <div
                className={classes.join(' ')}
                style={prefixer.prefix(style)}
            >
                <Pane
                    className={pane1Classes}
                    key="pane1"
                    size={
                        primary === 'first' ? size || minSize : undefined
                    }
                    split={split}
                    style={pane1Style}
                >
                    {children[0]}
                </Pane>
                <Pane
                    className={pane2Classes}
                    key="pane2"
                    size={
                        primary === 'second' ? size || minSize : undefined
                    }
                    split={split}
                    style={pane2Style}
                >
                    {children[1]}
                </Pane>
            </div>
        );
    }
}
