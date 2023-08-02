import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import Spinner from "../../component/shared/Spinner";
import { toast } from "react-toastify";
import RevealScale from "../../component/shared/RevealScale";

const ProductEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated");
      refetch();
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <RevealScale>
        <Link to="/admin/userlist">
          <div className="flex justify-center items-center">
            <p className="buttonContainer text-[14px] md:text-[16px] m-3 w- text-center uppercase">
              Back To User List
            </p>
          </div>
        </Link>
        <div className="updateProductContainer">
          <div className="bg-lightWhite border-2 border-lighterGray p-10 rounded-lg;">
            <div>
              <p className="text-center text-[18px]  font-bold uppercase pb-3 border-b mb-3 md:text-[24px]">
                Edit Product
              </p>
              {loadingUpdate && <Spinner />}

              {isLoading ? (
                <Spinner />
              ) : error ? (
                <p className="text-red text-center">{error}</p>
              ) : (
                <div>
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-col space-x-0"
                  >
                    <div className="flex flex-col py-3 md:w-[300px]">
                      <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                        Name
                      </label>
                      <input
                        className="p-2 border border-lightGray"
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
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="flex space-x-3 items-center py-3 md:w-[300px]">
                      <label className="pb-1 font-semibold text-[14px] md:text-[16px]">
                        Make Admin?
                      </label>
                      <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        className="w-[20px] h-[20px]"
                      ></input>
                    </div>

                    <button
                      className="buttonContainer bg-black w-full"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default ProductEditScreen;
