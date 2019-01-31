import React, {Component } from 'react'
import { connect } from 'react-redux'
import Flippy, {FrontSide, BackSide} from "react-flippy"

class CreateFlashcards extends Component {
    state ={

    }
    render() {
        return(
            <div className = "container">
            <Flippy 
                flipOnHover = {false}
                flipOnClick = {true}
                flipDirection = "horizontal"
                ref = {(r) => this.flippy = r}
                style = {{width:"200px", height:"200px"}}>
                <FrontSide style={{backgroundColor: "#a8cdbb"}}> 
                    <i class="material-icons">cached</i>
                </FrontSide>
                <BackSide style = {{backGroundColor: "#229059"}}> 
                    <p>Kanji</p>
                </BackSide>
            </Flippy>
        </div>
        )
    }
} 

export default CreateFlashcards;