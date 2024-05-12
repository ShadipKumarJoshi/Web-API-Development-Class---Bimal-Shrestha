
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/Navbar";

// Toast config
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    // <div>
    //   <h1>Welcome to our REACT APP</h1>
    // </div>
    // every route has path, element

    // <Route path='/register' element={<h1>Register page </h1>} />
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>

        <Route path='/' element={<Homepage />} />

        <Route path='/register' element={<Register />} />

        <Route path='/login' element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
