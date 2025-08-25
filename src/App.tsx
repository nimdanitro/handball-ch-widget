import "@fortawesome/fontawesome-svg-core/styles.css";
import "./App.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router";
import Help from "./components/help";
import Team from "./containers/team";
import Verein from "./containers/verein";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Help />} />
				<Route path="/verein/:id" element={<Verein />} />
				<Route path="/team/:id" element={<Team />} />
			</Routes>
		</Router>
	);
}

export default App;
