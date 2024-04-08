import { NavLink } from "react-router-dom";

const Navigation = ({ token, onLogout }) => {
	return (
	  <nav>
		<NavLink to="/home">Home</NavLink>
		<NavLink to="/dashboard">Dashboard</NavLink>

		{token && (
		  <button type="button" onClick={onLogout}>
			Sign Out
		  </button>
		)}
	  </nav>
	);
};

export default Navigation