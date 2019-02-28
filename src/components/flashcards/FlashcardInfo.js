import React from 'react'

/**
 * We are passing in an individual flashcard in this component and can therefor output dynamically in the return (flashcard.kanji)
 * @param {*} param0 
 */

const FlashcardInfo = ({flashcard, deck}) => {
    console.log(deck.type);
    return(
        <div className="card z-depth-0 project-summary">
            <div className="card-panel grey lighten-4">
                <div className="card-content grey-text text-darken-3">
                    <div className="content">
                        {deck.type === "Images" && 
                            <div className="content">
                                <div className="content front">
                                    <img className="card-content" src={flashcard.pictureUrl}/>
                                    <span className="card-title ">喿    火    乚     雨</span>
                                </div>
                                <p>_______________________________</p>
                                <div className="content front">
                                    <span className="card-title ">喿</span>
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