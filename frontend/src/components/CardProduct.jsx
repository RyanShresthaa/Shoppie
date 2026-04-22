import React from "react";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/valideURLConvert";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";
import { IMG_NO_DATA } from "../constants/imagePlaceholders";

const CardProduct = ({ data, className = "" }) => {
  if (!data?._id) return null;
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const img = Array.isArray(data.image) ? data.image[0] : data.image;
  const unitPrice = pricewithDiscount(data.price, data.discount);
  const hasDiscount = Number(data.discount) > 0;

  return (
    <div
      className={`group w-full min-w-[158px] max-w-[220px] shrink-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft ${className}`}
    >
      <Link to={url} className="block p-2.5">
        <div className="relative h-32 w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/80">
          {hasDiscount && (
            <span className="absolute left-2 top-2 z-10 rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-900 shadow-sm">
              {data.discount}% off
            </span>
          )}
          {img ? (
            <img
              src={img}
              alt={data.name}
              className="h-full w-full object-contain p-1 transition duration-300 group-hover:scale-[1.04]"
              onError={(e) => {
                e.currentTarget.src = IMG_NO_DATA;
              }}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">No image</span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs font-medium leading-snug text-slate-900">{data.name}</p>
        {data.unit ? <p className="mt-0.5 text-[11px] text-slate-500">{data.unit}</p> : null}
        <div className="mt-1.5 flex items-baseline gap-2">
          <p className="text-sm font-bold text-slate-900">{DisplayPriceInRupees(unitPrice)}</p>
          {hasDiscount && data.price != null && (
            <p className="text-[11px] text-slate-400 line-through">{DisplayPriceInRupees(data.price)}</p>
          )}
        </div>
      </Link>
      <div className="border-t border-slate-100 px-2.5 pb-2.5 pt-2" onClick={(e) => e.stopPropagation()}>
        <AddToCartButton data={data} />
      </div>
    </div>
  );
};

export default CardProduct;
