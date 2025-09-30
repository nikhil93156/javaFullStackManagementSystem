import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App=()=>{
  return(
    <>
    <Router>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </Router>
    </>
  )
}
export default App;