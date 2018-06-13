import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';

import Link from 'Client/components/link';


const FixedMenu = (props) => {

    const { location } = props;
    return (
        <Menu text fixed='top' size='large'
            style={{
                padding: '0.8em',
                boxShadow:'0px -8px 20px 2px'
            }}>
            <Menu.Item header fixed top >
                <Link to='/' active ={ location === '/'} style={{
                    fontFamily: 'Karma,\'Times New Roman\',serif',
                    fontSize: '2.5em',
                    paddingTop: '0.1em',
                    paddingBottom: '0em',
                    color: 'white'
                }}>WRITEIT</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item className='item'>
                    <Button as={Link} to='/login' active={ location === '/login' }>Log in</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={Link} to='/signup' active={ location === '/signup' } primary>Sign Up</Button>
                </Menu.Item>
                {/* <Menu.Item className='item'>
                    <Button as={Link} to='/logout'>Logout</Button>
                </Menu.Item> */}
            </Menu.Menu>
        </Menu>
    );
};
FixedMenu.propTypes = {
    location: PropTypes.string
};

export default FixedMenu;
