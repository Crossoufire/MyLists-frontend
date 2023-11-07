import {useApi} from "../contexts/ApiProvider";
import {useFlash} from "../contexts/FlashProvider";


export function useApiUpdater(mediaId, mediaType) {
    const api = useApi();
    const flash = useFlash();

    const makeUpdateFunction = (url, area) => async (payload=null) => {
        const response = await api.post(url, {
            media_id: mediaId,
            media_type: mediaType,
            payload: payload
        }, { area: area });

        if (!response.ok) {
            flash(response.body.message, "danger");
            return false;
        }

        if (response.body?.data) {
            return response.body.data;
        }

        return true;
    };

    const favorite = makeUpdateFunction("/update_favorite", "favorite");
    const status = makeUpdateFunction("/update_status", "status");
    const metric = makeUpdateFunction("/update_metric", "metric");
    const redo = makeUpdateFunction("/update_redo", "redo");
    const season = makeUpdateFunction("/update_season", "season");
    const episode = makeUpdateFunction("/update_episode", "episode");
    const page = makeUpdateFunction("/update_page", "page");
    const playtime = makeUpdateFunction("/update_playtime", "playtime");
    const comment = makeUpdateFunction("/update_comment", "comment");
    const refresh = makeUpdateFunction("/refresh/"+mediaType+"/"+mediaId, "refresh");
    const addMedia = makeUpdateFunction("/add_media", "add");
    const deleteMedia = makeUpdateFunction("/delete_media", "delete");
    const addBookCover = makeUpdateFunction("/details/add_book_cover", "bookCover");

    return {favorite, status, metric, redo, season, episode, page, playtime, comment, refresh, addMedia,
        deleteMedia, addBookCover};
}
