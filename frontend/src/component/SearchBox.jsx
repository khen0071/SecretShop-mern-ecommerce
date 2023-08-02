import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-center items-center space-x-1">
            <div className="flex flex-col py-1">
              <input
                className="p-[8px] border border-lightGray"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products.."
              />
            </div>

            <div className="flex justify-center items-center my-3">
              <button
                type="submit"
                className="buttonContainer text-[14px] md:text-[16px]"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
