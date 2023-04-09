import './App.css';
import Navbar from './component/Navbar';
import Main from './component/Main';
import {
  Route,
  Link,
} from "react-router-dom";
function App() {
  return (
    <>
     <Navbar/>
     <Main/>
    </>
  );
}

export default App;
