import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import { showLightbox, hideLightbox } from '../../actions/lightboxActions';

import styles from './Lightbox.css';

const Lightbox = React.createClass({

    propTypes: {
        lightbox: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    },

    close() {
        this.props.dispatch(hideLightbox());
    },

    render() {
        const { lightbox, dispatch } = this.props;
        return (
            <Modal
                dialogClassName={styles.width90}
                show={lightbox.showLightbox}
                onHide={this.close}
                >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        className="img img-responsive"
                        src={lightbox.pictureLink}
                        alt="чертеж крупным планом"
                        />
                </Modal.Body>
            </Modal>
        );
  }

});

function mapStateToProps(state) {
    return {
        lightbox: state.lightbox
    };
}

export default connect(mapStateToProps)(Lightbox);
