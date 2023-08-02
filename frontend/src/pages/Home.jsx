import Hero from "../component/Hero";
import Process from "../component/Process";
import Presentation from "../component/Presentation";
import Featured from "../component/Featured";

const Home = () => {
  return (
    <>
      <Hero />
      <Process />
      <div className="mainContainer">
        <Featured />
        <Presentation />
      </div>
    </>
  );
};

export default Home;
