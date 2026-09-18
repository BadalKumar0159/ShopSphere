import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { BadgeCheck, Headset, ShoppingBag } from 'lucide-react'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8'>
        <Title text1 = {'ABOUT'} text2 = {'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-7 md:gap-14">
        <img className='w-full md:max-w-[450px] rounded-lg' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>ShopSphere was created with a simple vision: to make online shopping more convenient, enjoyable, and accessible for everyone. We bring together a wide range of products in one place, making it easy for customers to discover new styles, find everyday essentials, and shop with confidence.</p>
          <p>We are committed to offering carefully selected products that combine quality, value, and style. From fashion and beauty to electronics and home essentials, our collection is designed to meet different needs while making every step of your shopping journey simple and enjoyable.</p>
          <p className="text-gray-800 font-semibold"> Our Mission </p>
          <p>Our mission at ShopSphere is to empower customers with choice, convenience, and confidence. We strive to create a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US ?'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 gap-5 text-slate-700 text-center'>
        <div className='group bg-white border border-slate-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4 rounded-lg  transition-all 
        duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60'>
          <BadgeCheck className='mx-auto h-10 w-10  group-hover:text-violet-500 group-hover:scale-110 transition-all duration-300'/>
          <p className='font-semibold text-base group-hover:text-violet-500'>Quality Assurance</p>
          <p className='text-slate-500'>We carefully select every product to ensure you receive quality you can trust.</p>
        </div>
          
        <div className='group bg-white border border-slate-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4 rounded-lg  transition-all 
        duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60'>
          <ShoppingBag className='mx-auto h-10 w-10  group-hover:text-violet-500 group-hover:scale-110 transition-all duration-300' />
          <p className='font-semibold text-base group-hover:text-violet-500'>Convenience</p>
          <p className='text-slate-500'>Enjoy a seamless shopping experience, from browsing your favorites to placing your order.</p>
        </div>
          
        <div className='group bg-white border border-slate-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-4 rounded-lg  transition-all 
        duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60' >
          <Headset className='mx-auto h-10 w-10 group-hover:text-violet-500 group-hover:scale-110 transition-all duration-300'/>
          <p className='font-semibold text-base group-hover:text-violet-500'> Customer Service</p>
          <p className='text-slate-500'>Our dedicated support team is always here to help whenever you need us.</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About
