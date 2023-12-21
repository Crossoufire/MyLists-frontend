import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {FaRegEdit} from "react-icons/fa";

import HLine2 from "../../primitives/HLine2";
import useLoading from "@/stuff/hooks/LoadingHook";
import AddTooltip from "../../primitives/AddTooltip";
import LoadingIcon from "../../primitives/LoadingIcon";


export default function Commentary({ initContent, updateComment }) {
    const [initContents, setInitContents] = useState(initContent || "");
    const [contents, setContents] = useState(initContent || "");
    const [commentInput, setCommentInput] = useState(false);
    const [isLoading, handleLoading] = useLoading();

    const handleSave = async () => {
        if (initContent === contents) {
            return;
        }

        await handleLoading(updateComment, contents);
        setInitContents(contents);
        setCommentInput(false);
    }


    return (
        <>
            <h4 className="d-flex justify-content-between m-t-20 fw-5">
                Comment
                <AddTooltip title={"Edit comment"} addSpan>
                    <FaRegEdit className="cu-p" onClick={() => setCommentInput(!commentInput)}/>
                </AddTooltip>
            </h4>
            <HLine2/>
            {commentInput ?
                <>
                    <textarea
                        className="w-100"
                        style={{height: 100}}
                        value={contents}
                        onChange={(ev) => setContents(ev.target.value)}
                        placeholder="Enter your comment"
                        disabled={isLoading}
                    />
                    {isLoading &&
                        <div className="remove-media-loading-overlay">
                            <LoadingIcon loading={true} size={15}/>
                        </div>
                    }
                    <div className="d-flex justify-content-end gap-3">
                        <Button variant="danger" size="sm" onClick={() => setCommentInput(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleSave} disabled={contents === initContents}>
                            {isLoading ? "Loading..." : "Save"}
                        </Button>
                    </div>
                </>
                :
                <p className="text-grey">
                    {(contents === "" || contents === null) ? <i>No comments added yet.</i> : <i>{contents}</i>}
                </p>
            }
        </>
    )
}
