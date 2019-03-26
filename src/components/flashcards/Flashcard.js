import React from 'react'

const Flashcard = ({ flashcard }) => {

    return (
        <div className="flip-card card-panel">
            <div className="flip-card-inner card-content grey-text text-darken-3" >
                <div className="flip-card-front">
                    <span className="card-title"> {flashcard.kanji} </span>
                </div>
                <div className="flip-card-back">
                    <span className="card-title"> {flashcard.eng} </span>
                    <span className="card-title"> {flashcard.radicals.length > 0 && flashcard.radicals.map(r => r.id)}</span>
                </div>
            </div>
        </div>
    )
}
export default Flashcard