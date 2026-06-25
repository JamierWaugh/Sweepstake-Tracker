import './App.css'
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Create from "./pages/create";
import Teams from "./pages/teams";
import Groups from "./pages/groups";
import Games from "./pages/games";
import League from "./pages/league";
import Bracket from "./pages/bracket";



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Create />}/>
        <Route path="/teams" element={<Teams />}/>
        <Route path="/groups" element={<Groups />}/>
        <Route path="/games" element={<Games />}/>
        <Route path="/league" element={<League />}/>
        <Route path="/bracket" element={<Bracket />}/>
      </Routes>
    </Router>
    /* Components can only have one parent element (div here) but if we use a fragment <> </> we can have multiple children*/
  )
}

export default App;
