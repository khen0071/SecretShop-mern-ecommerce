/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const textVariants = {
  initial: {
    y: "75vh",
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

const slideVariants = {
  initial: {
    bottom: 0,
  },
  animate: {
    bottom: "100%",
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

const Reveal = ({ children, width = "fit-content" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  /*Green Slide*/
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");

      /*Green Slide*/
      slideControls.start("animate");
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden",
      }}
    >
      <motion.div
        variants={textVariants}
        initial="initial"
        animate={mainControls}
      >
        {children}
      </motion.div>
      <motion.div
        variants={slideVariants}
        initial="initial"
        animate={slideControls}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "#333",
          zIndex: 20,
        }}
      ></motion.div>
    </div>
  );
};

export default Reveal;
