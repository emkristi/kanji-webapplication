import React from 'react'


const DeckInfo = ({deck}) => {
    return(
        <div className="container">
            <h3 className="content">{deck.title}</h3>
            <p className="b">{deck.type}</p>
        </div>      
    )
}

export default DeckInfo