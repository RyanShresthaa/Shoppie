import React from "react";

const CardLoading = ({ className = "" }) => (
  <div
    className={`h-52 min-w-0 w-full max-w-full shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/90 shadow-card animate-pulse ${className}`}
    aria-hidden
  >
    <div className="h-[8.5rem] bg-slate-200" />
    <div className="p-2.5 pt-2">
      <div className="h-3 w-full max-w-[85%] rounded bg-slate-200" />
      <div className="mt-1.5 h-3 w-1/2 rounded bg-slate-200" />
    </div>
  </div>
);

export default CardLoading;
