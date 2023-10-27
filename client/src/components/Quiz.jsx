import React, { useContext, useEffect, useState } from "react";
import { FcLinux } from "react-icons/fc";
import { AiFillHtml5 } from "react-icons/ai";
import {
  SiMysql,
  SiPhp,
  SiDocker,
  SiAzuredevops,
  SiPython,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Registration from "./Registration";
import { AuthContext } from "../Context/AuthProvider";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [emsg, setEmsg] = useState(null);
  const { dispatch, Dispatch,user } =
    useContext(AuthContext);
  useEffect(() => {
    Dispatch({ type: "remove" });
    dispatch({ type: "remove" });
    if (location.state) {
      setEmsg(location.state);
      setTimeout(() => {
        setEmsg(null);
      }, 1500);
      navigate(-2);
    }
    if (!user) {
      setTimeout(() => {
        setShow(true);
      }, 5000);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-900 w-[100vw] min-h-[100vh] pb-6 text-center">
      {emsg && (
        <div
          className="fixed inset-0 h-[60px] p-4 mb-4 text-lg text-red-700 rounded-lg
        bg-cyan-300 opacity-75"
          role="alert"
        >
          <span className="font-medium">{emsg}</span>
        </div>
      )}
      <h1 className="text-6xl text-green-400 font-bold p-5 mb-3">
        Choose a topic!
      </h1>
      <h1 className="text-slate-50 text-3xl font-thin p-5 mb-7">
        Test your knowledge on a wide variety of topics!
      </h1>
      {user && (
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-7 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={() => {
            navigate("/result");
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            See Your Dashboard
          </span>
        </button>
      )}

      <div className="2xl:max-w-[1400px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] mx-auto grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 xsm:justify-center">
        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <FcLinux
              style={{ fontSize: "100px", marginLeft: "-6px" }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">Linux</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "Linux" })}
            >
              Take a quiz
            </button>
          </p>
        </div>

        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <AiFillHtml5
              style={{ fontSize: "100px", color: "green", marginLeft: "-6px" }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">Html</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "Html" })}
            >
              Take a quiz
            </button>
          </p>
        </div>

        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <SiMysql
              style={{ fontSize: "100px", color: "orange", marginLeft: "-6px" }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">MySQL</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "MySQL" })}
            >
              Take a quiz
            </button>
          </p>
        </div>

        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <IoLogoJavascript
              style={{ fontSize: "100px", color: "white", marginLeft: "-6px" }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">JavaScript</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "JavaScript" })}
            >
              Take a quiz
            </button>
          </p>
        </div>

        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <SiPhp
              style={{ fontSize: "100px", color: "blue", marginLeft: "-6px" }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">PHP</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "PHP" })}
            >
              Take a quiz
            </button>
          </p>
        </div>

        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <SiDocker
              style={{
                fontSize: "100px",
                color: "#18b9d9",
                marginLeft: "-6px",
              }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">Docker</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "Docker" })}
            >
              Take a quiz
            </button>
          </p>
        </div>

        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <SiAzuredevops
              style={{
                fontSize: "80px",
                color: "#a4d4de",
                marginLeft: "-6px",
              }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">DevOps</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "DevOps" })}
            >
              Take a quiz
            </button>
          </p>
        </div>

        <div className="block max-w-sm pt-1 pb-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="grid grid-cols-3">
            <SiPython
              style={{
                fontSize: "80px",
                color: "#94c447",
                marginLeft: "-6px",
              }}
              className="col-start-2"
            />
          </p>

          <p className="font-normal dark:text-gray-50 text-xl">Python</p>
          <span className="text-slate-300">
            Total questions: <strong>10</strong>
          </span>
          <p className="p-4">
            <button
              type="button"
              className="small-3 fw-600 bg-orange-500 rounded-xl p-2 cursor-pointer hover:bg-orange-600"
              onClick={() => navigate("/questions", { state: "Python" })}
            >
              Take a quiz
            </button>
          </p>
        </div>
      </div>

      <div className="pt-11 pb-11">
        <button
          className="bg-yellow-500 p-2 rounded-md text-slate-900 hover:text-lg hover:border-spacing-2 hover:cursor-pointer"
          onClick={() => navigate("/questions")}
        >
          Get Random Qustions
        </button>
      </div>
      {show && <Registration />}
    </div>
  );
}

export default Quiz;
