import React, {useState} from "react";
import {Badge, Button, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

import useApiUpdater from "../../../hooks/UserUpdateAPI";
import HLine from "../../primitives/HLine";
import HLine2 from "../../primitives/HLine2";
import AddTooltip from "../../primitives/AddTooltip";


const LabelLists = ({ username, mediaId, mediaType, initIn, initAvailable }) => {
    const [newLabel, setNewLabel] = useState("");
    const [labelsInList, setLabelsInList] = useState(initIn);
    const [showModal, setShowModal] = useState(false);
    const [labelsToAdd, setLabelsToAdd] = useState(initAvailable);
    const { addMediaToLabel, removeLabelFromMedia } = useApiUpdater(mediaId, mediaType);

    const handleShow = () => setShowModal(true);

    const handleClose = () => setShowModal(false);

    const handleCreateLabel = async () => {
        if (newLabel.trim() !== "" && !labelsInList.includes(newLabel) && !labelsToAdd.includes(newLabel)) {
            setLabelsInList([...labelsInList, newLabel]);
            setNewLabel("");

            await addMediaToLabel(newLabel);
        }
    };

    const handleMoveLabel = async (label, fromList) => {
        if (fromList === "inList") {
            setLabelsInList(labelsInList.filter(lab => lab !== label));
            setLabelsToAdd([...labelsToAdd, label]);
            await removeLabelFromMedia(label);
        }

        if (fromList === "toAdd") {
            setLabelsToAdd(labelsToAdd.filter(lab => lab !== label));
            setLabelsInList([...labelsInList, label]);
            await addMediaToLabel(label);
        }
    };


    return (
        <>
            <h4 className="d-flex justify-content-between m-t-20 fw-5">
                Labels
                <AddTooltip title="Manage labels">
                    <span className="text-grey cu-p fs-16 m-t-8" onClick={handleShow}>
                        <i>Manage</i>
                    </span>
                </AddTooltip>
            </h4>
            <HLine2/>
            <div className="d-flex flex-wrap gap-2">
            {labelsInList.length === 0 ?
                    <i className="text-grey">Not labels added yet.</i>
                    :
                    labelsInList.map(lab =>
                        <Link key={lab} to={`/list/${mediaType}/${username}?status=Labels&label_name=${lab}`}>
                            <Badge key={lab} className="p-t-7 p-b-7 fs-14" bg="success">
                                <div className="d-flex justify-content-between gap-2">{lab}</div>
                            </Badge>
                        </Link>
                    )
                }
            </div>
            <Modal show={showModal} onHide={handleClose} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <Modal.Title>Labels Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Already in</h5>
                        <HLine/>
                        <div className="d-flex flex-wrap gap-3 justify-content-start">
                            {labelsInList.length === 0 ?
                                <i className="text-grey">No label added to this media yet.</i>
                                :
                                labelsInList.map(lab =>
                                    <Badge key={lab} className="p-t-7 p-b-7 cu-p fs-14" bg="success"
                                           onClick={() => handleMoveLabel(lab, "inList")}>
                                        {lab}
                                    </Badge>
                                )
                            }
                        </div>
                    </div>
                    <div className="mt-4">
                        <h5>Add to</h5>
                        <HLine/>
                        <div className="d-flex flex-wrap gap-3 justify-content-start">
                            {labelsToAdd.length === 0 ?
                                <i className="text-grey">No labels available yet.</i>
                                :
                                labelsToAdd.map(lab =>
                                    <Badge key={lab} className="p-t-7 p-b-7 cu-p fs-14 text-dark" bg="info"
                                           onClick={() => handleMoveLabel(lab, "toAdd")}>
                                        {lab}
                                    </Badge>
                                )
                            }
                        </div>
                    </div>
                    <div className="mt-4 mb-3">
                        <h5>Create a new label</h5>
                        <HLine/>
                        <div className="d-flex gap-4">
                            <Form.Control
                                placeholder="Label name"
                                value={newLabel}
                                onChange={(ev) => setNewLabel(ev.target.value)}
                            />
                            <Button size="sm" variant="success" onClick={handleCreateLabel}>
                                Create
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};


export default LabelLists;