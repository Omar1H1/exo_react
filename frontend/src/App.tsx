import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; // Use BrowserRouter

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
