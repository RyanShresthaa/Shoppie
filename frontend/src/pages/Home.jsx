import React, { useEffect, useState } from 'react'
import { IMG_BANNER_DESKTOP, IMG_BANNER_MOBILE } from '../constants/imagePlaceholders'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import CardLoading from '../components/CardLoading'
import { IMG_NO_DATA } from '../constants/imagePlaceholders'

const Home = () => {
  const [loadingCategory, setLoadingCategory] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [categoryData, setCategoryData] = useState([])
  const [subCategoryData, setSubCategoryData] = useState([])
  const [trendingProducts, setTrendingProducts] = useState([])
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      const subcategory = subCategoryData.find(sub =>{
        const filterData = (sub?.category || []).some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      if(!subcategory?._id){
        navigate("/search")
        return
      }
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
  }

  const fetchHomeData = async () => {
    try {
      setLoadingCategory(true)
      setLoadingProducts(true)
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
      ])

      setCategoryData(categoryRes?.data?.data || [])
      setSubCategoryData(subCategoryRes?.data?.data || [])
      setTrendingProducts(productRes?.data?.data || [])
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoadingCategory(false)
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchHomeData()
  }, [])


  return (
   <section className='bg-transparent py-4'>
      <div className='container mx-auto px-4'>
          <div className='w-full h-full min-h-48 rounded-2xl overflow-hidden app-surface'>
              <img
                src={IMG_BANNER_DESKTOP}
                className='w-full h-full hidden lg:block'
                alt='banner' 
              />
              <img
                src={IMG_BANNER_MOBILE}
                className='w-full h-full lg:hidden'
                alt='banner' 
              />
          </div>
      </div>
      
      <div className='container mx-auto px-4 my-5 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3'>
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='app-surface p-3 min-h-32 grid gap-2 animate-pulse'>
                    <div className='bg-neutral-200 min-h-20 rounded-md'></div>
                    <div className='bg-neutral-200 h-5 rounded-md'></div>
                  </div>
                )
              })
            ) : (
              categoryData.map((cat,index)=>{
                return(
                  <div key={cat._id+"displayCategory"} className='w-full h-full cursor-pointer' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                    <div className='app-surface p-2 hover:-translate-y-0.5 transition-transform'>
                        <img 
                          src={cat.image}
                          className='w-full h-20 object-contain'
                          onError={(e) => {
                            e.currentTarget.src = IMG_NO_DATA
                          }}
                        />
                    </div>
                  </div>
                )
              })
              
            )
          }
      </div>

      <div className='container mx-auto px-4 py-2'>
        <div className='flex items-center justify-between'>
          <h2 className='app-heading text-lg md:text-xl'>Trending Products</h2>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4'>
          {loadingProducts &&
            new Array(12).fill(null).map((_, index) => (
              <CardLoading key={`home-trending-loading-${index}`} className="w-full min-w-0 h-56" />
            ))}
          {!loadingProducts &&
            trendingProducts.map((product) => (
              <CardProduct key={`home-trending-${product?._id}`} data={product} className="w-full min-w-0" />
            ))}
        </div>
      </div>

      {/***display category product */}
      {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
              subCategoryData={subCategoryData}
            />
          )
        })
      }



   </section>
  )
}

export default Home