import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='mt-18 border-t-1 border-slate-300 pt-10 px-4'>

            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 sm:gap-14 my-10 text-sm'>

                <div>
                    <img className='mb-5 w-38' src='fullLogo.png' alt='ShopSphere' />
                    <p className='w-full md:w-2/3 text-slate-500 leading-6'>
                        ShopSphere is your destination for curated fashion, premium electronics, and everyday essentials. We are committed to delivering quality products, seamless shopping, and exceptional customer service.
                    </p>
                </div>

                <div>
                    <p className='text-lg font-semibold mb-5 text-slate-900 border-l-4 border-violet-600 pl-3'>
                        COMPANY
                    </p>

                    <ul className='flex flex-col gap-3 text-slate-500'>
                        <li>
                            <Link to='/' className='hover:text-violet-600 transition-colors'>
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to='/about' className='hover:text-violet-600 transition-colors'>
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link to='/contact' className='hover:text-violet-600 transition-colors'>
                                Contact
                            </Link>
                        </li>

                        <li>
                            <Link to='/collection' className='hover:text-violet-600 transition-colors'>
                                Collections
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className='text-lg font-semibold mb-5 text-slate-900 border-l-4 border-violet-600 pl-3'>
                        GET IN TOUCH
                    </p>

                    <ul className='flex flex-col gap-3 text-slate-500'>
                        <li className='hover:text-violet-600 transition-colors cursor-pointer'>
                            +1-212-456-7890
                        </li>

                        <li className='hover:text-violet-600 transition-colors cursor-pointer'>
                            contact@shopsphere.com
                        </li>
                    </ul>
                </div>

            </div>

            <div className='border-t border-slate-200'>
                <p className='py-5 text-xs sm:text-sm text-center text-slate-500'>
                    © 2026 ShopSphere. All rights reserved.
                </p>
            </div>

        </footer>
    )
}

export default Footer
