import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {backendUrl, navigate, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
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
    setFormData(prev => ({...prev, [key]: value}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      let orderItems = [];               //to store info about ordered products
      for(const productId in cartItems){
        for(const sizes in cartItems[productId]){
          if(cartItems[productId][sizes]>0){
            const itemInfo = structuredClone(products.find(product => product._id == productId));
            itemInfo.size = sizes;
            itemInfo.quantity = cartItems[productId][sizes];

            orderItems.push(itemInfo);   //adding two more key value pairs to product data
          }
        }
      }
      
      let orderData = {                   //these three data will send to frontend
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method){
        
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData , {headers:{token}});
          console.log(response.data.success)
          if(response.data.success){
            setCartItems({});
            navigate('/orders');
            toast.success(response.data.message);
          }
          else{
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData , {headers:{token}});
          console.log(responseStripe.data.success)
          if(responseStripe.data.success){
           const {session_url} = responseStripe.data;
           window.location.replace(session_url);
          }
          else{
            toast.error(responseStripe.data.message);
          }
          break;


          default:
            break;
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
    
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------------------ Left Side ---------------------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[500px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name'
            onChange={onChangeHandler} name='firstName' value={formData.firstName} required />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name'
            onChange={onChangeHandler} name='lastName' value={formData.lastName} required />
        </div>

        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' 
          onChange={onChangeHandler} name='email' value={formData.email} required />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' 
          onChange={onChangeHandler} name='street' value={formData.street} required />

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'
            onChange={onChangeHandler} name='city' value={formData.city} required />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'
            onChange={onChangeHandler} name='state' value={formData.state} required />
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'
            onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'
            onChange={onChangeHandler} name='country' value={formData.country} required />
        </div>

        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' 
          onChange={onChangeHandler} name='phone' value={formData.phone} required />
      </div>

      {/* ------------------------ Right Side ---------------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          {/* ----------------Payment Method Section--------------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-green-400': ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay'? 'bg-green-400': ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-green-400': ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVER</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
