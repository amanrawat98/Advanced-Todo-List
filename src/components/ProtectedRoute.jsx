import { useEffect, useState } from "react";
import { decodeJWT } from "../utils/jwtUtils";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('token');  //get token from local storage

    if (!userToken) {
      navigate("/register");
      return;
    }

    try {
      const decodedToken = decodeJWT(userToken);  // checks if token is valid or not
      if (decodedToken) {
        setIsAuthenticated(true);  // set authenticate true if token is valid
      } else {
        localStorage.removeItem('token');  //remove invalid taken from Local Storage and Navigate to register page
        navigate("/register");
      }
    } catch (error) {
      console.error("Token error:", error);

    }
  }, []);



  return isAuthenticated ? children : null;  // return Home Component if Token if Available and Valid
};

export default ProtectedRoute;
