import React from 'react'
import { FaPlay, FaPause, FaSyncAlt } from 'react-icons/fa'

const Controleur = ({ initi, play, pause }) => {
    return (
        <div className='control-conainer'>
            <span onClick={ play }> <FaPlay /> </span>
            <span onClick={ pause}> <FaPause /> </span>
            <span onClick={ initi }> <FaSyncAlt /> </span>
        </div>
    )
}

export default React.memo(Controleur)

