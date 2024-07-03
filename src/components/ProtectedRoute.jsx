import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(function () {
    if (isAuth === false) {
      navigate("/login");
    }
  });

  if (isAuth === true) return children;
}
