import React from 'react'

const Flashcard = ({ flashcard, flashcards }) => {

    return (
        <div className="flip-card">
            <div className="flip-card-inner" >
                <div className="flip-card-front">
                    <span className="card-title"> {flashcard.kanji} </span>
                </div>
                <div className="flip-card-back">
                    <span className="card-title"> {flashcard.eng} </span>
                    <span className="card-title"> {flashcard.mnemonic} </span>
                    <span className="card-title"> {/*flashcard.radicals.length > 0 && flashcard.radicals.map(r => r.id)*/}</span>
                    <span className="card-title">{flashcard.radicals.length > 0 && (flashcard.radicals.map(r => r.id) === flashcards.map(k => k.id))} </span>
                </div>
            </div>
        </div>
    )
}
export default Flashcard