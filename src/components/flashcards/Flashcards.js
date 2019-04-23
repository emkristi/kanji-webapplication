import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase' //used to connect to firestore
import { compose } from 'redux';
import Flashcard from '../flashcards/Flashcard';
import { addCompletedFlashcards } from '../../store/actions/flashcardActions'
//import { removeCompletedFlashcards } from '../../store/actions/flashcardActions'
import { updateUser } from '../../store/actions/userActions'
import { updateusers } from '../../store/actions/userActions'
import { loaduser } from '../../store/actions/userActions'
import { updateMnemonic } from '../../store/actions/flashcardActions'
import { replaceMnemonic } from '../../store/actions/flashcardActions'
import '../../CSS/flashcard.css';

class Flashcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      bufferfc: [],
      fcArray: [],
      mnemonic: '',
      showMnemField: false
    };
  }

  componentDidMount(){
    this.props.firestore.setListener({collection: 'users'})
  }

  componentWillUnmount(){
    this.props.firestore.unsetListener({collection: 'users'})
  }

  handleEditMnemClick = (e) => {
    this.setState({showMnemField: true});
  }

  handleMnemonicChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleMnemonicSubmit = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { mnemonics, users, auth } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);
    e.preventDefault();
    let mnem = this.state.mnemonic;

    let user = users.find(u => u.id === auth.uid);

    

    let gjeldendeFlashcard = categoryfcs[currentCard];
    let gjeldendeMnem = "";
    let ingenMnemInArr = false;
    for(let i = 0; i < mnemonics.length; ++i){
      if(gjeldendeFlashcard.id === mnemonics[i].fcId && mnemonics[i].userId === user.id){
        // finner gjeldende mnemonic hcis det er noen
        gjeldendeMnem = mnemonics[i];
        console.log("gjeldende", gjeldendeMnem);
        for(let j = 0; j < user.mnemonicArr.length; j++){
          console.log(gjeldendeMnem.id, user.mnemonicArr[j]);
          if(user.mnemonicArr[j] === gjeldendeMnem.id){
            this.props.replaceMnemonic(this.state.mnemonic, gjeldendeMnem, gjeldendeFlashcard.id);
          } 
            //console.log("finnes ikke")
            //ingenMnemInArr = true;
            //console.log("hey");
            //this.props.updateMnemonic(this.state.mnemonic, categoryfcs[currentCard].id)
          
        }
      } 
    }

    /*
    for(let j = 0; j < user.mnemonicArr.length; j++){
      if(user.mnemonicArr[i] === gjeldendeMnem){
        this.props.replaceMnemonic(this.state.mnemonic, gjeldendeMnem, gjeldendeFlashcard.id);
      }
    }
    */

    if(gjeldendeMnem === ""){
      this.props.updateMnemonic(this.state.mnemonic, categoryfcs[currentCard].id)
    }
  }
  

  handleHard = (e) => {
    this.changeFc();
  }

  handleEasy = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { mnemonics } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);

    // Legg til flashcard i DB
    this.props.updateUser(categoryfcs[currentCard].id);

    this.changeFc();
  }

  findIndexOfFcId = (categoryfcs, fcid) => {
    let value = categoryfcs.find((val) => {
      return (val.id === fcid)
    });
    return categoryfcs.indexOf(value);
  }

  findFlashcardById = (id) => {
    const { flashcards } = this.props;
    return flashcards.find(f => f.id === id);
  }

  changeFc = (e) => {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;
    const { currentCard, bufferfc, fcArray, localfcardarr} = this.state;

    let categoryfcs = flashcards.filter(f => f.deckid === id);
    let user = users.find(u => u.id === auth.uid);

    // seenFc -> flashcards som allerede er gått gjennom
    const seenFc = user.flashcardArray ? user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id) : [];

    this.props.loaduser();

    // If no more unseen flashcards, go back to frontpage
    if (seenFc.length === categoryfcs.length - 1) {
      window.location.href = '/';
      return;
    }
    
    let currentNumber = 0;
    // If flashcards in buffer, show first element and remove element from buffer
    if (bufferfc.length > 0) {
      currentNumber = this.findIndexOfFcId(categoryfcs, bufferfc[0]);
      if (bufferfc.length > 1) {
        this.setState({ bufferfc: bufferfc.splice(1, bufferfc.length - 1) })
      } else {
        this.setState({ bufferfc: [] });
      }
      // If no flashcards in buffer, find random flashcard from category flashcards
    } else {
      let temp = true;
      while (temp) {
        currentNumber = (Math.round(Math.random() * (categoryfcs.length - 1)));
        // If this random flashcard is not seen before
        if (!(((user.flashcardArray && user.flashcardArray.includes(categoryfcs[currentNumber].id)) || (currentNumber === currentCard)))) {
          //Check if random flashcard's got radicals
          let fcradicals = categoryfcs[currentNumber].radicals;
          if (fcradicals.length > 0) {
            let notseen = [];
            for (let i = 0; i < fcradicals.length; i++) {
              if (!((user.flashcardArray && user.flashcardArray.includes(fcradicals[i].id)) || currentCard === this.findIndexOfFcId(categoryfcs, fcradicals[i].id))) {
                notseen.push(fcradicals[i].id); // add unseen radical to array
              }
            }
            //if there are radicals who are not seen, show first radical in array and push others + parent flashcard to buffer array in state
            if (notseen.length > 0) {
              let flashcard = categoryfcs[currentNumber];
              currentNumber = this.findIndexOfFcId(categoryfcs, notseen[0]);
              let newarray = [];
              for (let i = 1; i < notseen.length; i++) {
                newarray.push(notseen[i]);
              }
              newarray.push(flashcard.id);
              this.setState({ bufferfc: [...bufferfc, ...newarray] });
            }
          }
          temp = false;
        }
      }
    }
  
    console.log(user.flashcardArray);
 
    this.setState({
      currentCard: currentNumber
    });
  }

  render() {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;
    const { currentCard } = this.state;
    const { mnemonics } = this.props;

    if (!auth.uid) return <Redirect to='/signin' />;

    // Only show flashcards in current category
    let categoryfcs = [];
    if (flashcards) {
      categoryfcs = flashcards.filter(f => f.deckid === id)
    }
  
    // Check if you've seen every flashcard
    let user;
    if (users) {
      user = users.find(u => u.id === auth.uid);    
      if (user.flashcardArray
        && user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id).length === categoryfcs.length) {
        return(
          <div>
            Du har vært gjennom alle i denne kategorien <button onClick={() => window.location.href = '/'}>Gå tilbake</button>
          </div>
        );
        
      }
    }

 
    let personalmnemonic;
    if (users && mnemonics) {
      user = users.find(u => u.id === auth.uid);
      for(let i = 0; i < mnemonics.length; ++i){
        if(user.mnemonicArr && (categoryfcs[currentCard].id === mnemonics[i].fcId) && (user.id === mnemonics[i].userId)){
          personalmnemonic = mnemonics[i].mnemonic;
        }
      }
    }

    let radarray = [];
    
    if(categoryfcs && categoryfcs[currentCard] && categoryfcs[currentCard].radicals && flashcards) {
      let rad = categoryfcs[currentCard].radicals;
      radarray = rad.map(r => flashcards.find(f => f.id === r.id).kanji);
    }
    

    // Error handling
    if (!categoryfcs[currentCard]) return (<div>Not defined</div>);

    return (
      <div className="container">
        <div className="ww">
        {(categoryfcs.length > 0) &&
          <div className="flip-card">
            <div className="flip-card-inner" >
              <div className="flip-card-front ">
                <div class="row">
                  <div className="column">{categoryfcs[currentCard].kanji}</div>
                  <div className="column">{categoryfcs[currentCard].kanji}</div>
                </div>
              </div>
              
              <div className="flip-card-back">
                <div className="card-content">
                  <span className="text-top col s12"> {categoryfcs[currentCard].kanji} </span>
                    <br></br>
                    <p className=""> {categoryfcs[currentCard].eng} </p>
                    <br></br>
                    <div class="left-align">
                    <span className="">radicals</span>
                    <br></br>
                    <span className="card-title">
                        {categoryfcs && categoryfcs[currentCard] && categoryfcs[currentCard].radicals && flashcards &&
                            <div>
                              <span className="">radicals</span>
                              <span>radicals <br></br> {radarray}</span>
                            </div>
                        }
                      </span>
                    <br></br>
                    <span className="">mnemonic</span>
                    <br></br>
                    <span className="card-title">
                      {personalmnemonic &&<span>{personalmnemonic}</span>}
                    </span>
                    
                    <span className="card-title">
                      {!personalmnemonic && <span>{categoryfcs[currentCard].mnemonic}</span> }
                    </span>
                  
                    <div>
                      <div onClick={this.handleEditMnemClick}><i class="material-icons">edit</i></div>
                      { this.state.showMnemField ? 
                        <form onSubmit={this.handleMnemonicSubmit}>
                          <div class="col s12">
                            
                            <div class="input-field inline">
                              <input type="text" id="mnemonic" onChange={this.handleMnemonicChange}/>
                            </div>

                            <div className="input-field inline">
                              <button className="btn z-depth-0">Add</button>
                            </div>

                          </div>
                        </form>
                        : null
                      }
                    </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="row center" id="hardEasyKnapper">
              
                <button onClick={this.handleHard} className="hard-btn btn" id="Hard">Hard</button>

              
                <button onClick={this.handleEasy} className="easy-btn btn" id="Easy">Easy</button> 

             
          </div>
          </div>
        }
        

      </div>
      

        

      </div>
     
        
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCompletedFlashcards: (flashcard) => dispatch(addCompletedFlashcards(flashcard)),
    //removeCompletedFlashcards: (flashcard) => dispatch(removeCompletedFlashcards(flashcard)),
    updateUser: (flashcard) => dispatch(updateUser(flashcard)),
    updateusers: (flashcard) => dispatch(updateusers(flashcard)),
    loaduser: () => dispatch(loaduser()),
    replaceMnemonic: (newMnemonic, oldMnemonic, fcId) => dispatch(replaceMnemonic(newMnemonic, oldMnemonic, fcId)),
    updateMnemonic: (mnemonic, fcId) => dispatch(updateMnemonic(mnemonic, fcId))
  }
}
const mapStateToProps = (state) => {
  return {
    flashcards: state.firestore.ordered.flashcards, // gives an array of the flashcards.. flashcard property, we are accessing the flashcards from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
    auth: state.firebase.auth,
    mnemonics: state.firestore.ordered.mnemonics
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'flashcards' },
    { collection: 'decks' },
    { collection: 'users'},
    { collection: 'mnemonics'}
  ]),
  connect((state, props) => ({ 
    users: state.firestore.ordered.users
  }))
)(Flashcards)