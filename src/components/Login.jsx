import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { isAuth, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  useEffect(function () {
    if (isAuth) {
      navigate("/");
    }
  });

  return (
    <div className=" h-screen  flex flex-col justify-center items-center lg:grid  lg:grid-cols-2 mt-[70px] lg:mt-0 mr-12 ml-14">
      <div className="flex flex-col justify-center items-center lg:h-screen mb-10 text-center">
        <h1 className="text-6xl md:text-[90.81px] font-coiny text-smart">
          Academix Chat
        </h1>
        <span className="text-[#777] text-md md:text-[22px]">
          Academix chat helps you to chat and share with the other students and
          instructors
        </span>
      </div>
      <div className="flex flex-col  justify-center items-center lg:h-screen ">
        <section className=" border border-[#bdbdbdd8] rounded-xl text-center py-3 lg:py-[50px] px-20">
          <h1 className="text-smart text-xl lg:text-[40px] font-bold mb-5">
            Welcome Back
          </h1>
          <span className="text-xs md:text-[18px] text-[#777] mb-5">
            Enter Your Academix Account To Login
          </span>
          <form className="flex flex-col" onSubmit={handleLogin}>
            <div className="flex items-center justify-center relative border border-[#bdbdbdd8] rounded-lg mt-5">
              <FaRegUser className="mx-3 text-smart" />
              <input
                type="text"
                name="email"
                id="email"
                className="p-2 w-full rounded-lg outline-none text-xs md:text-md"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex items-center justify-center relative border border-[#bdbdbdd8] rounded-lg mt-5">
              <MdLockOutline className="mx-3 text-smart text-xl" />
              <input
                type="password"
                name="password"
                id="password"
                className="p-2 text-xs md:text-md w-full rounded-lg outline-none"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {error && (
              <p className="mt-5 p-2 bg-[#ee7676] rounded-lg text-sm text-white">
                {error}
              </p>
            )}
            <button
              className="bg-smart text-sm md:text-xl text-white px-16 py-2 mt-5 rounded-xl w-fit mx-auto"
              type="submit"
            >
              {loading === true ? "Loging in..." : "Login"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
