import "./App.css";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./Pages/Home.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
        {/* <Tasks/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
