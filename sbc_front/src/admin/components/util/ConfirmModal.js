import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, title, message }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="modal-actions">
                <button onClick={onConfirm}>확인</button>
                <button onClick={onRequestClose}>취소</button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;