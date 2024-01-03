import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/AuthService";


function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    authService.logout();
    navigate("/");
    window.location.reload();
  }, [navigate]);
  
  return (
    <div></div>
  );
}

export default Logout;