import { Link } from "react-router-dom";
import Spinner from "../../component/shared/Spinner";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import RevealScale from "../../component/shared/RevealScale";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User Deleted");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <RevealScale>
        <div className="userListScreenContainer">
          <div>
            <p className="text-center text-[18px] font-bold uppercase md:text-[24px] pb-5">
              User List
            </p>

            {loadingDelete && <Spinner />}

            {isLoading ? (
              <Spinner />
            ) : error ? (
              <p className="text-center text-red font-semibold">{error}</p>
            ) : (
              <table className="table-auto w-full border text-center bg-lightWhite">
                <thead className="border-b">
                  <tr className="text-[8px] md:text-[16px]">
                    {/* <th className="py-3 md:py-6">ID</th> */}
                    <th className="py-3 md:py-6">NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-[8px] md:text-[14px] font-semibold">
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      {/* <td className="py-4 text-blue">{user._id}</td> */}
                      <td className="py-4 px-[5px] capitalize">{user.name}</td>
                      <td className="text-blue">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      {user.isAdmin ? (
                        <td>
                          <i className="fa-solid fa-circle-check text-emeraldGreen font-semibold text-[8px] md:text-[16px]"></i>
                        </td>
                      ) : (
                        <td>
                          <i className="fa-solid fa-circle-xmark text-red font-semibold text-[8px] md:text-[16px]"></i>
                        </td>
                      )}

                      <td className="px-[5px]">
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className="userListScreenButton bg-green text-white">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </Link>
                      </td>

                      <td
                        className="px-[5px]"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <button className="userListScreenButton bg-red text-white">
                          <i className="fa-solid fa-trash "></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </RevealScale>
    </>
  );
};

export default UserListScreen;
