import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div className="h-[90vh]">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
