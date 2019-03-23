import React from 'react'

const Flashcard = ({ flashcard }) => {
    return (
        <div className="card-panel">
            <div className="card-content grey-text text-darken-3" >
                <span className="card-title"> {flashcard.kanji} </span>
                <span className="card-title"> {flashcard.eng} </span>
                <span className="card-title"> {flashcard.radicals} </span>
            </div>
        </div>
    )
}
export default Flashcard