import TVDetails from "../tv/TVDetails";
import MoviesDetails from "../movies/MoviesDetails";
import GamesDetails from "../games/GamesDetails";
import BooksDetails from "../books/BooksDetails";


const mediaDetailsMap = {
    "series": TVDetails,
    "anime": TVDetails,
    "movies": MoviesDetails,
    "games": GamesDetails,
    "books": BooksDetails,
}


export default function MediaDataDetails({ mediaType, mediaData }) {
    const MediaDetails = mediaDetailsMap[mediaType];

    return (
        <div className="fs-17">
            <MediaDetails
                mediaData={mediaData}
                mediaType={mediaType}
            />
        </div>
    )
}
