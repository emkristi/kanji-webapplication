import React from 'react'

/**
 * We are passing in an individual flashcard in this component and can therefor output dynamically in the return (flashcard.kanji)
 * @param {*} param0 
 */

const FlashcardInfo = ({flashcard, deck, flashcards, randomArrayList, riktigfc, hc, hcc}) => {
    console.log(deck.type);
    console.log(flashcards);
    return(
        <div className="content">
            <div className="content">
                <div className="content">
                    <div className="content">
                        {deck.type === "Images" && 
                            <div className="content">
                                <div className="content front">
                                    <img className="card-content" src={flashcard.pictureUrl} width="150px" height="150px"/>

                                    <div class="row">
                                        <button onClick={hcc}>{randomArrayList[0]}</button>
                                        <button>{randomArrayList[1]}</button>
                                        <button>{randomArrayList[2]}</button>
                                        <button>{randomArrayList[3]}</button>
                                    </div>
                                   
                                </div>
                                <p>_______________________________</p>
                                <div className="content front">
                                    <div class="row">
                                        <span className="card-title ">{riktigfc}</span>
                                    </div>
                                    <div class="row">
                                        <button onClick={hc}>ThankUNext</button>    
                                    </div>
                                    
                                </div>
                            </div>
                        }

                        {deck.type === "Kanji to english" && 
                            <div className="content">
                                <div className="content front">
                                    <span className="card-title ">{flashcard.kanji}</span>
                                </div>

                                <p>______________________________</p>
                                <div className="content front">
                                    <span className="card-title ">{flashcard.eng}</span>
                                    <div className="content">
                                        {flashcard.radicals !== "" && 
                                            <span className="card-title">Radicals: {flashcard.radicals}</span>
                                        }
                                    </div>
                            
                                    <div className="content">
                                        {flashcard.mnemonic !== "" && 
                                            <span className="card-title ">Mnemonic: {flashcard.mnemonic}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>       
                </div>
            </div>
        </div>
    )
}

export default FlashcardInfo