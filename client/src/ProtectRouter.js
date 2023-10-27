import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authRoute } from "./utils/APIRoute";
import { AuthContext } from "./Context/AuthProvider";
import Errorpage from "./components/Errorpage";

function ProtectRouter() {
  const { DISPATCH } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const findUser = async () => {
    const isToken = localStorage.getItem("Token");
    if (isToken) {
      try {
        const response = await fetch(authRoute, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: isToken,
          }),
        });
        const data = await response.json();

        if (data.status === true) {
          DISPATCH({ type: "set", value: data.user });
          setLoading(false);
        } else {
          data.msg ? setErr(true) : setLoading(false);
        }
      } catch (err) {
        setErr(true);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return err ? <Errorpage /> : loading ? <></> : <Outlet />;
}

export default ProtectRouter;
