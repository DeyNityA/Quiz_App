import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { getResultRoute, setResultRoute } from "../utils/APIRoute";
import { Link, useNavigate } from "react-router-dom";

function Result() {
  const { dispatch, Q_10s, Dispatch, ans_store, user, DISPATCH } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [res, setRes] = useState(null);
  const [emsg, setEmsg] = useState(null);
  const [prev, setPrev] = useState([]);

  function get_result(Q_s, ans) {
    let correct_answer = 0;
    let attempted_answer = 0;
    for (let id in ans) {
      for (let i in Q_s) {
        if (id == Q_s[i].id && ans[id].length != 0) {
          attempted_answer++;
          let ans_r = [];
          for (let j in Q_s[i].correct_answers) {
            if (Q_s[i].correct_answers[j] === "true") {
              ans_r.push(j.substring(0, 8));
            }
          }
          if (Array.isArray(ans[id])) {
            if (ans[id] === ans_r) correct_answer++;
          } else {
            if (ans_r[0] === ans[id]) correct_answer++;
          }
        }
      }
    }
    return [correct_answer, attempted_answer];
  }

  async function get_res() {
    try {
      const response = await fetch(`${getResultRoute}`,{
        method: "POST",
        mode: "cors",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id
        })
      });
      const data = await response.json();
      if (data.status) setPrev(data.results);
      else {
        setEmsg("Something went wrong");
        setTimeout(() => {
          setEmsg(null);
        }, 1500);
      }
    } catch (err) {
      setEmsg("Something went wrong");
      setTimeout(() => {
        setEmsg(null);
      }, 1500);
    }
  }
  useEffect(() => {
    if (!user) navigate("/quiz");
    get_res();
    if (
      Object.keys(Q_10s).length !== 0 &&
      Object.keys(ans_store).length !== 0
    ) {
      let rres = get_result(Q_10s, ans_store);
      setRes(rres);
      async function Result(rres) {
        try {
          const response = await fetch(setResultRoute, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user._id,
              attempted: rres[1],
              correct: rres[0],
            }),
          });
          const data = await response.json();
          if (data.status === false) {
            setEmsg("Something went wrong");
            setTimeout(() => {
              setEmsg(null);
            }, 1500);
          }
        } catch (err) {
          setEmsg("Something went wrong");
          setTimeout(() => {
            setEmsg(null);
          }, 1500);
        }
      }
      Result(rres);
    }
    Dispatch({ type: "remove" });
    dispatch({ type: "remove" });
  }, []);
  return (
    <div className="min-h-[100vh] bg-gradient-to-r from-emerald-400 to-cyan-400">
      {emsg && (
        <div
          className="w-[100vw] fixed p-4 mb-4 text-lg text-red-700 rounded-lg
        bg-orange-300 text-center"
          role="alert"
        >
          <span className="font-medium">{emsg}</span>
        </div>
      )}
      <div className="md:flex justify-around items-center p-7">
        <h1 className="text-4xl text-slate-800 font-bold p-5 text-center mb-3">
          DASHBOARD
        </h1>
        <div className="m-3 text-center">
          <button
            className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
            onClick={() => {
              localStorage.clear();
              DISPATCH({ type: "remove" });
              navigate("/");
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Log out
            </span>
            <span className="relative invisible">Button Text</span>
          </button>
        </div>
      </div>
      {res && (
        <div className="max-w-[300px] mx-auto border-2 border-neutral-900 p-2 mb-9 font-semibold">
          <div className="flex justify-between p-2 ">
            <h1>username</h1>
            <h1>{user.name}</h1>
          </div>
          <div className="flex justify-between p-2">
            <h1>Total Quiz Points</h1>
            <h1>50</h1>
          </div>
          <div className="flex justify-between p-2">
            <h1>Total Questions</h1>
            <h1>10</h1>
          </div>
          <div className="flex justify-between p-2">
            <h1>Question Attempts</h1>
            <h1>{res[1]}</h1>
          </div>
          <div className="flex justify-between p-2">
            <h1>Total Earn Points</h1>
            <h1>{res[0] * 5}</h1>
          </div>
          <div className="flex justify-between p-2">
            <h1>Quiz Result</h1>
            <h1>{res[0] >= 4 ? "Passed" : "Fail"}</h1>
          </div>
        </div>
      )}

      {prev.length > 0 ? (
        <div className="mx-auto bg-transparent max-w-[660px] max-h-[400px] scrollbar-thin scrollbar-track-blue-950 overflow-auto">
          <table className="text-sm text-left text-blue-100 w-full dark:text-blue-100 shadow-md sm:rounded-lg">
            <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Attempted Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Attempted
                </th>
                <th scope="col" className="px-6 py-3">
                  Correct
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {prev.map((res, index) => (
                <tr
                  className="bg-blue-500 border-b border-blue-400"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
                  >
                    {new Date(res.attempt_time).toLocaleString()}
                  </th>
                  <td className="px-6 py-4">{res.attempted}</td>
                  <td className="px-6 py-4">{res.correct}</td>
                  <td className="px-6 py-4">{res.correct * 5}</td>
                  <td className="px-6 py-4">
                    {res.correct >= 4 ? "Passed" : "Fail"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
     
        <div className="p-10 text-3xl text-center">
          Give Exam and see your result
        </div>
      

      <div className="p-6 text-center">
        <Link
          to="/quiz"
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
        >
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            Retake
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Result;
