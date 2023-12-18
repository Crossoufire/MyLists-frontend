import React, {useRef, useState} from "react";
import {useOnClickOutside} from "../../hooks/ClickedOutsideHook";
import {FaCaretDown} from "react-icons/fa";


const styles = {
    zIndex: 9999,
    backgroundColor: "black",
    border: "1px solid gray",
    borderRadius: 7,
    paddingBottom: 2,
    width: "100%",
};


export function FeelingDropdown({ value, options, onSelect, size=140 }) {
    const ref = useRef();
    const refDrop = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(ref, () => setIsOpen(false), refDrop);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };


    return (
        <div className="cu-p position-relative" style={{width: size}}>
            <div className="d-flex justify-content-between align-items-baseline" ref={refDrop} onClick={toggleDropdown}>
                <div>&nbsp;{options.filter(item => item.value === value)[0]?.icon}</div>
                <span><FaCaretDown className="m-b-5"/></span>
            </div>
            {isOpen &&
                <ul ref={ref} className="list-unstyled position-absolute bg-card" style={styles}>
                    {options.map((option, idx) =>
                        <li key={idx} className="feeling-dropdown" onClick={() => handleOptionSelect(option.value)}>
                            <div className="m-l-5">{option.icon}</div>
                        </li>
                    )}
                </ul>
            }
        </div>
    );
}