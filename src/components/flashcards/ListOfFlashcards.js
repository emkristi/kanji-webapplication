import React from 'react'
import FlashcardInfo from './FlashcardInfo'
import { Link } from 'react-router-dom'

const ListOfFlashcards = ({flashcards}) => {
  return (
    <div className="flashcard-list section">
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