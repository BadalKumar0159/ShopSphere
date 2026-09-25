import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { Info, PackageSearch, Star } from 'lucide-react';
import Title from '../components/Title';

const Product = () => {

   const { productId } = useParams();
   const { products, currency, addToCart } = useContext(ShopContext);
   const [productData, setProductData] = useState(false);
   const [image, setImage] = useState('');
   const [size, setSize] = useState('');

   const fetchProductData = async () => {
      products.map((item) => {
         if (item._id === productId) {
            setProductData(item);
            setImage(item.image[0]);
            return null;
         }
      })
   }

   useEffect(() => {
      fetchProductData();
   }, [productId, products]);

   return productData ? (
      <div className='pt-16 transition-opacity ease-in duration-500 opacity-100'>

         {/* ------------------ Product Data ------------------------*/}
         <div className='flex flex-col gap-8 sm:flex-row sm:gap-10'>

            {/* Product Image */}
            <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row'>
               <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2'>
                  {
                     productData.image.map((item, index) => (
                        <img onClick={() => setImage(item)} className={`w-[24%] sm:w-full sm:mb-1 flex-shrink-0 cursor-pointer rounded-lg border transition-all 
                        ${image === item ? 'border-violet-500' : 'border-slate-200 hover:border-violet-300'}`} src={item} key={index} alt="" />
                     ))
                  }
               </div>

               <div className='w-full sm:w-[80%] '>
                  <img className='w-full rounded-xl bg-slate-50 border border-slate-200' src={image} alt="" />
               </div>
            </div>

            {/* Product Info */}
            <div className="flex-1">
               <p className='text-sm text-violet-600 font-medium'>{productData.category}</p>
               <h1 className='font-semibold text-2xl mt-2 text-slate-900'>{productData.name}</h1>

               <div className="flex items-center gap-1 mt-3">
                  <Star size={18} className='text-violet-600 fill-violet-600' />
                  <Star size={18} className='text-violet-600 fill-current' />
                  <Star size={18} className='text-violet-600 fill-current' />
                  <Star size={18} className='text-violet-600 fill-current' />
                  <Star size={18} className='text-violet-600' />
                  <p className="pl-2 text-sm text-slate-500">(122 Reviews)</p>
               </div>

               <p className='mt-5 text-3xl font-semibold text-slate-900'>{currency}{productData.price}</p>
               <div className='flex flex-col gap-4 my-8'>
                  <p className='text-sm font-semibold text-slate-900'>Select Size</p>
                  <div className='flex gap-2'>
                     {productData.sizes.map((item, index) => (
                        <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 rounded-lg text-sm font-medium transition-all
                        ${item === size ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-600'}`}>{item}</button>
                     ))}
                  </div>
               </div>

               <button onClick={() => addToCart(productData._id, size)} className='bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg text-sm font-medium transition-colors'>
                  ADD TO CART
               </button>
               <hr className='mt-8 sm:w-4/5 border-slate-200' />
               <div className='flex flex-col gap-2 mt-5 text-sm text-slate-500'>
                  <p>100% Original Product</p>
                  <p>Cash on delivery is available on this product.</p>
                  <p>Easy return and exchange policy within 7 days.</p>
               </div>
            </div>
         </div>

         {/* --------------------- Description & Review Section ------------------ */}
         <div className='mt-20'>
            <div className='border border-slate-300 p-5 sm:py-7 sm:px-8 rounded-xl bg-white overflow-hidden'>
               <div className='flex gap-3 text-lg border-b px-2 pb-3 border-violet-300'>
                  <PackageSearch className='size-6 text-violet-600'/>
                  <Title text1={'Product'} text2={'Information'} />
               </div>


               <div className='p-3 sm:p-6'>
                  <p className='text-sm text-slate-600 leading-6'>
                     {productData.description}
                  </p>

                  <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-3'>
                     <div className='flex justify-between border-b border-slate-100 pb-3'>
                        <p className='text-sm text-slate-500'>Category:</p>
                        <p className='text-sm font-medium text-slate-800'>{productData.category}</p>
                     </div>

                     <div className='flex justify-between border-b border-slate-100 pb-3'>
                        <p className='text-sm text-slate-500'>Subcategory:</p>
                        <p className='text-sm font-medium text-slate-800'>{productData.subCategory}</p>
                     </div>

                     <div className='flex justify-between border-b border-slate-100 pb-3'>
                        <p className='text-sm text-slate-500'>Available Sizes:</p>
                        <p className='text-sm font-medium text-slate-800'>{productData.sizes.join(',  ')}</p>
                     </div>

                     <div className='flex justify-between border-b border-slate-100 pb-3'>
                        <p className='text-sm text-slate-500'>Return Policy:</p>
                        <p className='text-sm font-medium text-slate-800'>7 Days</p>
                     </div>
                  </div>
               </div>

            </div>
         </div>

         {/* ----------------- Display related products ------------------- */}
         <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      </div>
   ) : <div className="opacity-0"></div>

}

export default Product;