import React, { useContext, useEffect, useState } from "react";
import Quiz from "../assets/Quiz.png";
import { loginRoute } from "../utils/APIRoute";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

function Login() {
  const { DISPATCH } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailerr, setEmailerr] = useState();
  const [pass, setPass] = useState("");
  const [passerr, setPasserr] = useState();
  const [emsg, setEmsg] = useState();

  const onSubmithandler = async () => {
    if (email.length < 1) setEmailerr("Email required");
    if (pass.length < 1) setPasserr("Password required");
    if (email.length > 1 && pass.length > 1) {
      try {
        const response = await fetch(loginRoute, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: pass,
          }),
        });
        const data = await response.json();
        setEmail("");
        setEmailerr();
        setPass("");
        setPasserr();
        if (data.status) {
          localStorage.setItem("Token", data.token);
          DISPATCH({ type: "set", value: data.user });
          navigate("/quiz");
        } else {
          setEmsg(data.msg);
          setTimeout(() => {
            setEmsg(null);
          }, 2000);
        }
      } catch (error) {
        setEmsg("Something went wrong");
        setTimeout(() => {
          setEmsg(null);
        }, 2000);
      }
    }
  };
  useEffect(() => {
    setEmailerr();
  }, [email]);
  useEffect(() => {
    setPasserr();
  }, [pass]);
  return (
    <div className="flex min-h-[100vh] w-full items-center md:pl-9 lg:pl-28 xl:pl-52  bg-gray-900 bg-cover bg-no-repeat bg-center bg-[url('./assets/clint-patterson-dYEuFB8KQJk-unsplash.jpg')]">
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img src={Quiz} width="80" alt="" srcSet="" />
            <h1 className="mb-2 text-2xl">Quizy</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <div className="text-lg">
            <input
              className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-red-600 text-center h-7">{emailerr}</div>

          <div className="text-lg">
            <input
              className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="Password"
              value={pass}
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className="text-red-600 text-center h-7">{passerr}</div>

          <div className="text-red-600 text-center h-7">{emsg}</div>

          <div className="flex justify-center text-lg text-black">
            <button
              onClick={() => onSubmithandler()}
              className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
            >
              Login
            </button>
          </div>
          <div className="text-amber-300 font-semibold mt-6">
            Create new account ?
            <Link
              className="no-underline border-b border-blue text-zinc-200 pl-1"
              to="/registration"
            >
              Sign up
            </Link>
          </div>
          <div className="text-center pt-4">
          <Link
            to="/quiz"
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>

            <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>

            <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>

            <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>

            <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
            <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
            <span className="relative">Go Back</span>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
