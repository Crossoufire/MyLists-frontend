import React, {useState} from "react";

import {FaCommentAlt, FaRegCommentAlt} from "react-icons/fa";
import {Button, Modal} from "react-bootstrap";
import {Tooltip} from "react-tooltip";
import LoadingIcon from "../primitives/LoadingIcon";
import {useLoading} from "../../hooks/LoadingHook";


export default function CommentModal({ mediaId, isCurrent, mediaName, initContent, updateComment }) {
    const [initContents, setInitContents] = useState(initContent || "");
    const [contents, setContents] = useState(initContent || "");
    const [showModal, setShowModal] = useState(false);
    const [isLoading, handleLoading] = useLoading();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSave = async () => {
        if (initContent === contents) {
            return;
        }

        await handleLoading(updateComment, contents);
        setInitContents(contents)
        handleClose();
    };


    return (
        <>
            {contents ?
                <>
                    <FaCommentAlt
                        id={"comment-"+mediaId}
                        className="cu-p"
                        style={{color: "darkgoldenrod"}}
                        onClick={handleShow}
                    />
                    <Tooltip anchorId={"comment-"+mediaId} content={"Comment"}/>
                </>
                :
                <>
                    <FaRegCommentAlt
                        id={"comment-empty-"+mediaId}
                        className={isCurrent && "cu-p"}
                        onClick={isCurrent && handleShow}
                    />
                    <Tooltip anchorId={"comment-empty-"+mediaId} content={"Comment"}/>
                </>
            }

            <Modal centered show={showModal} onHide={handleClose}>
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>{mediaName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Body>
                        {isCurrent ?
                            <div style={{position: "relative"}}>
                                <textarea
                                    className="w-100"
                                    style={{height: 200}}
                                    value={contents}
                                    onChange={(ev) => setContents(ev.target.value)}
                                    placeholder="Enter your comment"
                                    disabled={isLoading}
                                />
                                {isLoading && (
                                    <div className="remove-media-loading-overlay">
                                        <LoadingIcon loading={true} size={15}/>
                                    </div>
                                )}
                            </div>
                            :
                            <p>{contents}</p>
                        }
                    </Modal.Body>
                </Modal.Body>
                {isCurrent &&
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSave} disabled={contents === initContents}>
                            Save
                        </Button>
                    </Modal.Footer>
                }
            </Modal>
        </>
    );
}
