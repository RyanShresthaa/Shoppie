import React from "react";
import { IMG_LOGO } from "../constants/imagePlaceholders";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import { useRef, useState } from "react";
import UserMenu from "./UserMenu";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useEffect } from "react";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef(null);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser =()=>{
    if(!user._id){
      navigate("/login")
      return
    }
    navigate("/user")
  }

  const handleOpenCart = () => {
    navigate("/cart");
  };

  const fetchCartCount = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getCart });
      setCartCount((response?.data?.data || []).length);
    } catch (error) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    if (user?._id) fetchCartCount();
  }, [user?._id]);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenUserMenu(false);
      }
    };
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    setOpenUserMenu(false);
  }, [location.pathname]);

  return (
    <header className="h-16 sm:h-20 lg:h-20 sticky top-0 z-40 flex flex-col justify-center bg-white/95 backdrop-blur border-b border-neutral-200 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-3 sm:px-4 justify-between min-w-0 gap-4">
          {/* logo */}
          <div className="flex-shrink-0 min-w-0 flex items-center">
            <Link to={"/"} className="flex justify-center items-center">
              <img
                src={IMG_LOGO}
                width={150}
                height={60}
                alt="Shopie"
                className="hidden lg:block object-contain"
              />
              <img
                src={IMG_LOGO}
                width={100}
                height={40}
                alt="Shopie"
                className="lg:hidden max-h-10 w-auto object-contain"
              />
            </Link>
          </div>
          {/* search bar */}
          <div className="hidden lg:block flex-1 max-w-2xl">
            <Search />
          </div>

          {/* nav items / mobile */}
          <div>
            <button className="text-neutral-600 lg:hidden rounded-full p-2 hover:bg-neutral-100" onClick={handleMobileUser}>
              <FaUser size={24}/>
            </button>
          </div>
          {/* nav items / desktop*/}
          <div className="hidden lg:flex items-center gap-6">
            {user?._id ? (
              <div className="hidden lg:flex items-center gap-6" ref={menuRef}>
                <div
                  onClick={() => setOpenUserMenu((preve) => !preve)}
                  className="flex select-none items-center gap-1 cursor-pointer rounded-full border border-neutral-200 px-3 py-2 hover:bg-neutral-100"
                >
                  <p>Account</p>
                  {openUserMenu ? (
                    <VscTriangleUp size={20} />
                  ) : (
                    <VscTriangleDown size={20} />
                  )}
                </div>
                {openUserMenu && (
                  <div className="absolute right-24 top-20 ">
                    <div className="bg-white rounded-xl border border-neutral-200 p-4 min-w-52 shadow-xl">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={redirectToLoginPage} className="app-btn app-btn-outline">
                Login
              </button>
            )}
            <button
              onClick={handleOpenCart}
              className="app-btn app-btn-primary flex items-center gap-2 px-4 py-2.5"
            >
              <div>
                <TiShoppingCart size={28} />
              </div>
              <div className="font-semibold">
                <p>My Cart</p>
                <p className="text-xs text-right">{cartCount}</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
