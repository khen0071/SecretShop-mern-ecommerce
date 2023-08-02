import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Spinner from "../component/shared/Spinner";
import RevealScale from "../component/shared/RevealScale";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <RevealScale>
        <div className="profileContainer">
          <div className="w-full lg:w-1/3">
            <div className="profileContent">
              <form onSubmit={submitHandler}>
                <div className="flex flex-col py-3">
                  <p className="text-center text-[18px] font-bold uppercase pb-3 border-b mb-3 md:text-[24px]">
                    Profile
                  </p>
                  <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                    Name
                  </label>
                  <input
                    className="p-2 border border-lightGray capitalize"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col py-3">
                  <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                    Email
                  </label>
                  <input
                    className="p-2 border border-lightGray"
                    type="text"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col py-3">
                  <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                    Password
                  </label>
                  <input
                    className="p-2 border border-lightGray"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col py-3">
                  <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                    Confirm Password
                  </label>
                  <input
                    className="p-2 border border-lightGray"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-center items-center my-3">
                  <button
                    type="submit"
                    className="buttonContainer text-[14px] md:text-[16px] w-[150px]"
                  >
                    Update
                  </button>
                </div>

                {loadingUpdateProfile && <Spinner />}
              </form>
            </div>
          </div>

          <div className="w-full lg:w-full">
            <div className="profileContent">
              <p className="text-center text-[18px] font-bold uppercase  md:text-[24px]">
                Orders
              </p>
              {isLoading ? (
                <Spinner />
              ) : error ? (
                <div className="text-red font-semibold text-center">
                  {error?.data?.message || error.error}
                </div>
              ) : (
                <table className="table-auto w-full text-center">
                  <thead className="border-b">
                    <tr className="text-[8px] md:text-[16px]">
                      <th className="py-3 md:py-6">ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="text-[8px] md:text-[14px] font-semibold">
                    {orders.map((order) => (
                      <tr key={order._id} className="">
                        <td className="py-4 text-blue">{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td className="text-emeraldGreen">
                          $
                          {order.totalPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                        {order.isPaid ? (
                          <td>{order.paidAt.substring(0, 10)}</td>
                        ) : (
                          <td>
                            <i className="fa-solid fa-circle-xmark text-red font-semibold text-[8px] md:text-[16px]"></i>
                          </td>
                        )}

                        {order.isDelivered ? (
                          <td>{order.deliveredAt.substring(0, 10)}</td>
                        ) : (
                          <td>
                            <i className="fa-solid fa-circle-xmark text-red font-semibold text-[8px] md:text-[16px]"></i>
                          </td>
                        )}

                        <td className="px-[5px]">
                          <Link to={`/order/${order._id}`}>
                            <button className="orderScreenDeliverButton uppercase">
                              Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default ProfileScreen;
