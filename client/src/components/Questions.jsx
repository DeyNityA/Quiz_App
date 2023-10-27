import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import Loader from "../assets/Loader.gif";
import { FcCdLogo } from "react-icons/fc";

function Questions() {
  const { user } = useContext(AuthContext);
  const { state } = useLocation();
  const { dispatch, Q_10s, Dispatch, ans_store } = useContext(AuthContext);
  const [no, setNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [checked_ans, setChecked_ans] = useState([]);
  const [checked, setChecked] = useState([]);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      Dispatch({ type: "save", id: Q_10s[no].id, ans: checked_ans });
    }
  }, [checked_ans]);

  useEffect(() => {
    if (!loading) {
      const arr = [];
      for (const key in Q_10s[no].answers) {
        if (Q_10s[no].answers[key] !== null)
          arr.push({ option_no: key, option: Q_10s[no].answers[key] });
      }

      setOptions(arr);
      if (Q_10s[no].id in ans_store) {
        setChecked_ans(ans_store[Q_10s[no].id]);
        setChecked(ans_store[Q_10s[no].id]);
      } else {
        setChecked_ans([]);
        setChecked([]);
      }
    }
  }, [no, loading]);

  useEffect(() => {
    if (!user) navigate("/login");

    async function getUser() {
      try {
        const api = state
          ? `https://quizapi.io/api/v1/questions?apiKey=XtvHFULCW64DRpvk4H1Q0OCah4oAZtkwyGmNF8yv&limit=10&category=${state}`
          : `https://quizapi.io/api/v1/questions?apiKey=XtvHFULCW64DRpvk4H1Q0OCah4oAZtkwyGmNF8yv&limit=10`;
        const response = await axios.get(api);
        dispatch({ type: "add", value: response.data });
        setLoading(false);
      } catch (error) {
        setErr("Can't Load Questions");
      }
    }
    getUser();
  }, []);

  return err ? (
    <> <Navigate to="/quiz" state={err}/></>
  ) : loading ? (
    <div className="h-[100vh] w-[100vw] bg-black flex items-center justify-center">
      <img src={Loader} alt="loader" className="h-56"></img>
    </div>
  ) : (
    <div className="bg-[#1b1b1c] w-[100vw] min-h-[100vh]">
      <h1 className="text-4xl text-green-400 font-bold p-5 text-center mb-3">
        Quiz App
      </h1>
      <div className="p-11">
        <h1 className="text-amber-400 text-lg font-semibold p-3 min-h-[80px]">
          Q{no + 1}. {Q_10s[no].question}
        </h1>
        <div className="h-[250px] overflow-auto scrollbar-thin scrollbar-track-green-800">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 m-3"
            >
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor={`ripple-off-${option.option_no}`}
              >
                <input
                  id={`ripple-off-${option.option_no}`}
                  type="radio"
                  value={option.option_no}
                  checked={
                    `${Q_10s[no].multiple_correct_answers}` === "false"
                      ? checked_ans === option.option_no
                      : checked_ans.includes(option.option_no)
                  }
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  onClick={(e) => {
                    if (checked.includes(e.target.value)) {
                      const res = checked.filter(
                        (ele) => ele != e.target.value
                      );
                      if (Q_10s[no].multiple_correct_answers === "false"){
                        setChecked_ans([]);
                      }
                      else setChecked_ans(res);
                      setChecked(res);
                    } else {
                      if (Q_10s[no].multiple_correct_answers === "true"){
                        setChecked_ans([...checked_ans, e.target.value]);
                        setChecked([...checked_ans, e.target.value]);
                      }
                      else setChecked([ e.target.value]);
                    }
                  }}
                  onChange={(e) => {
                    if (Q_10s[no].multiple_correct_answers === "false")
                      setChecked_ans(e.target.value);
                  }}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                  </svg>
                </div>
              </label>
              <label
                className="mt-px cursor-pointer select-none font-medium text-white"
                htmlFor={`ripple-off-${option.option_no}`}
              >
                {option.option}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-between p-8">
          {no === 0 ? (
            <div></div>
          ) : (
            <button
              className="bg-teal-600 rounded-lg pl-2 pr-2 pt-1 pb-1 text-zinc-50 hover:bg-teal-800 hover:rounded-md"
              onClick={() => setNo(no - 1)}
            >
              Prev
            </button>
          )}
          {no === 9 ? (
            <button
              className="bg-lime-400 rounded-lg pl-2 pr-2 pt-1 pb-1 text-black font-extrabold text-xl hover:bg-green-600 hover:rounded-md"
              onClick={() => navigate("/result")}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-orange-600 rounded-lg pl-2 pr-2 pt-1 pb-1 text-zinc-50 hover:bg-orange-800 hover:rounded-md"
              onClick={() => setNo(no + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
