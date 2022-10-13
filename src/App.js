import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes className="App">
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
