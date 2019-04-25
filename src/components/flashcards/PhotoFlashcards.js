import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' // used to connect to firestore
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'
import { addCompletedFlashcards } from '../../store/actions/flashcardActions'
import { removeCompletedFlashcards } from '../../store/actions/flashcardActions'
import ReactCardFlip from 'react-card-flip';
import { updateUser } from '../../store/actions/userActions'
import { updateusers } from '../../store/actions/userActions'
import { loaduser } from '../../store/actions/userActions'
import { updateMnemonic } from '../../store/actions/flashcardActions'
import { replaceMnemonic } from '../../store/actions/flashcardActions'
import '../../CSS/photoflashcard.css';

class PhotoFlashcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      bufferfc: [],
      isFlipped: false
    };
  }

  componentDidMount(){
    this.props.firestore.setListener({collection: 'users'})
  }

  componentWillUnmount(){
    this.props.firestore.unsetListener({collection: 'users'})
  }

  flipClick = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    console.log("flappy floppy?");
  }

  handleHard = (e) => {
    this.changeFc();
  }

  handleEasy = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);
    
    this.props.updateUser(categoryfcs[currentCard].id);

    this.changeFc();

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
        gjeldendeMnem = mnemonics[i];
        console.log("gjeldende", gjeldendeMnem);
        for(let j = 0; j < user.mnemonicArr.length; j++){
          console.log(gjeldendeMnem.id, user.mnemonicArr[j]);
          if(user.mnemonicArr[j] === gjeldendeMnem.id){
            this.props.replaceMnemonic(this.state.mnemonic, gjeldendeMnem, gjeldendeFlashcard.id);
          } 
        }
      } 
    }

    if(gjeldendeMnem === ""){
      this.props.updateMnemonic(this.state.mnemonic, categoryfcs[currentCard].id)
    }
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
    const { currentCard, bufferfc } = this.state;

    let categoryfcs = flashcards.filter(f => f.deckid === id);
    let user = users.find(u => u.id === auth.uid);
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


    // set found current number
    this.setState({
      currentCard: currentNumber
    });

    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));

    document.getElementById("but1").style.backgroundColor = "white";
    document.getElementById("but2").style.backgroundColor = "white";
    document.getElementById("but3").style.backgroundColor = "white";
    document.getElementById("but4").style.backgroundColor = "white";


  }

  handleFButton = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { currentCard } = this.state;
    let categoryfcs = flashcards.filter(val => val.deckid === id);

    var buttonId = e.target.id;
    console.log(buttonId);

    if (e.target.value === categoryfcs[currentCard].kanji) {
      console.log("RIKTIG!");
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));

      document.getElementById(buttonId).style.backgroundColor = "green";
      return (<div>heyo!</div>);
      // dersom denne if-en skjer bør knappen bli grønn eller noe slik

    } else if (e.target.value !== categoryfcs[currentCard].kanji){
      document.getElementById(buttonId).style.backgroundColor = "red";
    }

    
  }

  randomKanjiArray = () => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { currentCard } = this.state;

    let categoryfcs;
    var arr = [];
    if(flashcards){
      categoryfcs = flashcards.filter(val => val.deckid === id);
      arr.push(categoryfcs[currentCard].kanji);
    }
    
    if(categoryfcs){
      while (arr.length < 4) {
        var r = (Math.round(Math.random() * (categoryfcs.length - 1)));
  
        if (!arr.includes(categoryfcs[r].kanji)) {
          arr.push(categoryfcs[r].kanji);
        }
      }
      arr.sort(function () {
        return .5 - Math.random();
      });
  
      return arr;

    }
    
    
  }

  render() {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;
    const { currentCard } = this.state;
    const { mnemonics } = this.props;


    var randomArray = this.randomKanjiArray();
    // console.log("r", randomArray);

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
        return (<div>Du har vært gjennom alle i denne kategorien <button onClick={() => window.location.href = '/'}>Gå tilbake</button>
          <button onClick={this.restartDeck} id="restartbutton">Start på nytt</button>
        </div>);
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

    // Error handling
    if (!categoryfcs[currentCard]) return (<div>Not defined</div>);

    return (
      <div className="container center">
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
        <div className="pfc-card" key="front">
          <div><img className="content" src={categoryfcs[currentCard].pictureUrl} alt="current kanji" width="200px" height="200px" /></div>
            <div className="row">
                <button className="pfc-btn" onClick={this.handleFButton} id='but1' value={randomArray[0]}>{randomArray[0]}</button>
                <button className="pfc-btn" onClick={this.handleFButton} id='but2' value={randomArray[1]}>{randomArray[1]}</button>
                <button className="pfc-btn" onClick={this.handleFButton} id='but3' value={randomArray[2]}>{randomArray[2]}</button>
                <button className="pfc-btn" onClick={this.handleFButton} id='but4' value={randomArray[3]}>{randomArray[3]}</button>  
          </div>
        </div>

        <div className="pfc-card" key="back">
          <div>{categoryfcs[currentCard].kanji}</div>
          <div>{categoryfcs[currentCard].eng}</div>
          

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
                </form>: null
              }
            </div>
            <div className="pfbuttons">
            <button onClick={this.handleHard} id="Hard">Hard</button>
            <button onClick={this.handleEasy} id="Easy">Easy</button>
          </div>
        </div>
            
      </ReactCardFlip>
          
      
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCompletedFlashcards: (flashcard) => dispatch(addCompletedFlashcards(flashcard)),
    //removeCompletedFlashcards: (flashcard) => dispatch(removeCompletedFlashcards(flashcard))
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
)(PhotoFlashcards)