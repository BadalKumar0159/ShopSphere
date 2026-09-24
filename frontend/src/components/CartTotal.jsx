import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { ReceiptText } from 'lucide-react'
import Title from './Title'

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

    const subtotal = getCartAmount()
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee

    return (
        <div className='w-full'>
            <div className='flex items-center gap-2 mb-4'>
                <ReceiptText size={20} className='text-violet-600' />
                <Title text1={'Cart'} text2={'Totals'} />
            </div>

            <div className='space-y-4 text-sm'>
                <div className='flex justify-between text-slate-600'>
                    <p>Subtotal</p>
                    <p className='font-medium text-slate-900'>
                        {currency} {subtotal}.00
                    </p>
                </div>

                <div className='flex justify-between text-slate-600'>
                    <p>Shipping Fee</p>
                    <p className='font-medium text-slate-900'>
                        {currency} {delivery_fee}.00
                    </p>
                </div>

                <div className='border-t border-slate-200 pt-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-base font-semibold text-slate-900'>
                            Total
                        </p>
                        <p className='text-xl font-bold text-slate-900'>
                            {currency} {total}.00
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartTotal