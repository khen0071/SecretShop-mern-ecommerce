import Lottie from "lottie-react";
import animationData from "../assets/shopping.json";
import Reveal from "./shared/Reveal";

const Presentation = () => {
  return (
    <>
      <div className="presentationContainer">
        <div className="presentationContent">
          <Reveal>
            <h1 className="presentationH1">
              Experience the joy of online shopping at{" "}
              <strong className="presentationStrong">Secret Shop</strong>
            </h1>
          </Reveal>
          <Reveal>
            <p className="presentationP">
              Browse our diverse product range, explore exciting deals and
              discounts, and enjoy a hassle-free shopping experience from the
              comfort of your home. With just a few clicks, your favorite items
              will be on their way to your doorstep. Thank you for choosing us
              as your preferred online shopping destination. Happy shopping!
            </p>
          </Reveal>
        </div>
        <div className="w-full">
          <div className="w-2/3 m-auto">
            <Reveal>
              <Lottie animationData={animationData} />
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Presentation;
