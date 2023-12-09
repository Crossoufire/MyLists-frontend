import {useState} from "react";
import {FaCaretDown, FaCaretRight} from "react-icons/fa";


const useCollapse = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [caret, setCaret] = useState(FaCaretDown);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
        !isOpen ? setCaret(FaCaretDown) : setCaret(FaCaretRight);
    };

    return { isOpen, caret, toggleCollapse };
};


export default useCollapse;
