import React from 'react'
import '../../CSS/frontpage.css';


/**
 * Component containing information about a single deck. Used in Frontpage.js
 * 
 * @param {*} param0 
 */

const DeckInfo = ({deck}) => {
    return(
        <div>
            <h3>{deck.title}</h3>
            <p className="decktypetxt">{deck.type}</p>
        </div>      
    )
}

export default DeckInfo