import React from 'react'

const FlashcardInfo = ({flashcard}) => {
    return(
        <div className="card z-depth-0 project-summary">
            <div class="card-panel grey lighten-4">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title ">Kanji: {flashcard.kanji}</span>
                    <span className="card-title ">English: {flashcard.eng}</span>            
                </div>
            </div>
        </div>
    )
}

export default FlashcardInfo