import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const navVariant = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openHandler = () => {
    setMenu((prev) => !prev);
  };

  const menuClose = () => {
    setMenu(false);
  };

  return (
    <>
      <div className="navContainer">
        <motion.div
          variants={navVariant}
          initial="initial"
          animate="animate"
          className="navContent"
        >
          <Link to="/">
            <div className="logo gradientOverlay">SecretShop</div>
          </Link>

          <div className="navRight">
            {userInfo && userInfo.isAdmin ? (
              <>
                <div
                  onClick={openHandler}
                  className="flex items-center justify-center space-x-2"
                >
                  <span className="text-[14px] md:text-[18px]">
                    {userInfo.name}
                  </span>
                  <i className="fa-solid fa-square-caret-down"></i>
                </div>
                {menu === true && (
                  <div className="menuItems space-y-3">
                    <Link to="/admin/orderlist">
                      <p
                        className="font-semibold text-[12px] md:text-[16px]"
                        onClick={menuClose}
                      >
                        Orders
                      </p>
                    </Link>

                    <Link to="/admin/productlist">
                      <p
                        className="font-semibold text-[12px] md:text-[16px]"
                        onClick={menuClose}
                      >
                        Products
                      </p>
                    </Link>
                    <Link to="/admin/userlist">
                      <p
                        className="font-semibold text-[12px] md:text-[16px]"
                        onClick={menuClose}
                      >
                        Users
                      </p>
                    </Link>
                    <p
                      onClick={logoutHandler}
                      className="buttonNav text-[12px] md:text-[16px]"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </>
            ) : userInfo ? (
              <>
                <Link to="/cart">
                  <div className="flex justify-center items-center space-x-2">
                    <p className="font-semibold text-[12px] md:text-[16px]">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </p>
                    {cartItems.length > 0 ? (
                      <div className="flex justify-center items-center border-2 w-[20px] h-[20px] text-center bg-emeraldGreen rounded-full text-[12px]">
                        <p className="flex justify-start items-start">
                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center border-2 w-[20px] h-[20px] text-center bg-red rounded-full text-[12px]">
                        <p className="flex justify-start items-start">0</p>
                      </div>
                    )}
                  </div>
                </Link>
                <div
                  onClick={openHandler}
                  className="flex items-center justify-center space-x-2"
                >
                  <span className="text-[14px] md:text-[18px]">
                    {userInfo.name}
                  </span>
                  <i className="fa-solid fa-square-caret-down"></i>
                </div>
                {menu === true && (
                  <div className="menuItems space-y-2">
                    <Link to="/profile">
                      <p
                        className="font-semibold text-[12px] md:text-[16px]"
                        onClick={menuClose}
                      >
                        Profile
                      </p>
                    </Link>
                    <p
                      onClick={logoutHandler}
                      className="buttonNav text-[12px] md:text-[16px]"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/cart">
                  <div className="flex justify-center items-center space-x-2">
                    <p className="font-semibold text-[12px] md:text-[16px]">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </p>
                    {cartItems.length > 0 ? (
                      <div className="flex justify-center items-center border-2 w-[20px] h-[20px] text-center bg-emeraldGreen rounded-full text-[12px]">
                        <p className="flex justify-start items-start">
                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center border-2 w-[20px] h-[20px] text-center bg-red rounded-full text-[12px]">
                        <p className="flex justify-start items-start">0</p>
                      </div>
                    )}
                  </div>
                </Link>

                <Link to="/login">
                  <p className="buttonNav text-[12px] md:text-[16px]">
                    Sign In
                  </p>
                </Link>
              </div>
            )}

            {/* {userInfo && userInfo.isAdmin
              ? "admin"
              : userInfo
              ? "user"
              : "login"} */}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
