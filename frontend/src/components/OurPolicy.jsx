import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    const policies = [
        { icon: assets.exchange_icon, title: 'Easy Exchange Policy', description: 'We offer a hassle-free exchange policy.' },
        { icon: assets.quality_icon, title: '7 Days Return Policy', description: 'Enjoy a simple and convenient return process.' },
        { icon: assets.support_img, title: 'Best Customer Support', description: "We're here whenever you need assistance." }
    ]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 py-14'>
            {policies.map((policy, index) => (
                <div key={index} className='group text-center bg-white border border-slate-200 rounded-xl px-5 py-8 overflow-hidden 
                transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60'>

                    {/* Icon */}
                    <div className='w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-violet-50 group-hover:bg-violet-100 transition-colors duration-300'>
                        <img className='w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300' src={policy.icon} alt={policy.title} />
                    </div>

                    {/* Title */}
                    <p className='font-semibold text-slate-900 text-sm sm:text-base group-hover:text-violet-700 transition-colors duration-300'>
                        {policy.title}
                    </p>

                    {/* Description */}
                    <p className='text-slate-500 text-xs sm:text-sm mt-2 leading-6 max-w-xs mx-auto'>
                        {policy.description}
                    </p>

                </div>
            ))}
        </div>
    )
}

export default OurPolicy
