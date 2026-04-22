import React from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/90 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold tracking-tight text-slate-900">Shoppie</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Fresh groceries and daily essentials, delivered with care. Thanks for shopping with us.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Shop</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/search" className="text-slate-700 transition hover:text-brand-600">
                    Search
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-slate-700 transition hover:text-brand-600">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Account</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/login" className="text-slate-700 transition hover:text-brand-600">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-slate-700 transition hover:text-brand-600">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Connect</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xl text-slate-500">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-lg p-2 transition hover:bg-slate-100 hover:text-pink-600" aria-label="Instagram">
                  <IoLogoInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-lg p-2 transition hover:bg-slate-100 hover:text-blue-600" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-lg p-2 transition hover:bg-slate-100 hover:text-sky-700" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="mailto:support@example.com" className="rounded-lg p-2 transition hover:bg-slate-100 hover:text-red-500" aria-label="Email">
                  <SiGmail />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Shoppie. All rights reserved.</p>
          <p className="text-slate-400">Made for everyday shopping.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
