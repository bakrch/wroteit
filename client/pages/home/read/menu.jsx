import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button, Dropdown } from 'semantic-ui-react';

import Link from 'Client/components/link';


const FixedMenu = (props) => {

    const { location } = props;
    return (
        <Menu text fixed='top' size='large'
            style={{
                padding: '0.8em',
                boxShadow:'0px -8px 20px 2px'
            }}>
            <Menu.Item header>
                <Link
                    to='/'
                    active ={ location === '/'}
                    style={{
                        fontFamily: 'Karma,\'Times New Roman\',serif',
                        fontSize: '2.5em',
                        paddingTop: '0.1em',
                        paddingBottom: '0em',
                        color: 'white'
                    }}>WRITEIT</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item className='item'>
                    <Button
                        as={Link}
                        to='/home/read'
                        active={ location === '/home/read' }
                    >Browse</Button>
                </Menu.Item>
                <Menu.Item>
                    <Dropdown button text='Write'>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Button
                                    as={Link}
                                    to='/home/write'
                                >Continue writing</Button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button
                                    as={Link}
                                    to='/home/write'
                                >Start a new book</Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Item>
                <Menu.Item>
                    <Button
                        color='yellow'
                        as={Link}
                        to='/home/logout'
                        active={ location === '/logout' }
                    >Log out</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};
FixedMenu.propTypes = {
    location: PropTypes.string
};

export default FixedMenu;
