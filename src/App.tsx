import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DataExplorer from "./pages/data-explorer/DataExplorer";
import { Routes, Route } from "react-router-dom";
import Error from "./components/error/Error";
import NavbarComp from "./components/navbar/Navbar";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <Routes>
        <Route path="/" element={<DataExplorer />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
