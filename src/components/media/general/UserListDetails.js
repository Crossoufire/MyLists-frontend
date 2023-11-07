import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {FaMinus} from "react-icons/fa";

import {useUser} from "../../../contexts/UserProvider";
import {useApiUpdater} from "../../../hooks/UserUpdateAPI";
import {getUserMetric} from "../../../utils/functions";
import HistoryModal from "./HistoryModal";
import FavoriteIcon from "./FavoriteIcon";
import HLine2 from "../../primitives/HLine2";
import TVUserDetails from "../tv/TVUserDetails";
import MoviesUserDetails from "../movies/MoviesUserDetails";
import GamesUserDetails from "../games/GamesUserDetails";
import BooksUserDetails from "../books/BooksUserDetails";
import Commentary from "./Commentary";
import {useLoading} from "../../../hooks/LoadingHook";


const mediaComponentMap = {
	"series": TVUserDetails,
	"anime": TVUserDetails,
	"movies": MoviesUserDetails,
	"games": GamesUserDetails,
	"books": BooksUserDetails,
}


export default function UserListDetails({ mediaId, mediaType, userData, totalPages, deleteMedia, callbackDelete }) {
	const { currentUser } = useUser();
	const [showComment, setShowComment] = useState(false);
	const [isLoading, handleLoading] = useLoading();
	const MediaUserDetails = mediaComponentMap[mediaType];
	const userMetric = getUserMetric(currentUser.add_feeling, userData);
	const updatesAPI = useApiUpdater(mediaId, mediaType);

	const handleDeleteMedia = async () => {
		if (!window.confirm(`Remove this ${mediaType} from your list?`)) {
			return;
		}

		const response = await handleLoading(deleteMedia)
		if (response) {
			callbackDelete();
		}
	}


	return (
		<Card className="bg-card m-t-20 m-b-30 text-light" style={{width: 300}}>
			<Card.Body className="p-3">
				<Card.Title>
					<h4 className="d-flex justify-content-between align-items-center">
						<div>
							List info<span>&nbsp;|&nbsp;</span>
							<HistoryModal history={userData.history}/>
						</div>
						<FavoriteIcon
							initFav={userData.favorite}
							updateFavorite={updatesAPI.favorite}
						/>
					</h4>
				</Card.Title>
				<HLine2/>
				<MediaUserDetails
					userData={userData}
					userMetric={userMetric}
					totalPages={totalPages}
					updatesAPI={updatesAPI}
				/>
				<Commentary
					showComment={showComment}
					initComment={userData.comment}
					updateComment={updatesAPI.comment}
					toggleComment={() => setShowComment(!showComment)}
				/>
			</Card.Body>
			<Card.Footer>
				<div className="text-center">
					<Button variant="danger" onClick={handleDeleteMedia} className="shadow-0">
						{isLoading ?
							<span>Loading...</span>
							:
							<><FaMinus size={13} className="m-b-2"/>&nbsp; Remove from your list</>
						}

					</Button>
				</div>
			</Card.Footer>
		</Card>
	)
};
