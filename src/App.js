import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import SetProfile from "./components/SetProfile";
import ViewProfile from "./components/ViewProfile";
import Profile from "./components/Profile";
import ViewUsers from "./components/ViewUsers";
// import "./App.css";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/setProfile" element={<SetProfile />} />
                    <Route path="/viewProfile" element={<ViewProfile />} />
                    <Route path="/users" element={<ViewUsers />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
