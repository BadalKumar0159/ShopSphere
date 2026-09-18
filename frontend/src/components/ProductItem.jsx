import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

// It is a single product card: shows image, name, price & navigates to product page using Link and context currency
const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext)

    return (
        <Link className='text-slate-700 cursor-pointer group p-2' to={`/product/${id}`} >
            <div className='overflow-hidden rounded-md bg-slate-100'>
                <img className='w-full group-hover:scale-105 transition duration-300 ease-in-out' src={image[0]} alt={name} />
            </div>
            <p className='pt-3 pb-1 text-sm font-medium text-slate-900 group-hover:text-violet-950'>
                {currency}{price}
            </p>
            <p className='text-sm text-slate-700 group-hover:text-violet-950'>
                {name}
            </p>


        </Link>
    )
}

export default ProductItem

