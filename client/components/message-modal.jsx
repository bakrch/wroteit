/* @TODO connect this to the store instead of using props and the state */

import React from 'react';
import { Modal, Header, Image, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const MessageModal = ({ open, onOpen, onClose, photo, to, ...props }) => {

    return (
        <Modal
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            size='small'
        >
            <Modal.Header>Send Message</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={photo} />
                <Modal.Description>
                    <Header>To: {to}</Header>
                    <Form>
                        <Form.TextArea />
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button icon='close' content='Close' onClick={onClose} />
                <Button icon='check' content='Send' onClick={onClose} />
            </Modal.Actions>
        </Modal>
    );
};
MessageModal.propTypes = {
    open: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    photo: PropTypes.string,
    to: PropTypes.string
};

export default MessageModal;
