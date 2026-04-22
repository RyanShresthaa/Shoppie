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

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex h-16 sm:h-[4.25rem] items-center justify-between gap-3 px-3 sm:px-4 min-w-0">
          <div className="flex min-w-0 flex-shrink-0 items-center">
            <Link to={"/"} className="flex items-center justify-center rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600">
              <img
                src={IMG_LOGO}
                width={150}
                height={60}
                alt="Shoppie"
                className="hidden h-12 w-auto object-contain lg:block"
              />
              <img
                src={IMG_LOGO}
                width={100}
                height={40}
                alt="Shoppie"
                className="h-9 w-auto max-w-[7rem] object-contain lg:hidden"
              />
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 max-w-2xl lg:block">
            <Search />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              aria-label="Account"
              onClick={handleMobileUser}
            >
              <FaUser size={22} />
            </button>

            <div className="hidden items-center gap-3 lg:flex">
              {user?._id ? (
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setOpenUserMenu((p) => !p)}
                    className="flex cursor-pointer select-none items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Account
                    {openUserMenu ? <VscTriangleUp size={18} /> : <VscTriangleDown size={18} />}
                  </button>
                  {openUserMenu && (
                    <div className="absolute right-0 top-full z-50 mt-2 min-w-[13rem]">
                      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-card">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button type="button" onClick={redirectToLoginPage} className="app-btn app-btn-outline px-5">
                  Log in
                </button>
              )}

              <button
                type="button"
                onClick={handleOpenCart}
                className="app-btn app-btn-primary group relative flex items-center gap-2.5 rounded-2xl pl-3 pr-4 py-2.5 shadow-md shadow-brand-600/20"
              >
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <TiShoppingCart className="h-7 w-7" />
                  {cartCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-slate-900 ring-2 ring-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-xs font-medium text-emerald-100/90">Cart</span>
                  <span className="text-sm font-bold">View bag</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
