import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { valideURLConvert } from "../utils/valideURLConvert";

const CategoryWiseProductDisplay = ({ id, name, subCategoryData = [] }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, [id]);

  const handleScrollRight = () => {
    if (containerRef.current) containerRef.current.scrollLeft += 240;
  };

  const handleScrollLeft = () => {
    if (containerRef.current) containerRef.current.scrollLeft -= 240;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`;

    return url;
  };

  const redirectURL = handleRedirectProductListpage();

  return (
    <section className="pt-2">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/90 pb-3">
          <h3 className="app-heading text-lg sm:text-xl">{name}</h3>
          <Link
            to={redirectURL || "/search"}
            className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
          >
            See all
            <FaAngleRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <div className="relative">
        <div
          className="scrollbar-none flex min-h-[18rem] gap-3 overflow-x-auto scroll-smooth py-3 pl-4 pr-4 md:gap-4 [scrollbar-width:none]"
          ref={containerRef}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {loading &&
            loadingCardNumber.map((_, index) => (
              <CardLoading key={"cw-load-" + index} />
            ))}

          {data.map((p) => (
            <CardProduct data={p} key={p._id} />
          ))}
        </div>
        <div className="pointer-events-none absolute left-0 right-0 top-0 hidden h-full max-w-7xl mx-auto items-center justify-between px-2 lg:flex">
          <button
            type="button"
            onClick={handleScrollLeft}
            className="pointer-events-auto relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
            aria-label="Scroll left"
          >
            <FaAngleLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleScrollRight}
            className="pointer-events-auto relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
            aria-label="Scroll right"
          >
            <FaAngleRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryWiseProductDisplay;
