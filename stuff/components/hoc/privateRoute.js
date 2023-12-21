import {useRouter} from "next/navigation";

import {useUser} from "@/stuff/providers/UserProvider";
import {useFlash} from "@/stuff/providers/FlashProvider";


const withPrivateRoute = (WrappedComponent) => {
    return (props) => {
        const flash = useFlash();
        const { push } = useRouter();
        const { currentUser } = useUser();

        if (currentUser === undefined) {
            return null;
        } else if (currentUser) {
            return <WrappedComponent {...props}/>;
        } else {
            flash("You need to log in before accessing this page.", "info");
            push("/");
            return null;
        }
    };
};

export default withPrivateRoute;
