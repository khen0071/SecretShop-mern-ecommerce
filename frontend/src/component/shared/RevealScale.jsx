/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const cardVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const RevealCard = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealCard;
