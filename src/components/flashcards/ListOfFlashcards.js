import React from 'react'
import FlashcardInfo from './FlashcardInfo'
import { Link } from 'react-router-dom'

// recieving flashcards props by destructuring directly -> grabs the flashcards property of the props that we recieve in this component
const ListOfFlashcards = ({flashcards}) => {
  return (
    <div className="flashcard-list section">
      { /* cycling through the flashcards by mapping through the flashcards.
            it only maps if we have flashcards, therefor flashcards &&.
            mapping through the flashcards -> we take the individual flashcard
            each time we cycle through the array. we return something for each flashcard in the
            return.  */}
      { flashcards && flashcards.map(flashcard => {
        return (
          <Link to={'/flashcard/' + flashcard.id}>
            <FlashcardInfo flashcard={flashcard} key={flashcard.id} />
          </Link>
        )
      })}  
    </div>
  )
}

export default ListOfFlashcards