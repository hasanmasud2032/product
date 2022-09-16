import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) 
     return children;
  
  return <Navigate to="/products" />;
}
