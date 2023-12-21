import React, {useState, useCallback} from "react";
import {Button, Modal} from "react-bootstrap";

const useConfirmation = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationCallback, setConfirmationCallback] = useState(null);

    const show = useCallback((callback) => {
        setShowConfirmation(true);
        setConfirmationCallback(() => callback);
    }, []);

    const hide = useCallback(() => {
        setShowConfirmation(false);
        setConfirmationCallback(null);
    }, []);

    const handleConfirm = useCallback(() => {
        if (confirmationCallback) {
            confirmationCallback();
        }
        hide();
    }, [confirmationCallback, hide]);

    const handleCancel = useCallback(() => {
        hide();
    }, [hide]);

    const ConfirmationModal = () => (
        <Modal show={showConfirmation} onHide={handleCancel} data-bs-theme={"dark"}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Remove this media from your list?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button variant="danger" onClick={handleConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );

    return { show, hide, ConfirmationModal };
};

export default useConfirmation;
