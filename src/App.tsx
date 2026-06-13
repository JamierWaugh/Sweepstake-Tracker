import './App.css'
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Groups from "./pages/groups";
import Games from "./pages/games";
import League from "./pages/league";



function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/groups" element={<Groups />}/>
        <Route path="/games" element={<Games />}/>
        <Route path="/league" element={<League />}/>
      </Routes>
    </Router>
    /* Components can only have one parent element (div here) but if we use a fragment <> </> we can have multiple children*/
  )
}

export default App;
