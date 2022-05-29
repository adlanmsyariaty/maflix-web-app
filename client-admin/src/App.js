import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import "@material-tailwind/react/tailwind.css";
import Register from "./components/Register"
import Genre from "./components/Genre"
import Cast from "./components/Cast"
import Movie from "./components/Movie"
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={
          <RequireAuth redirectPath={"/"}>
            <Login />
          </RequireAuth>
        } />
        <Route path="/" element={
          <RequireAuth redirectPath={"/login"}>
            <Home />
          </RequireAuth>
        }>
          <Route index element={<Movie />} />
          <Route path="" element={<Movie />} />
          <Route path="register" element={<Register />} />
          <Route path="genres" element={<Genre />} />
          <Route path="casts" element={<Cast />} />
        </Route>
        <Route path="*" element={<h1 className="h-screen text-center text-white text-4xl pt-20">Page not found: 404!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
