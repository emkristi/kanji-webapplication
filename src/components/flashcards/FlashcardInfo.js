import React from 'react'

/**
 * We are passing in an individual flashcard in this component and can therefor output dynamically in the return (flashcard.kanji)
 * @param {*} param0 
 */
const FlashcardInfo = ({flashcard}) => {
    return(
        <div className="card z-depth-0 project-summary">
            <div className="card-panel grey lighten-4">
                <div className="card-content grey-text text-darken-3">
                    <img className="card-content" src={flashcard.pictureUrl}/>
                    <span className="card-title ">Kanji: {flashcard.kanji}</span>
                    <span className="card-title ">English: {flashcard.eng}</span>
                    <span className="card-title ">Radicals: {flashcard.radicals}</span>            
                </div>
            </div>
        </div>
    )
}



export default FlashcardInfo