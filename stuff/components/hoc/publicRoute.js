import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";

import {useUser} from "@/stuff/providers/UserProvider";


const withPublicRoute = (WrappedComponent) => {
    return (props) => {
        const { push } = useRouter();
        const pathname = usePathname();
        const { currentUser } = useUser();

        if (currentUser === undefined) {
            return null;
        } else if (currentUser && pathname === "/") {
            return push(`/profile/${currentUser.username}`);
        } else {
            return <WrappedComponent {...props}/>;
        }
    };
};

export default withPublicRoute;
