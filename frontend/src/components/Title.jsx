import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className='inline-flex flex-col items-center mb-3'>
            <p className='font-medium tracking-[0.1em] text-slate-500 uppercase'>
                {text1}
                <span className='text-violet-700'> {text2}</span>
            </p>
        </div>
    )
}

export default Title