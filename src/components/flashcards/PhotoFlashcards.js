/**
 * File representing a photoflashcard
 * @module PhotoFlashcard
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; // used to connect to firestore
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { addCompletedFlashcards } from '../../store/actions/flashcardActions';
import ReactCardFlip from 'react-card-flip';
import { updateUser } from '../../store/actions/userActions';
import { loaduser } from '../../store/actions/userActions';
import { addMnemonic } from '../../store/actions/flashcardActions';
import { replaceMnemonic } from '../../store/actions/flashcardActions';
import '../../CSS/photoflashcard.css';

/**
 * Photoflashcards compontent for flashcards where an image appears and the user chooses between four kanji.
 * @class
 */
class PhotoFlashcards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      bufferfc: [],
      isFlipped: false
    };
  }


  /**
   * @function
   */
  componentDidMount(){
    this.props.firestore.setListener({collection: 'users'})
  }

  /**
   * @function
   */
  componentWillUnmount(){
    this.props.firestore.unsetListener({collection: 'users'})
  }

  /**
   * Function for when the Hard button is clicked. When clicked, the flashcard will appear again at a random time in the deck until
   * easy button has been clicked. 
   * @function
   */
  handleHard = (e) => {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;

    let categoryfcs = flashcards.filter(f => f.deckid === id);
    let user = users.find(u => u.id === auth.uid);
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

  /**
   * Function for when the Easy button is clicked. Makes sure flashcard is added to user array so that it wont appear again in the deck
   * unless deck has been restarted. 
   * @function
   */
  handleEasy = (e) => {
    const { auth, users, flashcards, match: { params: { id } } } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);
    let user = users.find(u => u.id === auth.uid);
    const seenFc = user.flashcardArray ? user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id) : [];
  
    let remainingFc = categoryfcs.filter(elem => !seenFc.includes(elem.id));


    if((seenFc.length === categoryfcs.length - 1) && (remainingFc[0].id === categoryfcs[currentCard].id)){
      this.props.updateUser(categoryfcs[currentCard].id);
      window.location.href = '/home';
      return;
    }

    if ((!(seenFc.length === categoryfcs.length - 1)) || ((seenFc.length === categoryfcs.length - 1) && (!seenFc.includes(remainingFc)))) {
      this.props.updateUser(categoryfcs[currentCard].id); 
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      setTimeout(this.changeFc, 400);

      return;

    }
    
  }

  /**
   * Handles change in mnemonic inputfield
   * @function
   */
  handleMnemonicChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  /**
   * Function for submitting a new personal mnemonic.
   * @function
   */
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
      this.props.addMnemonic(this.state.mnemonic, categoryfcs[currentCard].id)
    }

    document.getElementById('mnemonic').value = '';

  }

  /**
   * Finds index of flashcard id. Used in changeFc function
   * @function
   */
  findIndexOfFcId = (categoryfcs, fcid) => {
    let value = categoryfcs.find((val) => {
      return (val.id === fcid)
    });
    return categoryfcs.indexOf(value);
  }

  /**
   * Finds flashcard by flashcardid. Used in changeFc function
   * @function
   */
  findFlashcardById = (id) => {
    const { flashcards } = this.props;
    return flashcards.find(f => f.id === id);
  }

  /**
   * Function for changing to a random flashcard. Makes sure to only show a new Kanji if all radicals
   * in said Kanji has been shown in previous flashcards. 
   * @function
   */
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

    this.setState({
      currentCard: currentNumber
    });

    document.getElementById("but1").style.backgroundColor = "white";
    document.getElementById("but2").style.backgroundColor = "white";
    document.getElementById("but3").style.backgroundColor = "white";
    document.getElementById("but4").style.backgroundColor = "white";
    document.getElementById('mnemonic').value = '';
  }

  /**
   * Method for handeling the buttons on the front of the photoflashcard. If correct button is clicked it will
   * turn green then the card will flip over. If wrong button is clicked the button will turn red. 
   * @function
   */
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

  /**
   * Method for getting an array of random kanji for the buttons on the photoflashcards
   * where one of them is the correct kanji. 
   * @function
   */
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
    
    if (!auth.uid) return <Redirect to='/' />;

    // Only show flashcards in current category
    let categoryfcs = [];
    if (flashcards) {
      categoryfcs = flashcards.filter(f => f.deckid === id)
    }

    let user;
    if (users) {
      user = users.find(u => u.id === auth.uid);
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

                  <div className="col s2 input-field inline right-align">
                    <i onClick={this.handleMnemonicSubmit} className="material-icons addmnembut">add_circle</i>
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

/**
 * Function for dispatching actions 
 * @function
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => {
	return {
		addCompletedFlashcards: (flashcard) => dispatch(addCompletedFlashcards(flashcard)),
		updateUser: (flashcard) => dispatch(updateUser(flashcard)),
		loaduser: () => dispatch(loaduser()),
		replaceMnemonic: (newMnemonic, oldMnemonic, fcId) => dispatch(replaceMnemonic(newMnemonic, oldMnemonic, fcId)),
		addMnemonic: (mnemonic, fcId) => dispatch(addMnemonic(mnemonic, fcId))
	};
};

/**
 * Function for getting data from the store
 * @function
 * @param {*} state 
 */
const mapStateToProps = (state) => {
	return {
		flashcards: state.firestore.ordered.flashcards, 
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
