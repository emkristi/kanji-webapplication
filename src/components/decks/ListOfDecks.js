import React from 'react'
import DeckInfo from './DeckInfo'

const ListOfDecks = ({decks}) => {
  return (
    <div className="deck-list section">
      { decks && decks.map(deck => {
        return (
          <DeckInfo deck={deck} key={deck.id} />
        )
      })}  
    </div>
  )
}

export default ListOfDecks