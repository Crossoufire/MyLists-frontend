import React, {useState, useEffect} from "react";


export default function CustomPagination({ currentPage, totalPages, onChangePage }) {
    const [pages, setPages] = useState([]);


    const generatePages = () => {
        const pageArr = [];
        let i = 1;
        while (i <= totalPages) {
            if (i === 1 || i === totalPages || (i >= currentPage-2 && i <= currentPage+2)) {
                pageArr.push(i);
            }
            else if (i === currentPage-3 || i === currentPage+3) {
                pageArr.push('...');
            }
            i++;
        }
        return pageArr;
    };

    useEffect(() => {
        setPages(generatePages());
    }, [currentPage, totalPages]);


    return (
        <ul className="pagination">
            {pages.map((page, index) => (
                <li key={index}>
                    {page === "..." ?
                        <span className="ellipsis">...</span>
                        :
                        <div className={page === currentPage ? "active" : ""} onClick={() => onChangePage(page)}>
                            {page}
                        </div>
                    }
                </li>
            ))}
        </ul>
    );
}
