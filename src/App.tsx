import '@fortawesome/fontawesome-svg-core/styles.css';
import './App.scss';
import Help from './components/help';
import Team from './containers/team';
import Verein from './containers/verein';


import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

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
