import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { addUsers, getFriends, getGroups } from "./slices/friendsSlice";
import { useDispatch, useSelector } from "react-redux";

import AutoLogin from "./components/AutoLogin";

function App() {
  const currentUserId = useSelector((state) => state.auth.user)?.userdata[0].Id;
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(addUsers());
      dispatch(getFriends({ UserId: currentUserId }));
      dispatch(getGroups({ UserId: currentUserId }));
    },
    [dispatch, currentUserId]
  );

  return (
    <BrowserRouter>
      <AutoLogin>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </AutoLogin>
    </BrowserRouter>
  );
}

export default App;
