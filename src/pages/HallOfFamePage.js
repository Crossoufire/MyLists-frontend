import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";

import {maxWidthHoF} from "../utils/constants";
import {useDebounce} from "../hooks/DebouceHook";
import {useUser} from "../contexts/UserProvider";
import {useApi} from "../contexts/ApiProvider";
import HLine from "../components/primitives/HLine";
import ErrorPage from "./ErrorPage";
import Loading from "../components/primitives/Loading";
import CustomPagination from "../components/primitives/CustomPagination";
import HoFCard from "../components/HoF/HoFCard";


const INITIAL_PARAMS = {
    search: "",
    page: 1,
};


export default function HallOfFamePage() {
    const api = useApi();
    const { currentUser } = useUser();
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(INITIAL_PARAMS.search);
    const [users, setUsers] = useState({nodes: [], totalPages: 0, page: INITIAL_PARAMS.page});

    async function fetchData(params) {
        const response = await api.get("/hall_of_fame", {
            search: params.search,
            page: params.page,
        });

        if (!response.ok) {
            setError({
                status: response.status,
                message: response.body.message,
            });
        }

        setUsers({
            nodes: response.body.data.users,
            totalPages: response.body.data.pages,
            page: response.body.data.page,
        });
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchData({
                search: INITIAL_PARAMS.search,
                page: INITIAL_PARAMS.page
            });
            setLoading(false);
        })();
    }, []);

    const resetSearch = async () => {
        setSearch("");

        await fetchData({
            search: INITIAL_PARAMS.search,
            page: INITIAL_PARAMS.page,
        })
    }
    const handleOnChange = (ev) => {
        setUsers({
            ...users,
            page: INITIAL_PARAMS.page,
        })

        if (ev.target.value === "") {
            resetSearch();
        }

        setSearch(ev.target.value);
    }
    const onChangePage = (page) => {
        fetchData({
            search: search,
            page: page}
        );
    }

    useDebounce(search, 400, fetchData, {
        search: search,
        page: users.page
    });

    if (error?.status) {
        return <ErrorPage {...error}/>;
    }

    if (loading) {
        return <Loading/>;
    }


    return (
        <div className="m-t-30 m-b-50">
            <h4>Hall of Fame</h4>
            <HLine/>
            <div className="m-l-r-auto" style={{maxWidth: maxWidthHoF}}>
                <div className="d-flex justify-content-start m-t-20 m-b-15">
                    <input
                        className="p-1"
                        style={{borderRadius: "8px", border: "none"}}
                        placeholder="Search by username"
                        value={search}
                        onChange={handleOnChange}
                    />
                    {search && <Button className="m-l-15" size="sm" onClick={resetSearch}>Cancel</Button>}
                </div>
                {users.nodes.map(item =>
                    <HoFCard
                        key={item.username}
                        currentUser={currentUser}
                        item={item}
                    />
                )}
                <CustomPagination
                    currentPage={users.page}
                    totalPages={users.totalPages}
                    onChangePage={onChangePage}
                />
            </div>
        </div>
    )
}