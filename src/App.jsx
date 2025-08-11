import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./components/pages/home/Home";
import Navbar from "./components/layout/Navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
