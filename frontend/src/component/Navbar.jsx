import { useState } from "react";
import { motion } from "framer-motion";

const navVariant = {
  initial: {
    y: -100,
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
  const [isOpen, setIsOpen] = useState(false);
  const menuHandler = () => {
    setIsOpen((prevState) => !prevState);
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
          <div className="logo gradientOverlay">SecretShop</div>

          <div className="navRight">
            <p className="rightLink">Cart</p>
            <p className="buttonNav">Sign In</p>
          </div>

          <div className="menuIcon">
            <i className="fa-solid fa-bars burger" onClick={menuHandler}></i>
          </div>
        </motion.div>
        {isOpen ? (
          <>
            <div className="text-white mx-5 my-2 pt-5 flex justify-between items-center border-white border-t">
              <p>Cart</p>
              <p className="buttonNav">Sign In</p>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
