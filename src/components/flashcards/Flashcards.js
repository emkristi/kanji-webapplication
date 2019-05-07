import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addCompletedFlashcards } from '../../store/actions/flashcardActions';
import { updateUser } from '../../store/actions/userActions';
import { loaduser } from '../../store/actions/userActions';
import { addMnemonic } from '../../store/actions/flashcardActions';
import { replaceMnemonic } from '../../store/actions/flashcardActions';
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

  /**
   * Function for submitting a new eprsonal mnemonic.
   */
  handleMnemonicSubmit = (e) => {
    const { mnemonics, users, auth, flashcards, match: { params: { id } } } = this.props;
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
    this.setState({showMnemField: false});
  }
  

  /**
   * Function for when the Hard button is clicked
   */
  handleHard = (e) => {
    const { flashcards, match: { params: { id } }, auth, users } = this.props;
    let categoryfcs = flashcards.filter(f => f.deckid === id);
    let user = users.find(u => u.id === auth.uid);
    const seenFc = user.flashcardArray ? user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id) : [];

    if (!(seenFc.length === categoryfcs.length - 1)) {
      this.changeFc();
    }else if(seenFc.length === categoryfcs.length - 1){
      return;
    }
  }

  /**
   * Function for when the Easy button is clicked
   */
  handleEasy = (e) => {
    const { flashcards, match: { params: { id } } } = this.props;
    const { auth, users } = this.props;
    const { currentCard } = this.state;

    let categoryfcs = flashcards.filter(val => val.deckid === id);
    let user = users.find(u => u.id === auth.uid);
    const seenFc = user.flashcardArray ? user.flashcardArray.filter(f => this.findFlashcardById(f).deckid === id) : [];
    let remainingFc = categoryfcs.filter(elem => !seenFc.includes(elem.id));

    // if only one card left -> added to user in database then returns to deck page when button is clicked
    if((seenFc.length === categoryfcs.length - 1) && (remainingFc[0].id === categoryfcs[currentCard].id)){
      this.props.updateUser(categoryfcs[currentCard].id);
      window.location.href = '/';
      return;
    }

    // if any cards are left -> adds to user then changes to next when button is clicked
    if ((!(seenFc.length === categoryfcs.length - 1)) || ((seenFc.length === categoryfcs.length - 1) && (!seenFc.includes(remainingFc)))) {
      this.props.updateUser(categoryfcs[currentCard].id); 
      this.changeFc(); 
      return;
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

  /**
   * Function for changing to random flashcard. Makes sure to only show Kanji if all radicals
   * in said Kanji has been shown. 
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
      currentCard: currentNumber,
      showMnemField: false
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
		}

		let personalmnemonic;
		if (users && mnemonics) {
			user = users.find((u) => u.id === auth.uid);
			for (let i = 0; i < mnemonics.length; ++i) {
				if (user.mnemonicArr && categoryfcs[currentCard].id === mnemonics[i].fcId && user.id === mnemonics[i].userId) {
					personalmnemonic = mnemonics[i].mnemonic;
				}
			}
		}

		let radarray = [];

		if (categoryfcs && categoryfcs[currentCard] && categoryfcs[currentCard].radicals && flashcards) {
			let rad = categoryfcs[currentCard].radicals;
			radarray = rad.map((r) => flashcards.find((f) => f.id === r.id).kanji);
		}

		// Error handling
		if (!categoryfcs[currentCard]) return <div>Not defined</div>;

		return (
			<div className="flashcard-content">
				<div className="row">
					<div className="col s12">
						{categoryfcs.length > 0 && (
							<div className="flip-card">
								<div className="flip-card-inner">
									<div className="flip-card-front valign-wrapper">
										<div className="card-content">
											<span className=""> {categoryfcs[currentCard].kanji} </span>

										</div>
									</div>

									<div className="flip-card-back">
										<div className="card-content">
											<span className="back-kan"> {categoryfcs[currentCard].kanji} </span>
											<br />
											<span className="back-eng"> {categoryfcs[currentCard].eng} </span>
											<br />
											<br />
											<div className="row">
                        {!categoryfcs[currentCard].strokeOrderUrl && (
                          <div>
                          <div className="col s12 left-align">
                            <div className="back-h">
                              radicals
                            </div>
                          </div>
                          <div className="col s12 left-align">
                            {categoryfcs && categoryfcs[currentCard] && categoryfcs[currentCard].radicals && flashcards &&
                              <p>
                                {radarray.map(radical => {
                                  return(
                                    <span key={radical}>{radical } {" "} </span>
                                  )
                                })}
                              </p>
                            }

                            {!(categoryfcs && categoryfcs[currentCard] && categoryfcs[currentCard].radicals && flashcards) &&
                              <p>
                                <span key={categoryfcs[currentCard].kanji}>
                                {categoryfcs[currentCard].kanji}</span>
                              </p>
                            }
                          </div>
                        </div>
                        )}

                        {categoryfcs[currentCard].strokeOrderUrl && (
                          <div>
                            <div className="col s8 left-align">
                              <div className="back-h">
                                radicals
                              </div>
                            <div className="left-align ">
                              {categoryfcs && categoryfcs[currentCard] && categoryfcs[currentCard].radicals && flashcards &&
                                <p>{radarray.map(radical => {
                                  return(
                                    <span key={radical}>{radical } {" "} </span>
                                  )})}
                                </p>
                              }

                              {!(categoryfcs && categoryfcs[currentCard] && categoryfcs[currentCard].radicals && flashcards) &&
                                <p><span>
                                  {categoryfcs[currentCard].kanji}
                                </span></p>
                              }
                            </div>
                          </div>

														<div className="col s4 back-h right-align back-h">
															stroke order
															<img className="strokePicture" src={categoryfcs[currentCard].strokeOrderUrl} alt="stroke order" width="100px" height="100px"
															/>
														</div>
													</div>
												)}
											</div>

											<div className="row">
												<div className="col s10 back-h left-align">mnemonic</div>
												<div className="col s2 back-h right-align editmnembut">
													<i onClick={this.handleEditMnemClick} className="material-icons">
														edit
													</i>
												</div>
											</div>

											<div className="row">
												<div className="col mnemdiv">
													<span className="card-title">
														{personalmnemonic && <span>{personalmnemonic}</span>}
													</span>

													<span className="card-title">
														{!personalmnemonic && (
															<span>{categoryfcs[currentCard].mnemonic}</span>
														)}
													</span>
												</div>
											</div>

											<div>
												{this.state.showMnemField ? (
													<form onSubmit={this.handleMnemonicSubmit}>
														<div className="row center">
															<div className="col s10 input-field inline">
																<input
																	placeholder="Write new mnemonic"
																	type="text"
																	id="mnemonic"
																	onChange={this.handleMnemonicChange}
																/>
															</div>

															<div className="col s2 input-field inline right-align">
																<i onClick={this.handleMnemonicSubmit} className="material-icons addmnembut">add_circle</i>
															</div>
														</div>
													</form>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="row center" id="hardEasyKnapper">
							<button onClick={this.handleHard} className="hard-btn btn" id="Hard">
								Hard
							</button>
							<button onClick={this.handleEasy} className="easy-btn btn" id="Easy">
								Easy
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addCompletedFlashcards: (flashcard) => dispatch(addCompletedFlashcards(flashcard)),
		updateUser: (flashcard) => dispatch(updateUser(flashcard)),
		loaduser: () => dispatch(loaduser()),
		replaceMnemonic: (newMnemonic, oldMnemonic, fcId) => dispatch(replaceMnemonic(newMnemonic, oldMnemonic, fcId)),
		addMnemonic: (mnemonic, fcId) => dispatch(addMnemonic(mnemonic, fcId))
	};
};
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
)(Flashcards);
