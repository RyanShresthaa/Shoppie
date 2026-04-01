import React from "react";

const CardLoading = ({ className = "" }) => (
  <div
    className={`min-w-[160px] w-[160px] shrink-0 h-52 rounded-lg bg-neutral-200 animate-pulse ${className}`}
    aria-hidden
  />
);

export default CardLoading;
