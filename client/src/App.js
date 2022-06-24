import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import ShowComplaints from './components/ShowComplaints';
// import AddComplaints from './components/AddComplaints';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="navbar/*" element={<Navbar/>}/>
          {/* <Route path="navbar/*" render={(props) => <Navbar {...props}/>}/> */}
          {/* <Route path="navbar/*" element={<Navbar/>}/> */}
          {/* <Route path="navbar/*"  render={props => (
    <Navbar routeProps={props} />
  )}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
