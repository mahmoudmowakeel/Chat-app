import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logedin } from "../slices/AuthenticationSlice";

export default function AutoLogin({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAutoLogin = (storedToken) => {
      // Attempt auto-login with stored token (replace with your API logic)
      fetch("https://academix.runasp.net/api/Auth/AutoLogin/AutoLogin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`, // Adjust based on API
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data);
            dispatch(logedin(data));
            navigate("/");
            setIsLoggedIn(true);
            // Store refreshed token securely if applicable
          } else {
            console.log("error");
            setIsLoggedIn(false);
            localStorage.removeItem("jwtToken");
            // Handle refresh token failure (e.g., remove stored token)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      // Store the token from URL in localStorage
      localStorage.setItem("jwtToken", tokenFromUrl);
      // Attempt auto-login with the token from URL
      handleAutoLogin(tokenFromUrl);
    } else {
      // No token in URL, check localStorage
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        // Attempt auto-login with the token from localStorage
        handleAutoLogin(storedToken);
      }
    }
  }, []);
  return children;
}
