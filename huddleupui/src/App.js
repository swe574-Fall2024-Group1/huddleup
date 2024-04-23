import { Routes, Route, BrowserRouter } from "react-router-dom"
import Register from "./pages/Register"
import AuthProvider from "./components/Auth/AuthProvider";
import CommunityProvider from "./components/Community/CommunityProvider";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AppLayout from "layouts/MainLayout";
import CommunityLayout from "layouts/CommunityLayout";
import Login from "pages/Login";
import AlreadyLoginned from "components/Auth/AlreadyLoginned";
import CreateCommunity from "pages/Community/CreateCommunity";
import CommunityFeed from "pages/Community/CommunityFeed";
import AddTemplate from "pages/Community/AddTemplate";
import CreatePost from "pages/Community/CreatePost";

function App() {

	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route>
						<Route>
							<Route path="/register" element={<AlreadyLoginned><Register /> </AlreadyLoginned>} />
							<Route path="/login" element={<AlreadyLoginned><Login /></AlreadyLoginned>} />
						</Route>
						<Route path="/communities/new" element={
							<ProtectedRoute>
								<AppLayout>
									<CreateCommunity />
								</AppLayout>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout>
										<CommunityFeed />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId/create-template" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout>
										<AddTemplate />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId/create-post" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout>
										<CreatePost />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider >
	)
}

export default App