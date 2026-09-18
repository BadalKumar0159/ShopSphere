import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'

const Contact = () => {
   return (
      <div>
         <div className='text-2xl text-center pt-8'>
            <Title text1={'CONTACT'} text2={'US'} />
         </div>

         <div className='flex flex-col md:flex-row gap-10 md:gap-18 my-10 mb-20'>
            <div className='w-full md:w-1/2'>
               <img className='w-full rounded-xl' src={assets.contact_img} alt='Contact ShopSphere' />
            </div>

            <div className='w-full md:w-1/2 flex flex-col justify-center'>
               <p className='text-xl font-semibold text-slate-900 mb-1'>
                  Get in Touch
               </p>

               <p className='text-slate-500 max-w-md mb-4'>
                  Whether you have a question about an order, need help choosing a product, or simply want to get in touch, our team is ready to assist.
               </p>

               <div className='flex gap-4 mb-2'>
                  <MapPin className='w-5 h-5 text-slate-900 shrink-0 mt-1' />
                  <div>
                     <p className='font-semibold text-slate-900 mb-1'>Our Location</p>
                     <p className='text-sm text-slate-500'>
                        54709 Willms Station<br />
                        Suite 350, Washington, USA
                     </p>
                  </div>
               </div>

               <div className='flex gap-4 mb-2'>
                  <Phone className='w-5 h-5 text-slate-900 shrink-0 mt-1' />
                  <div>
                     <p className='font-semibold text-slate-900 mb-1'>Contact Details</p>
                     <p className='text-sm text-slate-500'>
                        (415) 555-0132<br />
                        admin@shopsphere.com
                     </p>
                  </div>
               </div>

               <div className='pt-2'>
                  <p className='text-xl font-semibold text-slate-900 mb-1'>
                     Careers
                  </p>

                  <p className='text-base text-slate-500 leading-6 max-w-md mb-4'>
                     Join our team and help us create a better online shopping experience.
                  </p>

                  <button className='flex items-center gap-2 bg-violet-600 text-white px-6 py-3 text-sm font-medium rounded-md hover:bg-violet-700 transition-all duration-300'>
                     Explore Careers
                     <ArrowRight className='w-4 h-4' />
                  </button>
               </div>
            </div>
         </div>

         <NewsLetterBox />
      </div>
   )
}

export default Contact