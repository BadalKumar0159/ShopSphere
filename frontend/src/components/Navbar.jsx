import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { Search, User, ShoppingBag, Menu, ChevronLeft } from 'lucide-react';

const Navbar = () => {

   const [visible, setVisible] = useState(false);
   const [activeTab, setActiveTab] = useState('home');
   const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

   const logout = () => {
      navigate('/login')
      localStorage.removeItem('token');
      setToken('');
      setCartItems({});
   }

   return (
      <div className='shadow-[0_4px_4px_-2px_rgba(0,0,0,0.05)] px-2 flex items-center justify-between py-4 font-medium border-b border-slate-300'>
         <Link to='/' onClick={() => setActiveTab('home')}>
            <img src="fullLogo.png" className='w-38' alt="ShopSphere Logo" />
         </Link>

         {/* Navigation Links */}
         <ul className='hidden sm:flex gap-6 text-sm text-slate-700'>
            <NavLink to='/' onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-colors 
            ${activeTab === 'home' ? 'text-violet-600 font-semibold' : 'hover:text-violet-600'}`}>
               <p>HOME</p>
            </NavLink>
            <NavLink to='/collection' onClick={() => setActiveTab('collection')} className={`flex flex-col items-center gap-1 transition-colors 
            ${activeTab === 'collection' ? 'text-violet-600 font-semibold' : 'hover:text-violet-600'}`}>
               <p>COLLECTION</p>
            </NavLink>
            <NavLink to='/contact' onClick={() => setActiveTab('contact')} className={`flex flex-col items-center gap-1 transition-colors 
            ${activeTab === 'contact' ? 'text-violet-600 font-semibold' : 'hover:text-violet-600'}`}>
               <p>CONTACT</p>
            </NavLink>
            <NavLink to='/about' onClick={() => setActiveTab('About')} className={`flex flex-col items-center gap-1 transition-colors 
            ${activeTab === 'About' ? 'text-violet-600 font-semibold' : 'hover:text-violet-600'}`}>
               <p>ABOUT </p>
            </NavLink>
         </ul>

         {/* Actions & Utilities */}
         <div className='flex items-center gap-2 sm:gap-6'>
            {/* Search Icon */}
            <Search onClick={() => setShowSearch(true)} strokeWidth={1.5} className='w-6 h-6 text-slate-700 cursor-pointer hover:text-violet-700 transition-colors' />

            {/* Profile & Dropdown */}
            <div className="group relative">
               <User onClick={() => token ? null : navigate('/login')} strokeWidth={1.5}
               className='w-6 h-6 text-slate-700 cursor-pointer hover:text-violet-700 transition-colors' />

               {/* Dropdown Menu */}
               {token &&
                  <div className='group-hover:block hidden absolute right-0 pt-4 z-20'>
                     <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white border border-slate-200 text-slate-600 rounded-xl shadow-lg'>
                        <p className='cursor-pointer hover:text-violet-600 font-medium transition-colors'>My Profile</p>
                        <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-violet-700 font-medium transition-colors">Orders</p>
                        <p onClick={logout} className="cursor-pointer hover:text-violet-600 font-medium transition-colors">Logout</p>
                     </div>
                  </div>}
            </div>

            {/* Cart Badge & Icon */}
            <Link to='/cart' className='relative'>
               <ShoppingBag strokeWidth={1.5} className='w-6 h-6 text-slate-700 hover:text-violet-700 transition-colors' />
               <p className='absolute right-[-6px] bottom-[-6px] w-4 h-4 flex items-center justify-center bg-violet-600 text-white rounded-full text-[9px] font-bold shadow-sm'>
                  {getCartCount()}
               </p>
            </Link>

            {/* Mobile Menu Icon */}
            <Menu 
               onClick={() => setVisible(true)} 
               className="stroke-1 w-5 h-5 text-slate-700 cursor-pointer sm:hidden hover:text-violet-600 transition-colors" 
            />
         </div>

         {/* Sidebar menu for small screens */}
         <div className={`fixed top-0 right-0 bottom-0 z-30 overflow-hidden bg-slate-50 transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-slate-600 h-full'>
               <div onClick={() => setVisible(false)} className="flex items-center gap-2 p-4 cursor-pointer border-b border-slate-200 text-slate-900 font-semibold hover:text-violet-600 transition-colors">
                  <ChevronLeft className='w-5 h-5' />
                  <p>Back</p>
               </div>
               <NavLink onClick={() => { setVisible(false); setActiveTab('home'); }} className={`py-3 pl-6 border-b border-slate-200 transition-colors ${activeTab === 
               'home' ? 'bg-violet-50 text-violet-600 font-semibold border-l-4 border-l-violet-600' : 'hover:text-violet-600'}`} to='/'> Home </NavLink>
               <NavLink onClick={() => { setVisible(false); setActiveTab('collection'); }} className={`py-3 pl-6 border-b border-slate-200 Transition-colors ${activeTab === 
               'collection' ? 'bg-violet-50 text-violet-600 font-semibold border-l-4 border-l-violet-600' : 'hover:text-violet-600'}`} to='/Collection'> collection </NavLink>
               <NavLink onClick={() => { setVisible(false); setActiveTab('About'); }} className={`py-3 pl-6 border-b border-slate-200 transition-colors ${activeTab === 
               'About' ? 'bg-violet-50 text-violet-600 font-semibold border-l-4 border-l-violet-600' : 'hover:text-violet-600'}`} to='/About'> About </NavLink>
               <NavLink onClick={() => { setVisible(false); setActiveTab('contact'); }} className={`py-3 pl-6 border-b border-slate-200 transition-colors ${activeTab === 
               'contact' ? 'bg-violet-50 text-violet-600 font-semibold border-l-4 border-l-violet-600' : 'hover:text-violet-600'}`} to='/contact'> Contact </NavLink>
            </div>
         </div>

      </div>
   )
}

export default Navbar