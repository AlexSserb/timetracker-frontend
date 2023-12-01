import React from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.service";


function Logout() {
  const navigate = useNavigate();

	authService.logout();
	navigate("/");
	window.location.reload();

  return (
    <div></div>
  );
}

export default Logout;