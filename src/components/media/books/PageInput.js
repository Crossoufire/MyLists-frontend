import React, {useEffect, useState} from "react";
import {useLoading} from "../../../hooks/LoadingHook";
import LoadingIcon from "../../primitives/LoadingIcon";


export default function PageInput({ initPage, totalPages, updatePage, isDisabled }) {
    const [backupPage, setBackupPage] = useState(initPage);
    const [page, setPage] = useState(initPage);
    const [isLoading, handleLoading] = useLoading();

    useEffect(() => {
        setPage(initPage);
    }, [initPage]);

    const handlePageOnBlur = async () => {
        if (parseInt(page) === backupPage) {
            return;
        }

        const response = await handleLoading(updatePage, page);
        if (response) {
            setBackupPage(parseInt(page));
        } else {
            setPage(backupPage);
        }
    }
    const onPageChange = (ev) => {
        setPage(ev.target.value);
    }


    return (
        <div className="d-flex justify-content-between">
            <div className="fw-5">Pages</div>
            <div style={{width: 150}}>
                {isLoading ?
                    <LoadingIcon loading={true} size={5}/>
                    :
                    <>
                        <input
                            disabled={isDisabled}
                            className="book-input"
                            value={page}
                            onBlur={(ev) => handlePageOnBlur(ev)}
                            onChange={onPageChange}
                        />
                        <span> / </span>
                        <span>{totalPages}</span>
                    </>
                }
            </div>
        </div>
    );
}
