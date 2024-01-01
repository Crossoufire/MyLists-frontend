import {useApi} from "../providers/ApiProvider";
import {useFlash} from "../providers/FlashProvider";


export default function useApiUpdater(mediaId, mediaType) {
    const api = useApi();
    const flash = useFlash();

    const makeUpdateFunction = (url) => async (payload = null) => {
        const response = await api.post(url, {
            media_id: mediaId,
            media_type: mediaType,
            payload: payload,
        });

        if (!response.ok) {
            flash(response.body.description, "danger");
            return false;
        }

        if (response.body?.data) {
            return response.body.data;
        }

        return true;
    };

    const addMedia = makeUpdateFunction("/add_media");
    const deleteMedia = makeUpdateFunction("/delete_media");
    const favorite = makeUpdateFunction("/update_favorite");
    const status = makeUpdateFunction("/update_status");
    const metric = makeUpdateFunction("/update_metric");
    const redo = makeUpdateFunction("/update_redo");
    const season = makeUpdateFunction("/update_season");
    const episode = makeUpdateFunction("/update_episode");
    const page = makeUpdateFunction("/update_page");
    const playtime = makeUpdateFunction("/update_playtime");
    const comment = makeUpdateFunction("/update_comment");
    const refresh = makeUpdateFunction(`/details/refresh/${mediaType}/${mediaId}`);
    const addBookCover = makeUpdateFunction("/details/add_book_cover");
    const removeLabelFromMedia = makeUpdateFunction("/remove_label_from_media");
    const addMediaToLabel = makeUpdateFunction("/add_media_to_label");

    return { favorite, status, metric, redo, season, episode, page, playtime, comment, refresh, addMedia,
        deleteMedia, addBookCover, removeLabelFromMedia, addMediaToLabel };
}
