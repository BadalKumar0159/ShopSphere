import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ChevronDown } from 'lucide-react'
import collection_img from '../assets/collection_img.png'

const Collection = () => {
   const { products } = useContext(ShopContext)
   const [showCategory, setShowCategory] = useState(false)
   const [showType, setShowType] = useState(false)
   const [showSort, setShowSort] = useState(false)
   const [filterProducts, setFilterProducts] = useState([])
   const [category, setCategory] = useState([])
   const [subCategory, setSubCategory] = useState([])
   const [sortType, setSortType] = useState('relevent')
   const [search, setSearch] = useState('')

   const toggleCategory = (e) => {
      if (category.includes(e.target.value)) {
         setCategory(prev => prev.filter(item => item != e.target.value))
      }
      else {
         setCategory(prev => [...prev, e.target.value])
      }
   }

   const toggleSubCategory = (e) => {
      if (subCategory.includes(e.target.value)) {
         setSubCategory(prev => prev.filter(item => item != e.target.value))
      }
      else {
         setSubCategory(prev => [...prev, e.target.value])
      }
   }

   const applyFilter = () => {
      let productsCopy = products.slice()

      if (search)
         productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

      if (category.length > 0)
         productsCopy = productsCopy.filter(item => category.includes(item.category))

      if (subCategory.length > 0)
         productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))

      setFilterProducts(productsCopy)
   }

   const sortProduct = () => {
      let fpCopy = filterProducts.slice()

      switch (sortType) {
         case 'low-high':
            setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
            break

         case 'high-low':
            setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
            break
      }
   }

   useEffect(() => {
      applyFilter()
      setSortType('relevent')
   }, [category, subCategory, search, products])

   useEffect(() => {
      sortProduct()
   }, [sortType])

   return (
      <div>
         <div className='text-2xl text-center pt-8'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
         </div>

         <img src={collection_img} className='rounded-md my-4' alt="" />
         <div className='flex items-center justify-center w-sm sm:w-lg border border-slate-200 bg-white rounded-full px-4 py-3 my-6 mx-auto
         focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100 transition-all duration-300'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className='w-full outline-none text-sm text-slate-900 
            placeholder:text-slate-400' type='text' placeholder='Search your favorite styles...' />
         </div>


         <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4'>
            <div className='flex gap-2 sm:gap-3'>
               <div className='relative w-1/2 sm:w-auto'>
                  <button onClick={() => { setShowCategory(!showCategory); setShowType(false); setShowSort(false) }} className='flex w-full sm:w-auto
                  gap-2 border border-slate-200 bg-white rounded-md px-3 sm:px-5 py-2.5 text-sm text-slate-700 hover:border-violet-400 transition-colors'>
                     CATEGORY
                     <ChevronDown className={`w-4 h-4 transition-transform ${showCategory ? 'rotate-180' : ''}`} />
                  </button>

                  {showCategory && (
                     <div className='absolute top-full left-0 mt-2 w-44 sm:w-48 bg-white border border-slate-200 rounded-md shadow-lg p-4 z-20'>
                        <p className='text-xs font-semibold text-slate-500 mb-3'>CATEGORIES</p>

                        <div className='flex flex-col gap-3 text-sm text-slate-600'>
                           <label className='flex items-center gap-3 cursor-pointer'>
                              <input onChange={toggleCategory} checked={category.includes('Men')} className='w-4 h-4 accent-violet-600' type='checkbox' value='Men' />
                              Men
                           </label>

                           <label className='flex items-center gap-3 cursor-pointer'>
                              <input onChange={toggleCategory} checked={category.includes('Women')} className='w-4 h-4 accent-violet-600' type='checkbox' value='Women' />
                              Women
                           </label>

                           <label className='flex items-center gap-3 cursor-pointer'>
                              <input onChange={toggleCategory} checked={category.includes('Kids')} className='w-4 h-4 accent-violet-600' type='checkbox' value='Kids' />
                              Kids
                           </label>
                        </div>
                     </div>
                  )}
               </div>

               <div className='relative w-1/2 sm:w-auto' >
                  <button onClick={() => { setShowType(!showType); setShowCategory(false); setShowSort(false) }} className='flex w-full sm:w-auto
                  items-center justify-center gap-2 border border-slate-200 bg-white rounded-md px-3 sm:px-4 py-2.5 text-sm text-slate-700 hover:border-violet-400 transition-colors'>
                     TYPE
                     <ChevronDown className={`w-4 h-4 transition-transform ${showType ? 'rotate-180' : ''}`} />
                  </button>

                  {showType && (
                     <div className='absolute top-full left-0 mt-2 w-44 sm:w-48 bg-white border border-slate-200 rounded-md shadow-lg p-4 z-20'>
                        <p className='text-xs font-semibold text-slate-500 mb-3'>TYPE</p>

                        <div className='flex flex-col gap-3 text-sm text-slate-600'>
                           <label className='flex items-center gap-3 cursor-pointer'>
                              <input onChange={toggleSubCategory} checked={subCategory.includes('Topwear')} className='w-4 h-4 accent-violet-600' type='checkbox' value='Topwear' />
                              Topwear
                           </label>

                           <label className='flex items-center gap-3 cursor-pointer'>
                              <input onChange={toggleSubCategory} checked={subCategory.includes('Bottomwear')} className='w-4 h-4 accent-violet-600' type='checkbox' value='Bottomwear' />
                              Bottomwear
                           </label>

                           <label className='flex items-center gap-3 cursor-pointer'>
                              <input onChange={toggleSubCategory} checked={subCategory.includes('Winterwear')} className='w-4 h-4 accent-violet-600' type='checkbox' value='Winterwear' />
                              Winterwear
                           </label>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            <div className='relative'>
               <button onClick={() => { setShowSort(!showSort); setShowCategory(false); setShowType(false) }} className='flex w-full sm:w-auto items-center 
               justify-center gap-2 border border-slate-200 bg-white rounded-md px-6 py-2.5 text-sm text-slate-700 hover:border-violet-400 transition-colors'>
                  SORT BY
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? 'rotate-180' : ''}`} />
               </button>

               {showSort && (
                  <div className='absolute top-full right-0 mt-2 w-full sm:w-52 bg-white border border-slate-200 rounded-md shadow-lg p-2 z-20'>
                     <button onClick={() => { setSortType('relevent'); setShowSort(false) }} className={`w-full text-left px-3 py-2.5 rounded 
                     text-sm transition-colors ${sortType === 'relevent' ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                        Relevant
                     </button>

                     <button onClick={() => { setSortType('low-high'); setShowSort(false) }} className={`w-full text-left px-3 py-2.5 rounded 
                     text-sm transition-colors ${sortType === 'low-high' ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                        Price: Low to High
                     </button>

                     <button onClick={() => { setSortType('high-low'); setShowSort(false) }} className={`w-full text-left px-3 py-2.5 rounded 
                     text-sm transition-colors ${sortType === 'high-low' ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                        Price: High to Low
                     </button>
                  </div>
               )}
            </div>
         </div>

         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10'>
            {filterProducts.map((item, index) => (
               <React.Fragment key={item._id}>
                  {index === 12 && (
                     <div className='col-span-full sm:my-2'>
                        <img src={assets.banner1} className='w-full rounded-md' alt="" />
                     </div>
                  )}

                  {index === 24 && (
                     <div className='col-span-full sm:my-2'>
                        <img src={assets.banner2} className='w-full rounded-md' alt="" />
                     </div>
                  )}

                  <ProductItem name={item.name} id={item._id} price={item.price} image={item.image} />
               </React.Fragment>
            ))}
         </div>
      </div>
   )
}

export default Collection