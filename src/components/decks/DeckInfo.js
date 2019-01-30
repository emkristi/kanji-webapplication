import React from 'react'

const DeckInfo = ({deck}) => {
    return(
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title ">{deck.title}</span>
                <p>Deck type: {deck.type}</p>
            </div>
        </div>
    )
}

export default DeckInfo