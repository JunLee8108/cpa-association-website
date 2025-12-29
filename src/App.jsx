import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";

import Home from "./components/pages/home/Home";
import Services from "./components/pages/services/Services";
import Contact from "./components/pages/contact/Contact";
import Team from "./components/pages/about/Team";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
