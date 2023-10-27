import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoute";

function Registration() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [nameerr, setNameerr] = useState();
  const [email, setEmail] = useState("");
  const [emailerr, setEmailerr] = useState();
  const [password, setPassword] = useState("");
  const [passworderr, setPassworderr] = useState();
  const [smsg, setSmsg] = useState(null);
  const [emsg, setEmsg] = useState(null);


  useEffect(() => {
    if (name.trim().length < 3 && name.length > 0)
      setNameerr("Name must be at least 3 characers");
    else setNameerr();
  }, [name]);

  useEffect(() => {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        password
      ) &&
      password.length > 0
    )
      setPassworderr(
        "Min 8 characters, at least 1 uppercase , 1 lowercase and 1 no"
      );
    else setPassworderr();
  }, [password]);

  useEffect(() => {
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email) &&
      email.length > 0
    )
      setEmailerr("Invalid email address");
    else setEmailerr();
  }, [email]);

  const onSubmit = async () => {
    if (name.length < 1) setNameerr("Name Field required");
    if (email.length < 1) setEmailerr("Email Field required");
    if (password.length < 1) setPassworderr("Password Field required");
    if (
      !emailerr &&
      !nameerr &&
      !passworderr &&
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0
    ) {
      try {
        const response = await fetch(registerRoute, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
        const data = await response.json();
        setName("");
        setNameerr();
        setEmail("");
        setEmailerr();
        setPassword("");
        setPassworderr();
        if (data.status) {
          setSmsg("registration succesfull");
          setTimeout(() => {
            setSmsg(null);
          }, 1500);
          setTimeout(() => {
            navigate("/login");
          }, 1590);
        } else {
          setEmsg(data.message);
          setTimeout(() => {
            setEmsg(null);
          }, 1500);
        }
      } catch (error) {
        setEmsg('Something went wrong');
          setTimeout(() => {
            setEmsg(null);
          }, 1500);
      }
    }
  };

  return show ? (
    <div className="fixed inset-0 bg-stone-500 bg-opacity-70 min-h-screen flex flex-col">
      {smsg && (
        <div
          className="p-4 mb-4 text-lg text-green-800 rounded-lg bg-teal-200 text-center"
          role="alert"
        >
          <span className="font-medium">{smsg}</span>
        </div>
      )}
      {emsg && (
        <div
          className="p-4 mb-4 text-lg text-red-700 rounded-lg
        bg-orange-300 text-center"
          role="alert"
        >
          <span className="font-medium">{emsg}</span>
        </div>
      )}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-gradient-to-r from-slate-500 to-slate-800 px-6 py-4 rounded shadow-md text-black w-full">
          <span
            type="button"
            className=" rounded-md flex items-center justify-end text-orange-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6 hover:text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              onClick={() => setShow(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <h1 className="mb-3 text-3xl font-serif text-slate-300 text-center">
            Sign up
          </h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded"
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="h-8 text-red-600">{nameerr}</div>

          <input
            type="text"
            className="block border border-grey-light w-full p-2 rounded"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="h-8 text-red-600">{emailerr}</div>

          <input
            type="password"
            className="block border border-grey-light w-full p-2 rounded"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="h-12 text-red-600">{passworderr}</div>

          <button
            onClick={() => onSubmit()}
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>
          <div className="text-amber-300 font-semibold mt-6">
            Already have an account ?
            <Link
              className="no-underline border-b border-blue text-zinc-200 pl-1"
              to="/login"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Registration;
