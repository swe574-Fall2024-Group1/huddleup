import { Routes, Route, BrowserRouter } from "react-router-dom"
import Register from "./pages/Register"
import AuthProvider from "./components/Auth/AuthProvider";
import CommunityProvider from "./components/Community/CommunityProvider";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AppLayout from "./layouts/MainLayout";
import CommunityLayout from "./layouts/CommunityLayout";
import Login from "./pages/Login";
import AlreadyLoginned from "./components/Auth/AlreadyLoginned";
import CreateCommunity from "./pages/Community/CreateCommunity";
import CommunityFeed from "./pages/Community/CommunityFeed";
import AddTemplate from "./pages/Community/AddTemplate";
import CreatePost from "./pages/Community/CreatePost";
import CommunityInvitations from "./pages/Community/CommunityInvitations";
import UserInvitations from "./pages/UserInvitations";
import UserFeed from "./pages/UserFeed";
import { Navigate } from "react-router-dom";
import Communities from "./pages/Communities";
import Connections from "./pages/Connections";
import CommunitySettings from "./pages/Community/CommunitySettings";
import EditPost from "./pages/Community/EditPost";
import Discover from "./pages/Discover";

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
						<Route path="/feed" element={
							<ProtectedRoute>
								<AppLayout>
									<UserFeed />
								</AppLayout>
							</ProtectedRoute>
						}
						/>
						<Route path="/invitations" element={
							<ProtectedRoute>
								<AppLayout>
									<UserInvitations />
								</AppLayout>
							</ProtectedRoute>
						}
						/>
						<Route path="/connections" element={
							<ProtectedRoute>
								<AppLayout>
									<Connections />
								</AppLayout>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities" element={
							<ProtectedRoute>
								<AppLayout>
									<Communities />
								</AppLayout>
							</ProtectedRoute>
						}
						/>
						<Route path="/discover" element={
							<ProtectedRoute>
								<AppLayout>
									<Discover />
								</AppLayout>
							</ProtectedRoute>
						}
						/>
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
									<CommunityLayout allowedUserTypes={['owner', 'moderator', 'member']} canNotMembersSee={true}>
										<CommunityFeed />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId/settings" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout allowedUserTypes={['owner', 'moderator']}>
										<CommunitySettings />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId/create-template" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout allowedUserTypes={['owner', 'moderator']}>
										<AddTemplate />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId/create-post" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout allowedUserTypes={['owner', 'moderator', 'member']}>
										<CreatePost />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId/edit-post/:postId" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout allowedUserTypes={['owner', 'moderator', 'member']}>
										<EditPost />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						<Route path="/communities/:communityId/invitations" element={
							<ProtectedRoute>
								<CommunityProvider>
									<CommunityLayout allowedUserTypes={['owner', 'moderator']}>
										<CommunityInvitations />
									</CommunityLayout>
								</CommunityProvider>
							</ProtectedRoute>
						}
						/>
						{/* Wildcard Route */}
						<Route path="*" element={<Navigate to="/feed" replace />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider >
	)
}

export default App