import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <div className="">
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
