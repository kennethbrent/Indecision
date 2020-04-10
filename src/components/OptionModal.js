import React from 'react'
import Modal from 'react-modal'
Modal.setAppElement('#root');
const OptionModal = (props) => {
    return (
        <Modal
            isOpen={!!props.selectedOption}
            onRequestClose={props.handleClearSelected}
            contentLabel="Selected Option"
            closeTimeoutMS={250}
            className="modal"
        >
            <h3 className="modal__title">Selected Option</h3>
            {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
            <button className="button" onClick={props.handleClearSelected}>Okay</button>
        </Modal>
    )
}

export default OptionModal