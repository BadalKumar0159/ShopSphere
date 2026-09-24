import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CreditCard, MapPinned, Wallet, WalletCards } from 'lucide-react'

const PlaceOrder = () => {
   const { backendUrl, navigate, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
   const [method, setMethod] = useState('cod');
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: ''
   })

   const onChangeHandler = (event) => {
      const key = event.target.name;
      const value = event.target.value;
      setFormData(prev => ({ ...prev, [key]: value }));
   }

   const initPay = (order) => {
      const options = {
         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
         amount: order.amount,
         currency: order.currency,
         name: 'Order Payment',
         description: 'Order Payment',
         order_id: order.id,
         receipt: order.receipt,
         handler: async (response) => {
            console.log(response)
            try {
               const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
               console.log(data);
               if (data.success) {
                  navigate('/orders');
                  setCartItems({});
                  toast.success(data.message);
               }
            } catch (error) {
               console.log(error);
               toast.error(error.message);
            }

         }
      }
      const rzp = new window.Razorpay(options);
      rzp.open()
   }

   const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
         let orderItems = [];
         for (const productId in cartItems) {
            for (const sizes in cartItems[productId]) {
               if (cartItems[productId][sizes] > 0) {
                  const itemInfo = structuredClone(products.find(product => product._id == productId));
                  itemInfo.size = sizes;
                  itemInfo.quantity = cartItems[productId][sizes];

                  orderItems.push(itemInfo);
               }
            }
         }

         let orderData = {
            address: formData,
            items: orderItems,
            amount: getCartAmount() + delivery_fee
         }

         switch (method) {

            case 'cod':
               const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
               console.log(response.data.success)
               if (response.data.success) {
                  setCartItems({});
                  navigate('/orders');
                  toast.success(response.data.message);
               }
               else {
                  toast.error(response.data.message);
               }
               break;

            case 'stripe':
               const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
               console.log(responseStripe.data.success)
               if (responseStripe.data.success) {
                  const { session_url } = responseStripe.data;
                  window.location.replace(session_url);
               }
               else {
                  toast.error(responseStripe.data.message);
               }
               break;

            case 'razorpay':
               const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
               if (responseRazorpay.data.success) {
                  initPay(responseRazorpay.data.order);
               }
               break;
            default:
               break;
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }

   }

   return (
      <form onSubmit={onSubmitHandler} className='pt-8 sm:pt-14 pb-16'>
         <div className='mb-10 text-center text-2xl'>
            <Title text1={'PLACE'} text2={'ORDER'} />
         </div>

         <div className='flex flex-col md:flex-row justify-between gap-8'>

            {/* ------------------------ Left Side ---------------------------- */}
            <div className='flex flex-col gap-4 w-full md:w-1/2 bg-white border border-slate-300 rounded-lg p-5 sm:p-7'>
               <div className='flex flex-row mb-3 gap-2 text-lg'>
                  <MapPinned size={23} className='text-violet-500' />
                  <Title text1={'Delivery'} text2={'Information'} />
               </div>

               <div className='flex gap-3'>
                  <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                     type="text" placeholder='First Name' onChange={onChangeHandler} name='firstName' value={formData.firstName} required />
                  <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                     type="text" placeholder='Last Name' onChange={onChangeHandler} name='lastName' value={formData.lastName} required />
               </div>

               <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                  type="email" placeholder='Email address' onChange={onChangeHandler} name='email' value={formData.email} required />
               <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                  type="text" placeholder='Street address' onChange={onChangeHandler} name='street' value={formData.street} required />

               <div className='flex gap-3'>
                  <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                     type="text" placeholder='City' onChange={onChangeHandler} name='city' value={formData.city} required />
                  <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                     type="text" placeholder='State' onChange={onChangeHandler} name='state' value={formData.state} required />
               </div>

               <div className='flex gap-3'>
                  <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                     type="number" placeholder='Zipcode' onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required />
                  <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                     type="text" placeholder='Country' onChange={onChangeHandler} name='country' value={formData.country} required />
               </div>

               <input className='border border-slate-200 rounded-lg py-2.5 px-3.5 w-full outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition'
                  type="number" placeholder='Phone number' onChange={onChangeHandler} name='phone' value={formData.phone} required />
            </div>

            {/* ------------------------ Right Side ---------------------------- */}
            <div className='w-full md:w-1/2'>
               <div className='bg-white border border-slate-300 rounded-lg p-5 sm:p-6'>
                  <CartTotal />
               </div>

               <div className='mt-7 bg-white border border-slate-300 rounded-lg p-5 sm:p-6'>
                  <div className='flex flex-row gap-3 mb-5'>
                     <CreditCard size={20} className='text-violet-500' />
                     <Title text1={'Payment'} text2={'Method'} />
                  </div>

                  {/* ----------------Payment Method Section--------------------- */}
                  <div className='flex gap-3 flex-col '>
                     <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border rounded-xl p-3 px-4 cursor-pointer transition-all 
                     ${method === 'stripe' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-200'}`}>
                        <p className={`min-w-4 h-4 border rounded-full flex items-center justify-center ${method === 'stripe' ? 'border-violet-600' : 'border-slate-300'}`}>
                           {method === 'stripe' && <span className='w-2 h-2 rounded-full bg-violet-600'></span>}
                        </p>
                        <img className='h-5 mx-3' src={assets.stripe_logo} alt="" />
                        <span className='ml-auto text-xs text-slate-500'>Online Payment</span>
                     </div>

                     <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border rounded-xl p-3 px-4 cursor-pointer transition-all 
                     ${method === 'razorpay' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-200'}`}>
                        <p className={`min-w-4 h-4 border rounded-full flex items-center justify-center ${method === 'razorpay' ? 'border-violet-600' : 'border-slate-300'}`}>
                           {method === 'razorpay' && <span className='w-2 h-2 rounded-full bg-violet-600'></span>}
                        </p>
                        <img className='h-5 mx-3' src={assets.razorpay_logo} alt="" />
                        <span className='ml-auto text-xs text-slate-500'>Online Payment</span>
                     </div>

                     <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border rounded-xl p-3 px-4 cursor-pointer transition-all 
                     ${method === 'cod' ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-200'}`}>
                        <p className={`min-w-4 h-4 border rounded-full flex items-center justify-center ${method === 'cod' ? 'border-violet-600' : 'border-slate-300'}`}>
                           {method === 'cod' && <span className='w-2 h-2 rounded-full bg-violet-600'></span>}
                        </p>
                        <p className='text-sm text-slate-700 font-medium'>Cash on Delivery</p>
                     </div>
                  </div>

                  <div className='w-full text-right mt-6'>
                     <button type='submit' className='w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-3 rounded-xl transition-colors'>PLACE ORDER</button>
                  </div>
               </div>
            </div>

         </div>
      </form>
   )
}

export default PlaceOrder