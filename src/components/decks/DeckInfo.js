import React from 'react'
import { Link } from 'react-router-dom'


const DeckInfo = ({deck}) => {
    return(
        <div className="row">
            <span className="card-title ">{deck.title}</span>
            <p>teste teste</p>
            {/* decks && decks.map(deck => {
                return (
                <Link to={'/deck/' + deck.id} key={deck.id}>
                    <DeckInfo deck={deck}/>
                </Link>
                )
            })*/}  
        </div>      
    )
}

export default DeckInfo