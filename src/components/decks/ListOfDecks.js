import React from 'react'
import DeckInfo from './DeckInfo'
import { Link } from 'react-router-dom'

const ListOfDecks = ({decks}) => {
  return (
    <div className="deck-list section">
      { decks && decks.map(deck => {
        return (
          <Link to={'/deck/' + deck.id}>
            <DeckInfo deck={deck} key={deck.id} />
          </Link>
        )
      })}  
    </div>
  )
}

export default ListOfDecks