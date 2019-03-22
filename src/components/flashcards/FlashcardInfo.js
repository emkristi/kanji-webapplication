import React from 'react'

/**
 * We are passing in an individual flashcard in this component and can therefor output dynamically in the return (flashcard.kanji)
 * @param {*} param0 
 */

const FlashcardInfo = ({flashcard, deck, flashcards, randomArrayList, riktigfc, hc, hcc}) => {
    //console.log(deck.type);
    //console.log(flashcards);
    return(
        <div className="content">
            <div className="content">
                <div className="content">
                    <div className="content">
                        {deck.type === "Images" && 
                            <div class="content">
                                <div className="content front">
                                    <img className="card-content" src={flashcard.pictureUrl} width="200px" height="200px"/>
                                    <div class="row">
                                        <button onClick={hcc} id='but1'>{randomArrayList[0]}</button>

                                        <input type='button' id="but2" value={randomArrayList[1]}></input>
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
                                    <span className="card-title ">{riktigfc}</span>
                                </div>
                                <p>______________________________</p>
                                <div className="content front">
                                <div className="content front">
                                    <div class="row">
                                       {/* <span className="card-title ">{flashcard.eng}</span> */}
                                    </div>
                                    <div class="row">
                                        <button onClick={hc}>ThankUNext</button>    
                                    </div>
                                    
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