import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const searchText = location.search?.slice(3) || "";

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };

  return (
    <div className="group flex h-11 w-full min-w-0 max-w-2xl items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition focus-within:border-brand-400/80 focus-within:ring-2 focus-within:ring-brand-500/20 lg:h-12">
      <div className="flex shrink-0">
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="m-1 flex h-[calc(100%-8px)] w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-focus-within:text-slate-900"
            aria-label="Back home"
          >
            <FaArrowLeft size={18} />
          </Link>
        ) : (
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-slate-500 transition group-focus-within:text-brand-600 lg:h-12 lg:w-12"
            aria-label="Search"
          >
            <IoSearch className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        )}
      </div>
      <div className="min-w-0 flex-1">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="flex h-full w-full min-w-0 cursor-pointer items-center pl-0 pr-3 text-sm text-slate-500"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && redirectToSearchPage()}
          >
            <TypeAnimation
              sequence={[
                'Try "milk"',
                1200,
                'Try "bread"',
                1200,
                'Try "rice"',
                1200,
                'Try "chocolate"',
                1200,
                'Try "chips"',
                1200,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
            />
          </div>
        ) : (
          <input
            type="search"
            placeholder="Search for products…"
            autoFocus
            defaultValue={searchText}
            className="h-11 w-full min-w-0 border-0 bg-transparent pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none lg:h-12"
            onChange={handleOnChange}
            autoComplete="off"
            aria-label="Search query"
          />
        )}
      </div>
    </div>
  );
};

export default Search;
