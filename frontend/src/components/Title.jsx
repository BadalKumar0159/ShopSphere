import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className=''>
            <p className='font-medium tracking-[0.05em] text-slate-500 '>
                {text1}
                <span className='text-violet-700'> {text2}</span>
            </p>
        </div>
    )
}

export default Title