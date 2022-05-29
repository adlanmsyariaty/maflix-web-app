import "./App.css";
import "@material-tailwind/react/tailwind.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Landing from "./pages/Landing";
import Nav from "./components/Nav.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:movieId" element={<Detail />} />
        <Route path="*" element={<h1 className="h-screen text-center text-white text-4xl pt-20">Page not found: 404!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
