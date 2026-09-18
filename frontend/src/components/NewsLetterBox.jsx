import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className='text-center py-10'>
            <p className='text-2xl sm:text-3xl font-medium text-slate-900'>
                Subscribe now & get 20% Off
            </p>

            <p className='text-sm text-slate-500 mt-3 max-w-md mx-auto'>
                Subscribe to get exclusive offers, new arrivals, and updates delivered straight to your inbox.
            </p>

            <form
                onSubmit={onSubmitHandler}
                className='w-full sm:w-[500px] flex items-center mx-auto mt-7 border border-slate-200 bg-white rounded-md overflow-hidden focus-within:border-violet-500 transition-colors'
            >
                <input
                    className='flex-1 min-w-0 px-4 py-3.5 outline-none text-sm text-slate-900 placeholder:text-slate-400'
                    type='email'
                    placeholder='Enter your email address'
                    required
                />

                <button
                    className='bg-violet-600 text-white text-xs font-medium tracking-wide px-6 sm:px-8 py-4 hover:bg-violet-700 transition-colors'
                    type='submit'
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    )
}

export default NewsLetterBox
