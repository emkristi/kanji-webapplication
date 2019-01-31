import React, {Component } from 'react'
import Flippy, {FrontSide, BackSide} from "react-flippy"

class CreateFlashcards extends Component {
    state ={
    }
    render() {
        return(
            <div class="container">
                <div className="s12 m3 l4">
                    <Flippy
                        flipOnClick = {true}
                        flipDirection = "horizontal"
                        ref = {(r) => this.flippy = r}
                        style = {{width:"300px", height:"400px"}}>
                        <FrontSide 
                        style={{backgroundColor: "#e0e5e2"}} >
                            <div className="center-align">
                                <h1>漢</h1>
                                <h6>Click me!</h6>
                            </div> 
                        </FrontSide>
                        <BackSide
                        style={{ backgroundColor: '#e0e5e2'}}>
                        
                            <div className="center-align">
                                    <h1>漢</h1>
                                    <h6>town</h6>
                            </div> 

                            <div className="s12 m3 l4">
                                <p>Radikal 1: Ricepaddy</p>
                                <p>Radikal 2: Street</p>
                            </div>
                            <div class="row">
                            <form class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                <textarea id="textarea1" class="materialize-textarea"></textarea>
                                <label for="textarea1">Husketekst</label>
                                </div>
                            </div>
                            </form>
                        </div>
                        </BackSide>
                    </Flippy>
                </div>
            </div>
           
        )   
    }
} 

export default CreateFlashcards;