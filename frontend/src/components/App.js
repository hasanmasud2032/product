import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout> 
            <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route 
                  path="/login"  
                  element={
                         <PublicRoute>
                          <Login />
                        </PublicRoute>
                      } 
             />
              <Route 
                  path="/signup"  
                  element={
                         <PublicRoute>
                          <Signup />
                        </PublicRoute>
                      } 
             />

            <Route 
                  path="/dashboard"  
                  element={
                         <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      } 
             />

              <Route 
                  path="/products"  
                  element={
                         <PrivateRoute>
                          <Product />
                        </PrivateRoute>
                      } 
             />
            </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
