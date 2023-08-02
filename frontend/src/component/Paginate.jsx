import { Link } from "react-router-dom";
import RevealScale from "./shared/RevealScale";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="flex justify-center items-center space-x-5">
        {[...Array(pages).keys()].map((x) => (
          <Link
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
            key={x + 1}
          >
            {x + 1 === page ? (
              <RevealScale>
                <div className="flex justify-center items-center text-white bg-black font-bold text-[14px] border w-[30px] h-[30px] ">
                  {x + 1}
                </div>
              </RevealScale>
            ) : (
              <RevealScale>
                <div className="flex justify-center items-center text-black bg-white font-bold text-[14px] border w-[30px] h-[30px] ">
                  {x + 1}
                </div>
              </RevealScale>
            )}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
