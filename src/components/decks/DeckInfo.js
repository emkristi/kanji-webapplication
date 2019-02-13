import React from 'react'

/**
 * We are passing in an individual flashcard in this component and can therefor output dynamically in the return (flashcard.kanji)
 * @param {*} param0 
 */
const FlashcardInfo = ({deck}) => {
    return(
        <div className="content">
            <span className="card-title ">{deck.title}</span>
            {/* Link til alle flashcards som har deckid lik id'en til det deck'et man trykker på...
            Hvis gjeldende deck (deck.id) tilsvarer deckId i flashcards -> alle disse flashcards bør komme opp */}
        </div>      
    )
}

export default FlashcardInfo