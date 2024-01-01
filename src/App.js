import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SWRConfig} from "swr";

import ApiProvider from "./providers/ApiProvider";
import FlashProvider from "./providers/FlashProvider";
import UserProvider from "./providers/UserProvider";

import Header from "./components/Navbar/Header";
import Footer from "./components/app/Footer";
import Content from "./components/app/Content";

import AdminPage from "./pages/AdminPage";
import AdminDashBoardPage from "./pages/AdminDashboardPage";
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
import SettingsPage from "./pages/SettingsPage";
import TrendsPage from "./pages/TrendsPage";
import ComingNext from "./pages/ComingNextPage";
import HallOfFamePage from "./pages/HallOfFamePage";
import ChangelogPage from "./pages/ChangelogPage";
import InfoPage from "./pages/InfoPage";

import MediaLevelsPage from "./pages/MediaLevelsPage";
import ProfileLevelsPage from "./pages/ProfileLevelsPage";
import ErrorPage from "./pages/ErrorPage";

import "./css/utils.css";
import "./css/main.css";


const App = () => {
	return (
		<BrowserRouter>
			<FlashProvider>
				<ApiProvider>
					<UserProvider>
						<SWRConfig value={{revalidateOnFocus: false, revalidateOnReconnect: false}}>
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

			<Route path="/trends" element={<TrendsPage/>}/>
			<Route path="/hall_of_fame" element={<HallOfFamePage/>}/>
			<Route path="/global_stats" element={<GlobalStatsPage/>}/>
			<Route path="/changelog" element={<ChangelogPage/>}/>

			<Route path="/profile/coming_next" element={<ComingNext/>}/>
			<Route path="/profile/:username" element={<ProfilePage/>}/>
			<Route path="/profile/:username/:extension?" element={<ProfilePage/>}/>
			<Route path="/profile/settings" element={<SettingsPage/>}/>

			<Route path="/details/:mediaType/:mediaId" element={<MediaDetailsPage/>}/>
			<Route path="/details/form/:mediaType/:mediaId" element={<MediaEditPage/>}/>
			<Route path="/details/:mediaType/:job/:info" element={<InfoPage/>}/>

			<Route path="/list/:mediaType/:username?" element={<MediaListPage/>}/>

			<Route path="*" element={<ErrorPage/>}/>
		</Routes>
	);
}


export default App;