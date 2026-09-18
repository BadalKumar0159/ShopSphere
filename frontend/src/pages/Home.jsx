import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import discount_img from '../assets/discount_img.png'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <div>
        <img className='rounded-md' src={discount_img} alt="" />
      </div>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home
