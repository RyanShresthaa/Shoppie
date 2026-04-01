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

  return (
    <div
      className={`min-w-[170px] w-[170px] shrink-0 border border-neutral-200 rounded-xl bg-white p-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${className}`}
    >
      <Link to={url} className="block">
        <div className="h-32 w-full rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
          {img ? (
            <img
              src={img}
              alt={data.name}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = IMG_NO_DATA;
              }}
            />
          ) : (
            <span className="text-neutral-400 text-xs">No image</span>
          )}
        </div>
        <p className="mt-2 text-xs line-clamp-2 text-neutral-900 min-h-[2.5rem]">{data.name}</p>
        <p className="text-xs text-neutral-500">{data.unit}</p>
        <p className="mt-1 font-semibold text-sm text-neutral-900">
          {DisplayPriceInRupees(unitPrice)}
        </p>
      </Link>
      <div className="mt-2" onClick={(e) => e.stopPropagation()}>
        <AddToCartButton data={data} />
      </div>
    </div>
  );
};

export default CardProduct;
