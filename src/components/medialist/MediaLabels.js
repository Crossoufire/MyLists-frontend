import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Card, Col, Form, Image, Modal, Row} from "react-bootstrap";
import {FaPen, FaTrash} from "react-icons/fa";

import AddTooltip from "../primitives/AddTooltip";
import {useApi} from "../../providers/ApiProvider";
import {useFlash} from "../../providers/FlashProvider";
import Loading from "../primitives/Loading";
import Return from "../primitives/Return";


const ShowMediaWithLabel = ({ mediaType, labelsMedia }) => {
    const { username } = useParams();

    return (
        <>
            <Link className="text-light" to={`/list/${mediaType}/${username}?status=Labels`}>
                <Return value={"to labels"}/>
            </Link>
            {labelsMedia.map(media =>
                <Col key={media.id} xs={4} sm={3} md={3} lg={2} xl={2}>
                    <Card className="bg-transparent border-0">
                        <div className="overlay-container">
                            <Image
                                className={`medialist-img`}
                                src={media.media_cover}
                                height={300}
                                width={200}
                                style={{height: "auto"}}
                            />
                            <Link className="overlay" to={`/details/${mediaType}/${media.media_id}`}>
                                <span className="overlay-text text-light fs-24">
                                    {media.media_name}
                                </span>
                            </Link>
                        </div>
                    </Card>
                </Col>
            )}
        </>
    );
};


const ShowAllLabels = ({ initLabelsList, mediaType, isCurrent, updateLabel }) => {
    const api = useApi();
    const flash = useFlash();
    const [renaming, setRenaming] = useState(false);
    const [labelsList, setLabelsList] = useState(initLabelsList);
    const [newLabelName, setNewLabelName] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");

    const deleteLabel = async (label) => {
        const confirm = window.confirm("Do you really want to delete this label?");

        if (confirm) {
            const response = await api.post("/delete_label", {
                label: label,
                media_type: mediaType,
            });

            if (!response.ok) {
                return flash(response.body.description, "warning");
            }

            flash(response.body.message, "success");
            setLabelsList(labelsList.filter(x => x !== label));
        }
    };

    const renameLabel = async () => {
        if (newLabelName < 1 || selectedLabel === newLabelName) {
            return;
        }

        const response = await api.post("/rename_label", {
            old_label_name: selectedLabel,
            new_label_name: newLabelName,
            media_type: mediaType,
        });

        if (!response.ok) {
            return flash(response.body.description, "warning");
        }

        flash(response.body.message, "success");
        setLabelsList(labelsList.map(x => (x === selectedLabel ? newLabelName : x)));
        setRenaming(false);
        setSelectedLabel("");
    }

    const openRenameModal = (label) => {
        setNewLabelName("");
        setSelectedLabel(label);
        setRenaming(true);
    };


    return (
        <>
            {labelsList.map((label, idx) =>
                <Col key={label+idx} xs={4} sm={3} md={3} lg={2} xl={2}>
                    <Card className="border-0">
                        <Image
                            className={`medialist-img bg-dark`}
                            height={200}
                            width={250}
                            style={{height: "auto", borderRadius: 0}}
                        />
                        <span className="cu-p overlay-text text-light fs-24" onClick={() => updateLabel(label)}>
                            {label}
                        </span>
                        {isCurrent &&
                            <>
                                <AddTooltip title="Rename label">
                                    <span className="img-btn-top-left-2">
                                        <FaPen size={18} onClick={() => openRenameModal(label)}/>
                                    </span>
                                </AddTooltip>
                                <AddTooltip title="Delete label">
                                    <span className="img-btn-top-right-2">
                                        <FaTrash size={18} onClick={() => deleteLabel(label)}/>
                                    </span>
                                </AddTooltip>
                            </>
                        }
                    </Card>
                </Col>
            )}
            <Modal show={renaming} onHide={() => setRenaming(false)}>
                <Modal.Header closeButton data-bs-theme="dark">
                    <Modal.Title>Rename the label</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="newLabelName">
                        <Form.Label>New Label Name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={selectedLabel}
                            onChange={(ev) => setNewLabelName(ev.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={renameLabel}>Rename</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


const MediaLabels = ({ mediaType, labels, labelsMedia, isCurrent, updateLabel, loading })  => {
    return (
        <Row className="gy-lg-4 gx-lg-4 g-0 m-b-30">
            {loading ?
                <Loading addStyle="text-center"/>
                :
                labelsMedia.length > 0 ?
                    <ShowMediaWithLabel
                        mediaType={mediaType}
                        labelsMedia={labelsMedia}
                    />
                    :
                    <ShowAllLabels
                        mediaType={mediaType}
                        initLabelsList={labels}
                        isCurrent={isCurrent}
                        updateLabel={updateLabel}
                    />
            }
        </Row>
    );
};


export default MediaLabels;