import React, {useState} from "react";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {FaRegEdit} from "react-icons/fa";

import HLine2 from "../../primitives/HLine2";
import useLoading from "../../../hooks/LoadingHook";
import AddTooltip from "../../primitives/AddTooltip";


export default function Commentary({ showComment, initComment, updateComment, toggleComment }) {
    const [comment, setComment] = useState(initComment);
    const [isLoading, handleLoading] = useLoading();

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const formJson = Object.fromEntries(formData.entries());

        const response = await handleLoading(updateComment, formJson["comment"]);
        if (response) {
            setComment(formJson["comment"]);
            toggleComment();
        }
    }


    return (
        <>
            <h4 className="d-flex justify-content-between m-t-20 fw-5">
                Comment
                <AddTooltip title={"Edit comment"} addSpan>
                    <FaRegEdit className="cu-p" onClick={() => toggleComment()}/>
                </AddTooltip>
            </h4>
            <HLine2/>
            {!showComment ?
                <p className="text-grey">
                    {comment === "" || comment === null ?
                        <span><i>No comment added</i></span>
                        :
                        <i>{comment}</i>
                    }
                </p>
                :
                <form onSubmit={handleFormSubmit} method="POST">
					<textarea
                        disabled={isLoading}
                        className="bg-card text-light w-100"
                        name="comment"
                        defaultValue={comment}
                    />
                    <div className="d-flex justify-content-between">
                        <Button type="reset" variant="danger" size="sm" onClick={toggleComment}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" size="sm">
                            {isLoading ? "Loading..." : "Update"}
                        </Button>
                    </div>
                </form>
            }
        </>
    )
}
