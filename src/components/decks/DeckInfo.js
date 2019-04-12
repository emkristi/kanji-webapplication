import React from 'react'


const DeckInfo = ({deck}) => {
    return(
        <div>
            <h3>{deck.title}</h3>
            <p>{deck.type}</p>
        </div>      
    )
}

export default DeckInfo