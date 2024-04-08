import { Routes, Route, BrowserRouter } from "react-router-dom"
import Register from "./pages/Register"
import AuthProvider from "./components/Auth/AuthProvider";
import Login from "pages/Login";
import AlreadyLoginned from "components/Auth/AlreadyLoginned";

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
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider >
	)
}

export default App