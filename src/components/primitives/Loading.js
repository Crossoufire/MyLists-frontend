import {BounceLoader, ClipLoader} from "react-spinners";


export default function Loading({ style="loading-spinner", size=40 }) {
    return (
        <div className={`${style} text-light`}>
            <ClipLoader
                size={size}
                color="#e2e2e2"
            />
        </div>
    )
}
