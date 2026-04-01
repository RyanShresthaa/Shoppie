import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  return (
    <div className='p-3'>
      <div className='app-surface p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='app-surface p-4 text-sm mt-3'>
                  <p className='font-medium'>Order No : {order?.orderId}</p>
                  <div className='flex gap-3 mt-2 items-center'>
                    <img
                      src={order.product_details.image[0]} 
                      className='w-14 h-14 rounded-md object-cover'
                    />  
                    <p className='font-medium'>{order.product_details.name}</p>
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default MyOrders