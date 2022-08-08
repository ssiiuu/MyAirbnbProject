import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useHistory } from "react-router-dom";
import UserNav from "./UserNav";
import ItemSearch from "../../Page/Search/ItemSearch";
import { useDispatch, useSelector } from "react-redux";
import { getLocationListAction } from "../../redux/Actions/locationAction";

export default function NavHeader() {
  const [searchInput, setSearchInput] = useState("");
  const [scrollNav, setScrollNav] = useState(false);
  let history = useHistory();

  const dispatch = useDispatch();

  const handleClickTrangChu = () => {
    history.push("/");
  };

  const { locationList } = useSelector((state) => state.locationReducer);

  const changeNav = () => {
    if (window.scrollY >= 50) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };
  // window.addEventListener("scroll", changeNav);
  useEffect(() => {
    dispatch(getLocationListAction());
  }, []);
  //   scrollNav || searchInput ?

  return (
    <header className="fixed w-full top-0 left-0 right-0 bg-white transition duration-500  z-50 grid grid-cols-3 shadow-md p-5 md:px-10">
      {/* left */}
      <div className="relative flex items-center w-32 cursor-pointer my-auto">
        <button
          className="outline-none border-none"
          onClick={handleClickTrangChu}
        >
          <img
            src="https://links.papareact.com/qd3"
            layout="fill"
            className="object-contain object-left"
          />
        </button>
      </div>

      {/* mid */}
      <div className="flex space-between items-center md:border-2 rounded-full py-2 md:shadow-sm relative z-0">
        <div className="w-full">
          <input
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            className="w-full flex-grow pl-5 bg-transparent outline-none placeholder-gray-400 text-gray-600"
            type="text"
            placeholder="Search destinations"
          />
        </div>
        <div>
          <button className="flex-grow focus:outline-none text-red-500">
            <i className="fa-solid fa-magnifying-glass md:inline-flex text-white bg-red-400 cursor-pointer rounded-full p-2 md:mx-2" />
          </button>
        </div>

        <div className="absolute z-0 top-12 bg-white rounded-xl right-0 w-full cursor-pointer">
          {searchInput != "" ? (
            locationList
              .filter((location) => {
                return (
                  location.province
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  location.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                );
              })
              .slice(0, 5)
              .map((location, key) => {
                return <ItemSearch key={key} location={location} />;
              })
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* right */}
      <div className=" flex items-center align-middle space-x-4 justify-end text-gray-500">
        <div className="hover:bg-gray-100 transition duration-150 rounded-full cursor-pointer">
          <button className="nav__header__become focus:outline-none hidden md:inline text-black p-2">
            Become a host
          </button>
        </div>
        <div className="hover:bg-gray-100 transition duration-150 rounded-full cursor-pointer">
          <button className="p-2 focus:outline-none">
            {" "}
            <i className="fa-solid bg-white rounded-full fa-globe w-4" />
          </button>
        </div>
        <UserNav />
      </div>
    </header>
  );
}
