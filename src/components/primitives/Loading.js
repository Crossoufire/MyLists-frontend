import {ClipLoader} from "react-spinners";


export default function Loading({ addStyle = "loading-spinner", size = 40 }) {
    return (
        <div className={`${addStyle} text-light`}>
            <ClipLoader
                size={size}
                color="#e2e2e2"
            />
        </div>
    )
}
