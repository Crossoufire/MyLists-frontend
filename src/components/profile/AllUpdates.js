import React, {useCallback, useEffect, useRef, useState} from "react";
import {Form} from "react-bootstrap";
import {Body, Cell, Header, HeaderCell, HeaderRow, Row, Table, useCustom} from "@table-library/react-table-library/table";
import {usePagination} from "@table-library/react-table-library/pagination";
import {Link} from "react-router-dom";

import {useApi} from "../../providers/ApiProvider";
import {useFlash} from "../../providers/FlashProvider";
import {createLocalDate, getMediaIcon} from "../../utils/functions";
import Payload from "../primitives/Payload";
import HLine from "../primitives/HLine";
import Return from "../primitives/Return";
import CustomPagination from "../primitives/CustomPagination";


const INITIAL_PARAMS = {
    search: "",
    page: 1,
};


export default function AllUpdates({ username }) {
    const api = useApi();
    const flash = useFlash();
    const timeout = useRef();
    const [search, setSearch] = useState(INITIAL_PARAMS.search);
    const [history, setHistory] = useState({ nodes: [], totalPages: 0 });


    const fetchData = useCallback(async (params) => {
        const response = await api.get(`/profile/${username}/history`, {
            search: params.search,
            page: params.page,
        });

        if (!response.ok) {
            return flash(response.body.message, "danger");
        }

        setHistory({
            nodes: response.body.data.history,
            totalPages: response.body.data.pages,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchData({
            search: INITIAL_PARAMS.search,
            page: INITIAL_PARAMS.page,
        });
    }, [fetchData]);

    function onSearchChange(action, state) {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(
            () => fetchData({
                search: state.search,
                page: pagination.state.page,
            }), 500
        );
    }

    useCustom("search", history, {
        state: { search },
        onChange: onSearchChange,
    });

    function onPaginationChange(action, state) {
        fetchData({
            search: search,
            page: state.page,
        });
    }

    const pagination = usePagination(history,
        { onChange: onPaginationChange, state: { page: INITIAL_PARAMS.page } },
        { isServer: true }
    );


    return (
        <div className="m-t-20 m-b-50">
            <h4>History</h4>
            <HLine/>
            <div className="m-b-15">
                <div className="d-flex justify-content-between m-t-20">
                    <Link className="text-light" to={`/profile/${username}`}>
                        <Return/>
                    </Link>
                    <Form.Control
                        style={{borderRadius: 6, border: "none", width: "auto"}}
                        placeholder="Search by name..."
                        value={search}
                        onChange={(ev) => setSearch(ev.target.value)}
                    />
                </div>
            </div>
            <div style={{overflowX: "auto"}}>
                <Table data={history} pagination={pagination}>
                    {(tableList) => (
                        <>
                            <Header>
                                <HeaderRow className="text-light w-50">
                                    <HeaderCell>Media type</HeaderCell>
                                    <HeaderCell>Name</HeaderCell>
                                    <HeaderCell>Update</HeaderCell>
                                    <HeaderCell>Date</HeaderCell>
                                </HeaderRow>
                            </Header>
                            <Body>
                                {tableList.map((item) => (
                                    <Row key={item.date} item={item} className="text-light">
                                        <Cell>{getMediaIcon(item.media_type, 30)}</Cell>
                                        <Cell>{item.media_name}</Cell>
                                        <Cell><Payload payload={item.update}/></Cell>
                                        <Cell>{createLocalDate(item.date)}</Cell>
                                    </Row>
                                ))}
                            </Body>
                        </>
                    )}
                </Table>
            </div>
            <div className="m-t-30">
                <CustomPagination
                    currentPage={pagination.state.page}
                    totalPages={history.totalPages}
                    onChangePage={pagination.fns.onSetPage}
                />
            </div>
        </div>
    )
}