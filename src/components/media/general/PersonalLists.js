import React, {useState} from "react";
import {Badge, Button, Form, Modal} from "react-bootstrap";

import useApiUpdater from "../../../hooks/UserUpdateAPI";
import HLine from "../../primitives/HLine";
import HLine2 from "../../primitives/HLine2";
import {Link} from "react-router-dom";


const PersonalLists = ({ username, mediaId, mediaType, initIn, initAvailable }) => {
    const [newList, setNewList] = useState("");
    const [labelsInList, setLabelsInList] = useState(initIn);
    const [showModal, setShowModal] = useState(false);
    const [labelsToAdd, setLabelsToAdd] = useState(initAvailable);
    const { addToList, removeFromList } = useApiUpdater(mediaId, mediaType);

    const handleShow = () => setShowModal(true);

    const handleClose = () => setShowModal(false);

    const handleCreateList = async () => {
        if (newList.trim() !== "" && !labelsInList.includes(newList) && !labelsToAdd.includes(newList)) {
            setLabelsInList([...labelsInList, newList]);
            setNewList("");

            await addToList(newList);
        }
    };

    const handleMoveList = async (label, fromList) => {
        if (fromList === "inList") {
            setLabelsInList(labelsInList.filter(lab => lab !== label));
            setLabelsToAdd([...labelsToAdd, label]);
            await removeFromList(label);
        }
        if (fromList === "toAdd") {
            setLabelsToAdd(labelsToAdd.filter(lab => lab !== label));
            setLabelsInList([...labelsInList, label]);
            await addToList(label);
        }
    };


    return (
        <>
            <h4 className="d-flex justify-content-between m-t-20 fw-5">Personal Lists</h4>
            <HLine2/>
            <div className="d-flex flex-wrap gap-2">
                {labelsInList.length === 0 ?
                    <i className="text-grey">Not in any personal lists yet.</i>
                    :
                    labelsInList.map(lab =>
                        <Link to={`/list/personal/${mediaType}/${username}?list=${lab}`}>
                            <Badge key={lab} className="p-t-7 p-b-7 fs-14" bg="success">
                                <div className="d-flex justify-content-between gap-2">{lab}</div>
                            </Badge>
                        </Link>
                    )
                }
            </div>
            <Button className="m-t-15" size="sm" variant="outline-light" onClick={handleShow}>
                Manage lists
            </Button>
            <Modal show={showModal} onHide={handleClose} data-bs-theme="dark">
                <Modal.Header closeButton>
                    <Modal.Title>Lists Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Already in</h5>
                        <HLine/>
                        <div className="d-flex flex-wrap gap-3 justify-content-start">
                            {labelsInList.length === 0 ?
                                <i className="text-grey">This media is not in any lists yet.</i>
                                :
                                labelsInList.map(lab =>
                                    <Badge key={lab} className="p-t-7 p-b-7 cu-p fs-14" bg="success"
                                           onClick={() => handleMoveList(lab, "inList")}>
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
                                <i className="text-grey">No lists available.</i>
                                :
                                labelsToAdd.map(lab =>
                                    <Badge key={lab} className="p-t-7 p-b-7 cu-p fs-14" bg="dark"
                                           onClick={() => handleMoveList(lab, "toAdd")}>
                                        {lab}
                                    </Badge>
                                )
                            }
                        </div>
                    </div>
                    <div className="mt-4 mb-3">
                        <h5>Create new List</h5>
                        <HLine/>
                        <div className="d-flex gap-4">
                            <Form.Control
                                placeholder="Create a new list"
                                type="text"
                                value={newList}
                                onChange={(ev) => setNewList(ev.target.value)}
                            />
                            <Button size="sm" variant="success" onClick={handleCreateList}>Create</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};


export default PersonalLists;