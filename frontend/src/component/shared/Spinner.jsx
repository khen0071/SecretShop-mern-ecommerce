import { Rings } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Rings
        height="120"
        width="120"
        color="#50C878"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />

      <h2 className="text-black text-[18px] font-bold">Loading</h2>
      <p className="text-black text-[14px]">Please Wait</p>
    </div>
  );
};

export default Spinner;
