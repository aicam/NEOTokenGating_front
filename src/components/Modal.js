import React from "react";


const Modal = ({onClose, children, title}) => {
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
                    <h1 style={{color: 'black', margin: 0, padding: 0}}>{title}</h1>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );

    return modalContent;
};

export default Modal
