import React from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const Parametreur = ( {m, cm, b, cb} ) => {
    return (
        <div className='param-container'>
            <div>
                <p>Break Length</p>
                <p>
                    <span onClick={() => cb(-1)} className='arrow'> <FaArrowDown /> </span>
                    <span> { b } </span>
                    <span onClick={() => cb(1)} className='arrow'> <FaArrowUp /> </span>
                </p>
            </div>
            <div>
                <p>Session Length</p>
                <p>
                    <span onClick={() => cm(-1)} className='arrow'> <FaArrowDown /> </span>
                    <span> {m} </span>
                    <span onClick={() => cm(1)} className='arrow'> <FaArrowUp /> </span>
                </p>
            </div>
        </div>
    )
}

export default React.memo(Parametreur)