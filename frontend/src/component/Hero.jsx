import Reveal from "./shared/Reveal";

import { motion } from "framer-motion";

const buttonVariant = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1.5,
    },
  },
};

const Hero = () => {
  return (
    <>
      <div className="heroImgContainer">
        <div className="heroContent">
          <div className="sectionLeft">
            <Reveal>
              <h1 className="heroH1 text-center md:text-start">
                Shop the Latest Trends, Unbeatable Deals, and More
              </h1>
            </Reveal>
            <Reveal>
              <p className="heroP">
                - We bring you a world of convenience and excitement with our
                wide selection of products, competitive prices, and exceptional
                service.
              </p>
            </Reveal>

            <motion.div
              variants={buttonVariant}
              initial="initial"
              animate="animate"
              className="button"
            >
              Shop Now!
            </motion.div>
          </div>
          <div className="imageContainer">
            <Reveal>
              <div className="heroImage">
                <img
                  src="/images/iphone14.png"
                  alt="hero"
                  className="object-contain"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
