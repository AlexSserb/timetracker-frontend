import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";


function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
    authService.logout();
  }, [navigate]);
  
  return (
    <div></div>
  );
}

export default Logout;