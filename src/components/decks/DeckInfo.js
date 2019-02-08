import React from 'react'

/**
 * We are passing in an individual flashcard in this component and can therefor output dynamically in the return (flashcard.kanji)
 * @param {*} param0 
 */
const FlashcardInfo = ({deck}) => {
    return(
/*
        <div className="content">
            <div className="row">
            <span className="card-title ">Kanji: {flashcard.kanji}</span>
            <span className="card-title ">English: {flashcard.eng}</span>
            <span className="card-title ">Radicals: {flashcard.radicals}</span> 
*/
        <div>
            <span className="card-title ">{deck.title}</span>
        </div>
       
    )
}

export default FlashcardInfo