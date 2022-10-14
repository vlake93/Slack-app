import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUpPage from "./pages/Signup/SignUpPage";

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
