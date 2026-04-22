import React, { useEffect, useState } from "react";
import { IMG_BANNER_DESKTOP, IMG_BANNER_MOBILE } from "../constants/imagePlaceholders";
import { valideURLConvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import CardLoading from "../components/CardLoading";
import { IMG_NO_DATA } from "../constants/imagePlaceholders";

const Home = () => {
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = (sub?.category || []).some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    if (!subcategory?._id) {
      navigate("/search");
      return;
    }
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;

    navigate(url);
  };

  const fetchHomeData = async () => {
    try {
      setLoadingCategory(true);
      setLoadingProducts(true);
      const [categoryRes, subCategoryRes, productRes] = await Promise.all([
        Axios({ ...SummaryApi.getCategory }),
        Axios({ ...SummaryApi.getSubCategory }),
        Axios({
          ...SummaryApi.getProduct,
          data: {
            page: 1,
            limit: 30,
            published: true,
          },
        }),
      ]);

      setCategoryData(categoryRes?.data?.data || []);
      setSubCategoryData(subCategoryRes?.data?.data || []);
      setTrendingProducts(productRes?.data?.data || []);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingCategory(false);
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <section className="pb-10">
      <div className="container mx-auto max-w-7xl px-4 pt-4">
        <div className="relative min-h-[12rem] overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-200 shadow-soft sm:min-h-[14rem] lg:min-h-[16rem]">
          <img
            src={IMG_BANNER_DESKTOP}
            className="hidden h-full w-full object-cover lg:block"
            alt=""
            loading="eager"
          />
          <img
            src={IMG_BANNER_MOBILE}
            className="h-full w-full object-cover lg:hidden"
            alt=""
            loading="eager"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent sm:bg-gradient-to-r sm:from-slate-900/80 sm:via-slate-900/25 sm:to-transparent"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 sm:p-7 lg:max-w-xl lg:justify-end lg:pb-10">
            <p className="font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">Everything you need, one cart away</p>
            <p className="mt-1.5 max-w-sm text-sm text-slate-100/95">Browse categories and stock up without the rush.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="mt-8 flex items-end justify-between gap-4">
          <h2 className="app-section-title">Shop by category</h2>
        </div>
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-3">
          {loadingCategory
            ? new Array(12).fill(null).map((_, index) => (
                <div
                  key={`skeleton-cat-${index}`}
                  className="app-surface flex min-h-[6.5rem] flex-col gap-2 rounded-2xl p-2.5 shadow-none animate-pulse"
                >
                  <div className="min-h-[4.5rem] flex-1 rounded-xl bg-slate-200" />
                  <div className="h-3 rounded bg-slate-200" />
                </div>
              ))
            : categoryData.map((cat) => (
                <button
                  type="button"
                  key={String(cat._id) + "displayCategory"}
                  className="w-full min-w-0 text-left"
                  onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                >
                  <div className="app-surface group flex h-full min-h-[6.5rem] flex-col items-center justify-center gap-1.5 rounded-2xl p-2 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft">
                    <div className="flex h-16 w-full items-center justify-center sm:h-20">
                      <img
                        src={cat.image}
                        className="max-h-full max-w-full object-contain"
                        alt=""
                        onError={(e) => {
                          e.currentTarget.src = IMG_NO_DATA;
                        }}
                      />
                    </div>
                    <p className="w-full line-clamp-2 text-center text-[11px] font-medium leading-tight text-slate-800 sm:text-xs">
                      {cat.name}
                    </p>
                  </div>
                </button>
              ))}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-10">
        <h2 className="app-section-title">Trending now</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-4">
          {loadingProducts &&
            new Array(12).fill(null).map((_, index) => <CardLoading key={`home-trending-loading-${index}`} className="h-56 w-full" />)}
          {!loadingProducts &&
            trendingProducts.map((product) => (
              <CardProduct key={`home-trending-${product?._id}`} data={product} className="!max-w-none w-full min-w-0" />
            ))}
        </div>
      </div>

      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay key={String(c?._id) + "CategorywiseProduct"} id={c?._id} name={c?.name} subCategoryData={subCategoryData} />
      ))}
    </section>
  );
};

export default Home;
