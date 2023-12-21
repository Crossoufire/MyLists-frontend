import {useApi} from "../contexts/ApiProvider";
import {useFlash} from "../contexts/FlashProvider";


const useAdminApi = () => {
    const api = useApi();
    const flash = useFlash();

    const makeUpdateFunction = (url) => async (user_id, payload=null) => {
        const response = await api.post(url, {
            user_id: user_id,
            payload: payload,
        });

        if (!response.ok) {
            return flash(response.body.description, "danger");
        }

        flash(response.body.message, "success");
    };

    const role = makeUpdateFunction("/admin/update_role");
    const deletion = makeUpdateFunction("/admin/delete_account");

    return { role, deletion };
};


export default useAdminApi;
