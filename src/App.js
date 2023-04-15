import "./App.css";
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sentimental from "./pages/Sentimental";

function App() {
  return (
    <BrowserRouter>
      <Routes>
     <Route path="/" element={<Home/>}></Route>
     <Route path="/home" element={<Home/>}></Route>
     <Route index element={<Home />} />
     <Route path="/SentimentAnalysis" element={<Sentimental />}></Route>
      {/* <Home />
      <Sentimental /> */}
      </Routes>
      </BrowserRouter>
  );
}

export default App;