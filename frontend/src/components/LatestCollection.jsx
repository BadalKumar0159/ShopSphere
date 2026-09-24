import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 10))
    }, [products])

    return (
        <div className='my-8 sm:my-14'>

            <div className='text-center py-8 text-lg sm:text-2xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'}/>

                <p className='w-3/4 max-w-2xl m-auto text-sm sm:text-base text-slate-500 mt-3'>
                   Discover our latest arrivals and elevate your style.
                </p>
            </div>

            {/* Rendering Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8'>
                {
                    latestProducts.map((item) => (
                        <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>

        </div>
    )
}

export default LatestCollection
