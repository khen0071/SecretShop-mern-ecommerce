import { products } from "../products";

import Hero from "../component/Hero";
import Process from "../component/Process";
import Presentation from "../component/Presentation";

const Home = () => {
  return (
    <>
      <Hero />
      <Process />
      <div className="mainContainer">
        <Presentation />
      </div>
    </>
  );
};

export default Home;
