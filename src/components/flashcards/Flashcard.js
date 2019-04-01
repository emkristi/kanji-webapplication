import React from 'react'

const Flashcard = ({ flashcard, radicals }) => {

    return (
        <div className="flip-card">
            <div className="flip-card-inner card-content grey-text text-darken-3" >
                <div className="flip-card-front">
                    <span className="card-title"> {flashcard.kanji} </span>
                </div>
                <div className="flip-card-back">
                    <span className="card-title"> {flashcard.eng} </span>
                    <span className="card-title"> {flashcard.mnemonic} </span>
                    <span className="card-title">
                        {/*radicals.length > 0 && radicals.map(r => <span key={r}>{r}</span>)*/}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Flashcard