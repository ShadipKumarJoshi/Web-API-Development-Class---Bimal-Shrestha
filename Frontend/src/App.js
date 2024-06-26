
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Stopwatch from "./components/StopWatch";

// Toast config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./pages/admin/admin_dashboard/AdminDashboard";
import UpdateProduct from "./pages/admin/update_product/UpdateProduct";
import Profile from "./pages/profile/Profile";
import AdminRoutes from "./protected_routes/AdminRoutes";
import UserRoutes from "./protected_routes/UserRoutes";
import ForgotPassword1 from "./pages/forgot_password/ForgotPassword1";



function App() {
  return (
    // <div>
    //   <h1>Welcome to our REACT APP</h1>
    // </div>
    // every route has path, element

    // <Route path='/register' element={<h1>Register page </h1>} />
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Initial Routes */}
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path="/stopwatch" element={<Stopwatch/>} />{" "}

        {/* Admin Routes */}
        {/* <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/update/:id' element={<UpdateProduct />} /> */}

        <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/update/:id' element={<UpdateProduct />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/forgot_password' element ={<ForgotPassword1 />} />
        </Routes>
    </Router>
  );
}

export default App;
