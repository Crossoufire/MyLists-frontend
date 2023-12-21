import {useState} from "react";
import {FaCaretDown, FaCaretRight} from "react-icons/fa";


const useCollapse = (initPos = true) => {
    const [isOpen, setIsOpen] = useState(initPos);
    const [caret, setCaret] = useState(initPos ? <FaCaretDown/> : <FaCaretRight/>);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
        !isOpen ? setCaret(<FaCaretDown/>) : setCaret(<FaCaretRight/>);
    };

    return { isOpen, caret, toggleCollapse };
};


export default useCollapse;
