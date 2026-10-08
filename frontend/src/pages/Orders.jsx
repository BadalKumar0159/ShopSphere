import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
   const { backendUrl, token, currency } = useContext(ShopContext);
   const [orderData, setOrderData] = useState([]);

   const loadOrderData = async () => {
      try {
         if (!token)
            return null;

         const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
         if (response.data.success) {
            let allOrdersItem = [];

            response.data.orders.map((order) => {
               order.items.map((item) => {            //item is individual order
                  item['status'] = order.status;      //these info are not present inside item so take from outside
                  item['payment'] = order.payment;
                  item['paymentMethod'] = order.paymentMethod;
                  item['date'] = order.date;

                  allOrdersItem.push(item);
               })
            })
            setOrderData(allOrdersItem);
         }
         else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

   useEffect(() => {
      loadOrderData();
   }, [token])

   return (
      <div className='pt-16'>

         <div className='text-2xl mb-7'>
            <Title text1={'MY'} text2={'ORDERS'} />
         </div>

         <div className='flex flex-col gap-4'>
            {
               orderData.map((item, index) => (
                  <div key={index} className='border border-slate-200 bg-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center 
                  md:justify-between gap-5 hover:border-violet-200 hover:shadow-sm transition-all'>

                     <div className='flex items-start gap-4 sm:gap-5 text-sm min-w-0'>

                        <div className='w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-slate-50 rounded-lg overflow-hidden border border-slate-100'>
                           <img className='w-full h-full object-cover' src={item.image[0]} alt="" />
                        </div>

                        <div className='min-w-0'>
                           <p className='text-sm sm:text-base font-semibold text-slate-900 truncate'>
                              {item.name}
                           </p>
                           <div className='flex items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-600'>
                              <p className='font-medium text-slate-900'>{currency}{item.price}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Size: {item.size}</p>
                           </div>
                           <div className='flex flex-col gap-1 mt-3 text-xs sm:text-sm'>
                              <p className='text-slate-500'>
                                 Order Date:
                                 <span className='text-slate-700 ml-1'>{new Date(item.date).toDateString()}</span>
                              </p>

                              <p className='text-slate-500'>
                                 Payment:
                                 <span className='text-slate-700 ml-1'>{item.paymentMethod}</span>
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className='flex items-center justify-between gap-6 md:min-w-[220px]'>
                        <div className='flex items-center gap-2'>
                           <span className='w-2.5 h-2.5 rounded-full bg-green-500'></span>
                           <p className='text-sm font-medium text-slate-700'>{item.status}</p>
                        </div>

                        <button className='border border-slate-200 hover:border-violet-400 hover:text-violet-600 px-4 py-2 text-sm 
                        font-medium rounded-lg transition-colors'>
                           Track Order
                        </button>
                     </div>

                  </div>
               ))
            }
         </div>

      </div>
   )
}

export default Orders
