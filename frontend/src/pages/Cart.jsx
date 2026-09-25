import React, { useContext, useEffect, useState, useNavigate } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Trash2 } from 'lucide-react'

const Cart = () => {
   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
   const [cartData, setCartData] = useState([]);


   useEffect(() => {
      const tempData = [];
      for (const items in cartItems) {
         for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0)    //item get removed if quantity becomes < 0
            {
               tempData.push({ _id: items, size: item, quantity: cartItems[items][item] });
            }
         }
      }
      setCartData(tempData);
   }, [cartItems])

   return (
      <div className=' pt-16'>
         <div className='text-2xl mb-4 text-left '>
            <Title text1={'YOUR'} text2={'CART'} />
         </div>

         <div className='flex flex-col gap-4'>
            {
               cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  if (!productData) return null;      // Product data may not be loaded yet, so skip rendering this item

                  return (
                     <div key={index} className='grid grid-cols-[1fr_auto_auto] sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4 sm:gap-6 p-2 bg-white border border-slate-200 rounded-xl'>
                        <div className='flex items-center gap-4 sm:gap-5 min-w-0'>
                           <div className='w-16 h-20 sm:w-20 sm:h-24 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0'>
                              <img className='w-full h-full object-cover' src={productData.image[0]} alt="" />
                           </div>

                           <div className='min-w-0'>
                              <p className='text-sm sm:text-base font-semibold text-slate-900 truncate'>
                                 {productData.name}
                              </p>

                              <div className='flex items-center gap-3 mt-2'>
                                 <p className='text-sm font-medium text-slate-700'>
                                    {currency} {productData.price}
                                 </p>

                                 <p className='px-2.5 py-1 text-xs font-medium text-violet-700 bg-violet-50 border border-violet-100 rounded-md'>
                                    {item.size}
                                 </p>
                              </div>
                           </div>
                        </div>

                        <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                        className='w-12 sm:w-16 h-9 text-center text-sm border border-slate-200 rounded-lg outline-none focus:border-violet-500 
                        focus:ring-1 focus:ring-violet-200' min={1} defaultValue={item.quantity} type="number" />

                        <button onClick={() => updateQuantity(item._id, item.size, 0)} 
                        className='w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-slate-800/60 hover:text-red-800'>
                           <Trash2  className='w-4 sm:w-5'/>
                        </button>
                     </div>
                  )
               })
            }
         </div>

         <div className='flex justify-end mt-20'>
            <div className='w-full sm:w-[450px] border border-slate-300 bg-white p-6 rounded-lg'>
               <CartTotal />
               <div className='w-full text-right pt-5'>
                  <button onClick={() => navigate('/place-order')} className='bg-violet-600 hover:bg-violet-700 text-white text-sm px-8 py-3 rounded-lg transition-all'>PROCEED TO CHECKOUT</button>
               </div>
            </div>
         </div>

      </div>
   )
}

export default Cart
