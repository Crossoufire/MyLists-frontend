import React, {useState} from "react";
import {Modal} from "react-bootstrap";

import UserUpdate from "../../reused/UserUpdate";


export default function HistoryModal({ history }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);


    return (
        <>
            {history.length !== 0 &&
                <span className="text-grey cu-p fs-16" onClick={handleOpen}><i>History</i></span>
            }

            <Modal show={showModal} onHide={handleClose} centered={true}>
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>History</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: 400, overflowY: "auto"}}>
                    {history.map(hist =>
                        <UserUpdate
                            key={hist.date}
                            mediaId={hist.media_id}
                            mediaType={hist.media_type}
                            mediaName={hist.media_name}
                            payload={hist.update}
                            date_={hist.date}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
