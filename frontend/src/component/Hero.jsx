import Reveal from "./shared/Reveal";

const Hero = () => {
  return (
    <>
      <div className="heroImgContainer">
        <div className="heroContent">
          <div className="sectionLeft">
            <Reveal>
              <h1 className="heroH1">Shop the Latest Trends</h1>
            </Reveal>

            {/* <Reveal>
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
            </motion.div> */}
          </div>
          {/* <div className="imageContainer">
            <Reveal>
              <div className="heroImage">
                <img
                  src="/images/iphone14.png"
                  alt="hero"
                  className="object-contain"
                />
              </div>
            </Reveal>
          </div> */}

          <div className="sectionMid">
            <div className="">
              <Reveal>
                <div className="heroImageContainer">
                  <img
                    src="/images/iphone14.png"
                    alt="hero"
                    className="object-contain"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="sectionRight">
            <Reveal>
              <h1 className="heroH1">Unbeatable Deals, and More</h1>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
