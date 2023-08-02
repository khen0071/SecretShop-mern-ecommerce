import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Spinner from "../component/shared/Spinner";
import { toast } from "react-toastify";
import RevealScale from "../component/shared/RevealScale";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <RevealScale>
        <div className="formContainer">
          <div className="formContent">
            <h1 className="text-center text-[14px] font-semibold uppercase text-gray md:text-[18px]">
              Welcome Back
            </h1>
            <p className="text-center text-[18px]  font-bold uppercase pb-3 border-b mb-3 md:text-[24px]">
              Sign In
            </p>
            <form onSubmit={submitHandler}>
              <div className="flex flex-col py-3">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Email
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="text"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col py-3">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Password
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div
                className="flex items-center space-x-1 justify-center my-2 cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                <i className="fa-solid fa-eye"></i>
                <p>Show Password</p>
              </div>

              <div className="flex justify-center items-center my-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="buttonContainer text-[14px] md:text-[16px] w-[150px]"
                >
                  Login
                </button>
              </div>

              {isLoading && <Spinner />}

              <div className="text-center mt-6">
                <p>Don't have an account yet? </p>
                <strong className="text-emeraldGreen">
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                  >
                    Sign Up
                  </Link>
                </strong>
              </div>
            </form>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default LoginScreen;
