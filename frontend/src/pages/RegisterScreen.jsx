import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Spinner from "../component/shared/Spinner";
import { toast } from "react-toastify";
import RevealScale from "../component/shared/RevealScale";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <RevealScale>
        <div className="formContainer">
          <div className="formContent">
            <h1 className="text-center text-[14px] font-semibold uppercase text-gray md:text-[18px]">
              Welcome
            </h1>
            <p className="text-center text-[18px]  font-bold uppercase pb-3 border-b mb-3 md:text-[24px]">
              Sign Up
            </p>
            <form onSubmit={submitHandler}>
              <div className="flex flex-col py-1">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Name
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col py-1">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Email
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col py-1">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Password
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col py-1">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Confirm Password
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-center items-center my-3">
                <button
                  type="submit"
                  className="buttonContainer text-[14px] md:text-[16px] w-[150px]"
                >
                  Register
                </button>
              </div>

              {isLoading && <Spinner />}

              <div className="text-center mt-6">
                <p>Already have an account yet? </p>
                <strong className="text-emeraldGreen">
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  >
                    Sign In
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

export default RegisterScreen;
