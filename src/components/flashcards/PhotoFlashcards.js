import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; // used to connect to firestore
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { addCompletedFlashcards } from '../../store/actions/flashcardActions';
import ReactCardFlip from 'react-card-flip';
import { updateUser } from '../../store/actions/userActions';
import { updateusers } from '../../store/actions/userActions';
import { loaduser } from '../../store/actions/userActions';
import { updateMnemonic } from '../../store/actions/flashcardActions';
import { replaceMnemonic } from '../../store/actions/flashcardActions';
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

  

  handleHard = (e) => {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;

    let categoryfcs = flashcards.filter(f => f.deckid === id);
    let user = users.find(u => u.id === auth.uid);

    // seenFc -> flashcards som allerede er gått gjennom
    const seenFc = user.flashcardArray ? user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id) : [];

    if (!(seenFc.length === categoryfcs.length - 1)) {
      this.changeFc();
      let lastFc = categoryfcs.filter(elem => !seenFc.includes(elem.id));
      if(lastFc){
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        this.changeFc();
      }
      return;
    }else if(seenFc.length === categoryfcs.length - 1){
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      document.getElementById("but1").style.backgroundColor = "white";
      document.getElementById("but2").style.backgroundColor = "white";
      document.getElementById("but3").style.backgroundColor = "white";
      document.getElementById("but4").style.backgroundColor = "white";
    }
  }

  handleEasy = (e) => {
    const { auth, users, flashcards, match: { params: { id } } } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);
    let user = users.find(u => u.id === auth.uid);
    const seenFc = user.flashcardArray ? user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id) : [];
  
    let remainingFc = categoryfcs.filter(elem => !seenFc.includes(elem.id));

    // dersom kun ett kort igjen og det er det man er på -> legg til i db og gå ut av deck
    if((seenFc.length === categoryfcs.length - 1) && (remainingFc[0].id === categoryfcs[currentCard].id)){
      this.props.updateUser(categoryfcs[currentCard].id);
      window.location.href = '/';
      return;
    }

    // sjekker om er mer enn ett usett flashcard igjen eller om er ett igjen men som ikke er det gjeldende
    if ((!(seenFc.length === categoryfcs.length - 1)) || ((seenFc.length === categoryfcs.length - 1) && (!seenFc.includes(remainingFc)))) {
      this.props.updateUser(categoryfcs[currentCard].id); 
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      this.changeFc(); 
      return;

    }
    
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

    let user = users.find(u => u.id === auth.uid);
    let gjeldendeFlashcard = categoryfcs[currentCard];
    let gjeldendeMnem = "";
    for(let i = 0; i < mnemonics.length; ++i){
      if(gjeldendeFlashcard.id === mnemonics[i].fcId && mnemonics[i].userId === user.id){
        gjeldendeMnem = mnemonics[i];
        for(let j = 0; j < user.mnemonicArr.length; j++){
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

    this.props.loaduser();

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



    // set found current number
    this.setState({
      currentCard: currentNumber
    });


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
    if (e.target.value === categoryfcs[currentCard].kanji) {
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      document.getElementById(buttonId).style.backgroundColor = "rgb(121,	196,	154)";
    } else if (e.target.value !== categoryfcs[currentCard].kanji){
      document.getElementById(buttonId).style.backgroundColor = "rgb(200,	67,	81)";
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
      /*
      if (user.flashcardArray
        && user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id).length === categoryfcs.length) {
        return (<div>Du har vært gjennom alle i denne kategorien <button onClick={() => window.location.href = '/'}>Gå tilbake</button>
          <button onClick={this.restartDeck} id="restartbutton">Start på nytt</button>
        </div>);
      }
      */
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
    if (!categoryfcs[currentCard]) return (<div></div>);

    return (
      <div className="pf-content">
        <div className="row">
        <div className="col s12">
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
        <div className="pfc-card center" key="front">
          <div><img className="content" src={categoryfcs[currentCard].pictureUrl} alt="current kanji" width="400rem" height="300rem" /></div>
            <div className="row">
              <button className="pfc-btn" onClick={this.handleFButton} id='but1' value={randomArray[0]}>{randomArray[0]}</button>
              <button className="pfc-btn" onClick={this.handleFButton} id='but2' value={randomArray[1]}>{randomArray[1]}</button>
                
            </div>
            <div className="row">
              <button className="pfc-btn" onClick={this.handleFButton} id='but3' value={randomArray[2]}>{randomArray[2]}</button>
              <button className="pfc-btn" onClick={this.handleFButton} id='but4' value={randomArray[3]}>{randomArray[3]}</button>  
            </div>
        </div>

        <div className="pfc-card" key="back">
          <div className="center">
          <span className="back-kan"> {categoryfcs[currentCard].kanji} </span>
          <br></br>
          <span className="back-eng"> {categoryfcs[currentCard].eng} </span>
          <br></br>
          </div>
          <br></br>
        
          <br></br>
         
          
          <div className="row">

            <div className="col pmnemdiv">
            <div className="row">
            <div className="col s10 back-h left-align">mnemonic</div>
          </div>
              <div className="pmnemtext">
                <span className="card-title">
                  {personalmnemonic &&<span>{personalmnemonic}</span>}
                </span>
                        
                <span className="card-title">
                  {!personalmnemonic && <span>{categoryfcs[currentCard].mnemonic}</span> }
                </span>
              </div>

              <form onSubmit={this.handleMnemonicSubmit}>
                <div className="row center pneminput">
                  
                  <div className="col s10 input-field inline">
                    <input placeholder="Write new mnemonic" type="text" id="mnemonic" onChange={this.handleMnemonicChange}/>
                  </div>

                  <div className="col s2 input-field inline right-align ">
                    <i onClick={this.handleMnemonicSubmit} className="material-icons">add_circle</i>
                  </div>

                </div>
            </form>
            </div>

            
          </div>


         
          
          <div className="center back-buttons">
            <button className="btn back-btn" onClick={this.handleHard} id="Hard">Hard</button>
            <button className="btn back-btn" onClick={this.handleEasy} id="Easy">Easy</button>
          </div>
        </div>
            
      </ReactCardFlip>
      </div>
      </div>
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
	};
};
const mapStateToProps = (state) => {
	return {
		flashcards: state.firestore.ordered.flashcards, // gives an array of the flashcards.. flashcard property, we are accessing the flashcards from the state in the flashcardReducer. We are grabbing this and attatching it to the flashcard property inside the props of this component (flashcard: )
		auth: state.firebase.auth,
		mnemonics: state.firestore.ordered.mnemonics
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'flashcards' },
		{ collection: 'decks' },
		{ collection: 'users' },
		{ collection: 'mnemonics' }
	]),
	connect((state, props) => ({
		users: state.firestore.ordered.users
	}))
)(PhotoFlashcards);
