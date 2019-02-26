import React, {Component} from 'react'

class Flashcards extends Component{ 

    insertContentFlashcard (){
        //Code to insert content to the flashcard
        console.log("Funker")
        document.getElementById("change-content").innerHTML =  "Changed content";
    }

    
    render(){
        return(
           <div id="flashcard" onClick={this.insertContentFlashcard}>
                <div className="card blue-grey darken-1" id="flashcard-outside">
                    <div className="card-content white-text">
                        <div id="change-content">Content you should change based on functions and DB.</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Flashcards;