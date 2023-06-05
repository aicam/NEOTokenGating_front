import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose }) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <h1 style={{color: 'black'}}>Welcome</h1>
                    <div className="modal-body">asdasdasd</div>
                </div>
            </div>
        </div>
    );

    return modalContent;
};

export default Modal
