import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SWRConfig} from "swr";

import ApiProvider from "./providers/ApiProvider";
import FlashProvider from "./providers/FlashProvider";
import UserProvider from "./providers/UserProvider";

import Header from "./components/Navbar/Header";
import Footer from "./components/app/Footer";
import Content from "./components/app/Content";

import MediaListStats from "./components/medialist/MediaListStats";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AboutPage from "./pages/AboutPage";
import RegisterTokenPage from "./pages/RegisterTokenPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MediaEditPage from "./pages/MediaEditPage"
import ProfilePage from "./pages/ProfilePage";
import GlobalStatsPage from "./pages/GlobalStatsPage";
import MediaListPage from "./pages/MediaListPage";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import MediaStatsPage from "./pages/MediaStatsPage";
import SettingsPage from "./pages/SettingsPage";
import PersonsPage from "./pages/PersonsPage";
import TrendsPage from "./pages/TrendsPage";
import ComingNext from "./pages/ComingNextPage";
import HallOfFamePage from "./pages/HallOfFamePage";

import MediaLevelsPage from "./pages/MediaLevelsPage";
import ProfileLevelsPage from "./pages/ProfileLevelsPage";
import ErrorPage from "./pages/ErrorPage";

import "./css/utils.css";
import "./css/main.css";
import AdminPage from "./pages/AdminPage";
import AdminDashBoardPage from "./pages/AdminDashboardPage";
import PersonalMediaListPage from "./pages/PersonalMediaListPage";


const optionsSWR = {
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
}


const App = () => {
	return (
		<BrowserRouter>
			<FlashProvider>
				<ApiProvider>
					<UserProvider>
						<SWRConfig value={optionsSWR}>
							<Header/>
							<Content>
								<Routes>
									<Route path="/" element={<HomePage/>}/>
									<Route path="/about" element={<AboutPage/>}/>
									<Route path="/register_token" element={<RegisterTokenPage/>}/>
									<Route path="/forgot_password" element={<ForgotPasswordPage/>}/>
									<Route path="/reset_password" element={<ResetPasswordPage/>}/>
									<Route path="/privacy_policy" element={<PrivacyPolicyPage/>}/>
									<Route path="/levels/media_levels" element={<MediaLevelsPage/>}/>
									<Route path="/levels/profile_levels" element={<ProfileLevelsPage/>}/>
									<Route path="*" element={<PrivateRoutes/>}/>
								</Routes>
							</Content>
							<Footer/>
						</SWRConfig>
					</UserProvider>
				</ApiProvider>
			</FlashProvider>
		</BrowserRouter>
	);
};


const PrivateRoutes = () => {
	return (
		<Routes>
			<Route path="/admin" element={<AdminPage/>}/>
			<Route path="/admin/dashboard" element={<AdminDashBoardPage/>}/>
			<Route path="/coming_next" element={<ComingNext/>}/>
			<Route path="/current_trends" element={<TrendsPage/>}/>
			<Route path="/hall_of_fame" element={<HallOfFamePage/>}/>
			<Route path="/stats" element={<GlobalStatsPage/>}/>
			<Route path="/profile/:username" element={<ProfilePage/>}/>
			<Route path="/profile/:username/:extension?" element={<ProfilePage/>}/>
			<Route path="/settings" element={<SettingsPage/>}/>
			<Route path="/details/:mediaType/:mediaId" element={<MediaDetailsPage/>}/>
			<Route path="/details/form/:mediaType/:mediaId" element={<MediaEditPage/>}/>
			<Route path="/details/:mediaType/:job/:person" element={<PersonsPage/>}/>
			<Route path="/list/:mediaType/:username?" element={<MediaListPage/>}/>
			<Route path="/list/stats/:mediaType/:username" element={<MediaListStats/>}/>
			<Route path="/list/personal/:mediaType/:username" element={<PersonalMediaListPage/>}/>
			<Route path="/stats/:mediaType/:username" element={<MediaStatsPage/>}/>
			<Route path="*" element={<ErrorPage/>}/>
		</Routes>
	);
}


export default App;