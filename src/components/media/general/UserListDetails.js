import React from "react";
import {Button, Card} from "react-bootstrap";
import {FaMinus} from "react-icons/fa";

import {useUser} from "../../../providers/UserProvider";
import {getUserMetric} from "../../../utils/functions";
import useApiUpdater from "../../../hooks/UserUpdateAPI";
import HistoryModal from "./HistoryModal";
import FavoriteIcon from "./FavoriteIcon";
import HLine2 from "../../primitives/HLine2";
import TVUserDetails from "../tv/TVUserDetails";
import MoviesUserDetails from "../movies/MoviesUserDetails";
import GamesUserDetails from "../games/GamesUserDetails";
import BooksUserDetails from "../books/BooksUserDetails";
import Commentary from "./Commentary";
import useLoading from "../../../hooks/LoadingHook";


const mediaComponentMap = {
	"series": TVUserDetails,
	"anime": TVUserDetails,
	"movies": MoviesUserDetails,
	"games": GamesUserDetails,
	"books": BooksUserDetails,
}


export default function UserListDetails({ mediaId, mediaType, userData, totalPages, deleteMedia, callbackDelete, show }) {
	const { currentUser } = useUser();
	const [isLoading, handleLoading] = useLoading();
	const MediaUserDetails = mediaComponentMap[mediaType];
	const userMetric = getUserMetric(currentUser.add_feeling, userData);
	const updatesAPI = useApiUpdater(mediaId, mediaType);

	const handleDeleteMedia = async () => {
		show(async () => {
			const response = await handleLoading(deleteMedia)
			if (response) {
				await callbackDelete();
			}
		});
	};


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
					initContent={userData.comment}
					updateComment={updatesAPI.comment}
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
