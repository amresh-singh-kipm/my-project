import Home from "./frontend/Home";
import About from "./frontend/About";
import Signup from "./frontend/Signup";
import Login from "./frontend/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./frontend/Footer";
import Post from "./frontend/Post";
import Postdata from "./frontend/Postdata";
import FormAssignment from "./frontend/FormAssignment";
import Updatepage from "./frontend/Updatepage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/signup"} element={<Signup />} />
          <Route exact path={"/about"} element={<About />} />
          <Route exact path={"/post"} element={<Post />} />
          <Route exact path={"/postdata"} element={<Postdata />} />
          <Route exact path={"/formassignment"} element={<FormAssignment />} />
          <Route exact path={"/updatepage"} element={<Updatepage/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
