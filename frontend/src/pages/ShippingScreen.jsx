import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../component/CheckoutSteps";
import RevealScale from "../component/shared/RevealScale";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <RevealScale>
        <div className="formContainer">
          <CheckoutSteps step1 step2 />
          <div className="bg-lightWhite p-10 w-[300px] md:w-[600px] rounded-lg border-2 border-lighterGray">
            <p className="text-center text-[18px] font-bold uppercase pb-3 border-b mb-3 md:text-[24px]">
              Shipping Details
            </p>
            <form onSubmit={submitHandler}>
              <div className="flex flex-col py-3">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Address
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="text"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex flex-col py-3">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  City
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="text"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="flex flex-col py-3">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Postal Code
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="text"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div className="flex flex-col py-3">
                <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                  Country
                </label>
                <input
                  className="p-2 border border-lightGray"
                  type="text"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div className="flex justify-center items-center">
                <button className="buttonContainer text-[12px] md:text-[16px] w-[150px] mt-3">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default ShippingScreen;
