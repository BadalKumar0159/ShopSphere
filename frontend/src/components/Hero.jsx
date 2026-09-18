import React, { useEffect, useState } from 'react'
import hero1 from '../assets/hero1.png'
import hero2 from '../assets/hero2.png'
import hero3 from '../assets/hero3.png'
import hero4 from '../assets/hero4.png'
import heroMobile1 from '../assets/hero1.png'
import heroMobile2 from '../assets/hero2.png'
import heroMobile3 from '../assets/hero3.png'
import heroMobile4 from '../assets/hero4.png'

const Hero = () => {
   const [currentIndex, setCurrentIndex] = useState(0)

   const heroes = [
      { desktop: hero1, mobile: heroMobile1 },
      { desktop: hero2, mobile: heroMobile2 },
      { desktop: hero3, mobile: heroMobile3 },
      { desktop: hero4, mobile: heroMobile4 }
   ]

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes.length)
      }, 5000)

      return () => clearInterval(interval)
   }, [])

   return (
      <div className='relative rounded-md overflow-hidden bg-white mt-10'>
         <div
            className='flex transition-transform duration-700 ease-in-out'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
         >
            {heroes.map((hero, index) => (
               <div key={index} className='min-w-full'>
                  <img className='hidden sm:block w-full h-full object-cover' src={hero.desktop} alt="" />
                  <img className='sm:hidden w-full object-cover' src={hero.mobile} alt="" />
               </div>
            ))}
         </div>

         <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'>
            {heroes.map((_, index) => (
               <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all duration-300 
               ${ currentIndex === index ? 'w-6 bg-slate-600' : 'w-2 bg-slate-400 hover:bg-violet-400' }`} ></button>
            ))}
         </div>
      </div>
   )
}

export default Hero