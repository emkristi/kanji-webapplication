(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{186:function(e,a,t){},250:function(e,a,t){},251:function(e,a,t){},262:function(e,a,t){e.exports=t(551)},267:function(e,a,t){},519:function(e,a,t){},520:function(e,a,t){},551:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(257),i=t.n(c),l=(t(267),t(7)),s=t(8),o=t(10),m=t(9),d=t(11),u=t(554),f=t(557),h=t(556),p=t(12),E=t(48),g=t(553),v=Object(p.b)(function(e){return{auth:e.firebase.auth,profile:e.firebase.profile}},function(e){return{signOut:function(){return e(function(e,a,t){var n=(0,t.getFirebase)();n.auth().signOut().then(function(){e({type:"SIGNOUT_SUCCESS"}),n.logout()})})}}})(function(e){var a=e.auth;return r.a.createElement("div",null,!("/start"===window.location.pathname)&&r.a.createElement("div",null,r.a.createElement("nav",{className:"transparent z-depth-0"},r.a.createElement("div",{className:"nav-wrapper"},a.uid&&r.a.createElement(g.a,{to:"/"},r.a.createElement("img",{className:"navlogo",src:"https://firebasestorage.googleapis.com/v0/b/kanjiapp-8f121.appspot.com/o/LOGOLITENNY.jpg?alt=media&token=64293fe7-f33f-485b-8177-f7a4e8ffe6ab",width:"60rem",alt:"logo"})),!a.uid&&r.a.createElement("a",{href:"/start"},r.a.createElement("img",{className:"navlogo",src:"img/LOGOLITENNY.jpg",width:"60rem",alt:"logo"})),r.a.createElement("ul",{className:"right"},a.uid&&r.a.createElement(E.Dropdown,{trigger:r.a.createElement("div",{className:"brand-logo right"},r.a.createElement("i",{className:"right material-icons md-36"},"menu")),options:{coverTrigger:!1}},r.a.createElement(g.a,{to:"/howto",className:"navbarlinks"},"How to use"),r.a.createElement(g.a,{to:"/about",className:"navbarlinks"},"Credits"),r.a.createElement(g.a,{to:"/start",onClick:e.signOut,className:"navbarlinks"},"Log out")),!a.uid&&r.a.createElement(E.Dropdown,{trigger:r.a.createElement("div",{className:"brand-logo right"},r.a.createElement("i",{className:"material-icons md-36"},"menu")),options:{coverTrigger:!1}},r.a.createElement(g.a,{to:"/signup",className:"navbarlinks"},"Sign up"),r.a.createElement(g.a,{to:"/signin",className:"navbarlinks"},"Log in"),r.a.createElement(g.a,{to:"/about",className:"navbarlinks"},"Credits")))))))}),b=t(31),N=t(555),k=t(58),O=t.n(k),y=(t(186),function(e){function a(){var e,t;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=Object(o.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(r))))._isMounted=!1,t.state={email:"",password:"",isSignedIn:!1,name:"",userId:""},t.uiConfig={signInFlow:"popup",callbacks:{signInSuccessWithAuthResult:function(){return!1}}},t.componentDidMount=function(){O.a.auth().onAuthStateChanged(function(e){t.setState({isSignedIn:!!e})})()},t.handleChange=function(e){t.setState(Object(b.a)({},e.target.id,e.target.value))},t.handleSubmit=function(e){e.preventDefault(),t.props.signIn(t.state)},t}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this.props,a=e.authError;return e.auth.uid?r.a.createElement(N.a,{to:"/"}):r.a.createElement("div",{className:"auth-container"},r.a.createElement("div",{className:"row center"},r.a.createElement("div",{className:"auth-title"},"Log in"),r.a.createElement("form",{className:"auth-content center",onSubmit:this.handleSubmit},r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"auth-input"},r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",required:!0,onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",required:!0,onChange:this.handleChange}))),r.a.createElement("br",null),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn"},"Log in"),r.a.createElement("div",{className:"red-text center"},a?r.a.createElement("p",null,a):null)),r.a.createElement("div",{className:"auth-link"},r.a.createElement("p",null,"Dont have a user? Create one ",r.a.createElement(g.a,{to:"/signup"},"here")," ")))))}}]),a}(n.Component)),w=Object(p.b)(function(e){return{authError:e.auth.authError,auth:e.firebase.auth}},function(e){return{signIn:function(a){return e((t=a,function(e,a,n){(0,n.getFirebase)().auth().signInWithEmailAndPassword(t.email,t.password).then(function(){e({type:"LOGIN_SUCCESS"})}).catch(function(a){e({type:"LOGIN_ERROR",err:a})})}));var t}}})(y),C=function(e){function a(){var e,t;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=Object(o.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(r)))).state={email:"",password:"",firstName:"",lastName:""},t.handleChange=function(e){t.setState(Object(b.a)({},e.target.id,e.target.value))},t.handleSubmit=function(e){e.preventDefault(),t.props.signUp(t.state)},t}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e=this.props,a=e.authError;return e.auth.uid?r.a.createElement(N.a,{to:"/howto"}):r.a.createElement("div",null,r.a.createElement("div",{className:"row",margin:"30px"},r.a.createElement("div",{className:"auth-container center"},r.a.createElement("div",{className:"auth-title"},"Sign Up"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"auth-input"},r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"email",id:"email",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",id:"password",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"firstName"},"First Name"),r.a.createElement("input",{type:"text",id:"firstName",onChange:this.handleChange})),r.a.createElement("div",{className:"input-field"},r.a.createElement("label",{htmlFor:"lastName"},"Last Name"),r.a.createElement("input",{type:"text",id:"lastName",onChange:this.handleChange}))),r.a.createElement("div",{className:"input-field"},r.a.createElement("button",{className:"btn"},"Sign up"),r.a.createElement("div",{className:"red-text center"},a?r.a.createElement("p",null,a):null)),r.a.createElement("div",{className:"auth-link"},r.a.createElement("p",null,"Already have a user? Click ",r.a.createElement(g.a,{to:"/signin"},"here")," to sign in"))))))}}]),a}(n.Component),j=Object(p.b)(function(e){return{auth:e.firebase.auth,authError:e.auth.authError}},function(e){return{signUp:function(a){return e(function(e){return function(a,t,n){var r=n.getFirebase,c=n.getFirestore,i=r(),l=c();i.auth().createUserWithEmailAndPassword(e.email,e.password).then(function(a){return l.collection("users").doc(a.user.uid).set({firstName:e.firstName,lastName:e.lastName,initials:e.firstName[0]+e.lastName[0],flashcardArray:[]})}).then(function(){a({type:"SIGNUP_SUCCESS"})}).catch(function(e){a({type:"SIGNUP_ERROR",err:e})})}}(a))}}})(C),S=t(22),I=t(19),A=(t(250),function(e){var a=e.deck;return r.a.createElement("div",null,r.a.createElement("h3",null,a.title),r.a.createElement("p",{className:"decktypetxt"},a.type))}),R=function(e){return function(a,t,n){var r=(0,n.getFirestore)(),c=t().firebase.auth.uid;r.collection("users").doc(c).update({flashcardArray:r.FieldValue.arrayUnion(e)}).then(function(){a({type:"ADD_COMPLETED_FLASHCARDS",flashcardId:e})}).catch(function(e){a({type:"ADD_COMPLETED_FLASHCARDS_ERROR",err:e})})}},F=function(e,a){return function(t,n,r){var c=(0,r.getFirestore)(),i=n().firebase.auth.uid,l=c.collection("mnemonics").doc();l.set({mnemonic:e,fcId:a,userId:i}).then(function(){t({type:"ADD_MNEMONIC",newMnemonic:e})}).catch(function(e){t({type:"ADD_MNEMONIC_ERROR",err:e})}),c.collection("users").doc(i).update({mnemonicArr:c.FieldValue.arrayUnion(l.id)}).then(function(){t({type:"ADD_MNEMONIC_ARR"})}).catch(function(e){t({type:"ADD_MNEMONIC_ARR_ERROR",err:e})})}},M=function(e,a,t){return function(n,r,c){var i=(0,c.getFirestore)(),l=r().firebase.auth.uid,s=a.id;i.collection("mnemonics").doc(s).set({mnemonic:e,fcId:t,userId:l}).then(function(){n({type:"REPLACE_MNEMONIC",newMnemonic:e})}).catch(function(e){n({type:"REPLACE_MNEMONIC_ERROR",err:e})})}},_=function(e){function a(){var e,t;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=Object(o.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(r)))).restartDeck=function(e){return function(a){a.preventDefault();for(var n=0;n<e.length;++n)t.props.removeCompletedFlashcards(e[n].id)}},t}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){var e,a=this,t=this.props,n=t.decks,c=t.flashcards,i=t.auth,l=t.users;return l&&(e=l.find(function(e){return e.id===i.uid})),i.uid?r.a.createElement("div",{className:"frontpage-content center-align"},r.a.createElement("div",{className:"row"},c&&e&&n&&n.map(function(t){var n,i=c.filter(function(e){return e.deckid===t.id}),l=i.filter(function(e){return""===e.radicals}),s=i.filter(function(e){return""!==e.radicals});return(n=null==e.flashcardArray?c:c.filter(function(a){return a.deckid===t.id&&-1===e.flashcardArray.indexOf(a.id)})).length>0&&"Images"===t.type?r.a.createElement("div",{key:t.id,className:"col s12 m6 l6"},r.a.createElement(g.a,{to:"Images"===t.type?"/img/"+t.id:"/"+t.id,key:t.id,id:"link"},r.a.createElement("div",{className:"deck not-completed"},r.a.createElement("div",{className:"info-dropdown"},r.a.createElement(E.Dropdown,{className:"dropdown-content dropdown-content-deck",options:{belowOrigin:!0,hover:!0,closeOnClick:!0},trigger:r.a.createElement("i",{className:"material-icons right"},"info_outline")},r.a.createElement("span",{className:"word-list-title"},"KANJI IN DECK"),l.map(function(e){return r.a.createElement("span",{key:e},e.kanji," - ",e.eng)}))),r.a.createElement("div",{className:"deck-content"},r.a.createElement(A,{deck:t}),r.a.createElement("p",{className:"completionstat"},i.length," cards"))))):n.length>0?r.a.createElement("div",{key:t.id,className:"col s12 m6 l6"},r.a.createElement(g.a,{to:"Images"===t.type?"/img/"+t.id:"/"+t.id,key:t.id,id:"link"},r.a.createElement("div",{className:"deck not-completed"},r.a.createElement("div",{className:"info-dropdown"},r.a.createElement(E.Dropdown,{className:"dropdown-content dropdown-content-deck",options:{belowOrigin:!0,hover:!0,closeOnClick:!0},trigger:r.a.createElement("i",{className:"material-icons right"},"info_outline")},r.a.createElement("span",{className:"word-list-title"},"KANJI IN DECK"),s.map(function(e){return r.a.createElement("span",{key:e},e.kanji," - ",e.eng)}),r.a.createElement(E.Divider,null),r.a.createElement("span",{className:"word-list-title"},"RADICALS IN DECK"),l.map(function(e){return r.a.createElement("span",{key:e},e.kanji," - ",e.eng)}))),r.a.createElement("div",{className:"deck-content"},r.a.createElement(A,{deck:t}),r.a.createElement("p",{className:"completionstat"},i.length," cards"))))):r.a.createElement("div",{key:t.id,className:"col s12 m6 l6"},r.a.createElement("div",{className:"deck completed"},r.a.createElement("div",{className:"deck-content-comp"},r.a.createElement(A,{className:"col s12",deck:t}),r.a.createElement("div",{onClick:a.restartDeck(i),className:"btn-floating btn-large waves-effect deck-btn"},r.a.createElement("i",{className:"material-icons"},"replay")))))}))):r.a.createElement(N.a,{to:"/signin"})}}]),a}(n.Component),D=Object(I.d)(Object(p.b)(function(e){return{decks:e.firestore.ordered.decks,flashcards:e.firestore.ordered.flashcards,auth:e.firebase.auth,users:e.firestore.ordered.users}},function(e){return{removeCompletedFlashcards:function(a){return e((t=a,function(e,a,n){var r=(0,n.getFirestore)(),c=a().firebase.auth.uid,i=t;r.collection("users").doc(c).update({flashcardArray:r.FieldValue.arrayRemove(i)}).then(function(){e({type:"REMOVE_COMPLETED_FLASHCARDS",flashcardid:t})}).catch(function(a){e({type:"REMOVE_COMPLETED_FLASHCARDS_ERROR",err:a})})}));var t}}}),Object(S.firestoreConnect)([{collection:"decks"}]),Object(S.firestoreConnect)([{collection:"flashcards"}]),Object(S.firestoreConnect)([{collection:"users"}]))(_),L=t(111),U=function(e){return function(a,t,n){var r=(0,n.getFirestore)(),c=t().firebase.auth.uid;r.collection("users").doc(c).onSnapshot(function(e){}),r.collection("users").doc(c).update({flashcardArray:r.FieldValue.arrayUnion(e)}).then(function(){a({type:"UPDATE_USER",flashcardId:e})}).catch(function(e){a({type:"UPDATE_USER_ERROR",err:e})})}},T=(t(519),function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(o.a)(this,Object(m.a)(a).call(this,e))).handleEditMnemClick=function(e){t.setState({showMnemField:!0})},t.handleMnemonicChange=function(e){e.preventDefault(),t.setState(Object(b.a)({},e.target.id,e.target.value))},t.handleMnemonicSubmit=function(e){var a=t.props,n=a.mnemonics,r=a.users,c=a.auth,i=a.flashcards,l=a.match.params.id,s=t.state.currentCard,o=i.filter(function(e){return e.deckid===l});e.preventDefault();for(var m=r.find(function(e){return e.id===c.uid}),d=o[s],u="",f=0;f<n.length;++f)if(d.id===n[f].fcId&&n[f].userId===m.id){u=n[f];for(var h=0;h<m.mnemonicArr.length;h++)m.mnemonicArr[h]===u.id&&t.props.replaceMnemonic(t.state.mnemonic,u,d.id)}""===u&&t.props.addMnemonic(t.state.mnemonic,o[s].id),t.setState({showMnemField:!1})},t.handleHard=function(e){var a=t.props,n=a.flashcards,r=a.match.params.id,c=a.auth,i=a.users,l=n.filter(function(e){return e.deckid===r}),s=i.find(function(e){return e.id===c.uid}),o=s.flashcardArray?s.flashcardArray.filter(function(e){return t.findFlashcardById(e).deckid===r}):[];if(o.length!==l.length-1)t.changeFc();else if(o.length===l.length-1)return},t.handleEasy=function(e){var a=t.props,n=a.flashcards,r=a.match.params.id,c=t.props,i=c.auth,l=c.users,s=t.state.currentCard,o=n.filter(function(e){return e.deckid===r}),m=l.find(function(e){return e.id===i.uid}),d=m.flashcardArray?m.flashcardArray.filter(function(e){return t.findFlashcardById(e).deckid===r}):[],u=o.filter(function(e){return!d.includes(e.id)});return d.length===o.length-1&&u[0].id===o[s].id?(t.props.updateUser(o[s].id),void(window.location.href="/")):d.length!==o.length-1||d.length===o.length-1&&!d.includes(u)?(t.props.updateUser(o[s].id),void t.changeFc()):void 0},t.findIndexOfFcId=function(e,a){var t=e.find(function(e){return e.id===a});return e.indexOf(t)},t.findFlashcardById=function(e){return t.props.flashcards.find(function(a){return a.id===e})},t.changeFc=function(e){var a=t.props,n=a.flashcards,r=a.match.params.id,c=a.auth,i=a.users,l=t.state,s=l.currentCard,o=l.bufferfc,m=n.filter(function(e){return e.deckid===r}),d=i.find(function(e){return e.id===c.uid});t.props.loaduser();var u=0;if(o.length>0)u=t.findIndexOfFcId(m,o[0]),o.length>1?t.setState({bufferfc:o.splice(1,o.length-1)}):t.setState({bufferfc:[]});else for(var f=!0;f;)if(u=Math.round(Math.random()*(m.length-1)),!(d.flashcardArray&&d.flashcardArray.includes(m[u].id)||u===s)){var h=m[u].radicals;if(h.length>0){for(var p=[],E=0;E<h.length;E++)d.flashcardArray&&d.flashcardArray.includes(h[E].id)||s===t.findIndexOfFcId(m,h[E].id)||p.push(h[E].id);if(p.length>0){var g=m[u];u=t.findIndexOfFcId(m,p[0]);for(var v=[],b=1;b<p.length;b++)v.push(p[b]);v.push(g.id),t.setState({bufferfc:[].concat(Object(L.a)(o),v)})}}f=!1}t.setState({currentCard:u,showMnemField:!1})},t.state={currentCard:0,bufferfc:[],fcArray:[],mnemonic:"",showMnemField:!1},t}return Object(d.a)(a,e),Object(s.a)(a,[{key:"componentDidMount",value:function(){this.props.firestore.setListener({collection:"users"})}},{key:"componentWillUnmount",value:function(){this.props.firestore.unsetListener({collection:"users"})}},{key:"render",value:function(){var e=this.props,a=e.flashcards,t=e.match.params.id,n=e.auth,c=e.users,i=this.state.currentCard,l=this.props.mnemonics;if(!n.uid)return r.a.createElement(N.a,{to:"/signin"});var s,o,m=[];if(a&&(m=a.filter(function(e){return e.deckid===t})),c&&(s=c.find(function(e){return e.id===n.uid})),c&&l){s=c.find(function(e){return e.id===n.uid});for(var d=0;d<l.length;++d)s.mnemonicArr&&m[i].id===l[d].fcId&&s.id===l[d].userId&&(o=l[d].mnemonic)}var u=[];m&&m[i]&&m[i].radicals&&a&&(u=m[i].radicals.map(function(e){return a.find(function(a){return a.id===e.id}).kanji}));return m[i]?r.a.createElement("div",{className:"flashcard-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12"},m.length>0&&r.a.createElement("div",{className:"flip-card"},r.a.createElement("div",{className:"flip-card-inner"},r.a.createElement("div",{className:"flip-card-front valign-wrapper"},r.a.createElement("div",{className:"card-content"},r.a.createElement("span",{className:""}," ",m[i].kanji," "))),r.a.createElement("div",{className:"flip-card-back"},r.a.createElement("div",{className:"card-content"},r.a.createElement("span",{className:"back-kan"}," ",m[i].kanji," "),r.a.createElement("br",null),r.a.createElement("span",{className:"back-eng"}," ",m[i].eng," "),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},!m[i].strokeOrderUrl&&r.a.createElement("div",null,r.a.createElement("div",{className:"col s12 left-align"},r.a.createElement("div",{className:"back-h"},"radicals")),r.a.createElement("div",{className:"col s12 left-align"},m&&m[i]&&m[i].radicals&&a&&r.a.createElement("p",null,u.map(function(e){return r.a.createElement("span",{key:e},e)})),!(m&&m[i]&&m[i].radicals&&a)&&r.a.createElement("p",null,r.a.createElement("span",{key:m[i].kanji},m[i].kanji)))),m[i].strokeOrderUrl&&r.a.createElement("div",null,r.a.createElement("div",{className:"col s8 left-align"},r.a.createElement("div",{className:"back-h"},"radicals"),r.a.createElement("div",{className:"left-align "},m&&m[i]&&m[i].radicals&&a&&r.a.createElement("p",null,u.map(function(e){return r.a.createElement("span",{key:e},e," "," "," ")})),!(m&&m[i]&&m[i].radicals&&a)&&r.a.createElement("p",null,r.a.createElement("span",null,m[i].kanji," ")))),r.a.createElement("div",{className:"col s4 back-h right-align back-h"},"stroke order",r.a.createElement("img",{className:"strokePicture",src:m[i].strokeOrderUrl,alt:"stroke order",width:"100px",height:"100px"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s10 back-h left-align"},"mnemonic"),r.a.createElement("div",{className:"col s2 back-h right-align editmnembut"},r.a.createElement("i",{onClick:this.handleEditMnemClick,className:"material-icons"},"edit"))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col mnemdiv"},r.a.createElement("span",{className:"card-title"},o&&r.a.createElement("span",null,o)),r.a.createElement("span",{className:"card-title"},!o&&r.a.createElement("span",null,m[i].mnemonic)))),r.a.createElement("div",null,this.state.showMnemField?r.a.createElement("form",{onSubmit:this.handleMnemonicSubmit},r.a.createElement("div",{className:"row center"},r.a.createElement("div",{className:"col s10 input-field inline"},r.a.createElement("input",{placeholder:"Write new mnemonic",type:"text",id:"mnemonic",onChange:this.handleMnemonicChange})),r.a.createElement("div",{className:"col s2 input-field inline right-align"},r.a.createElement("i",{onClick:this.handleMnemonicSubmit,className:"material-icons addmnembut"},"add_circle")))):null))))),r.a.createElement("div",{className:"row center",id:"hardEasyKnapper"},r.a.createElement("button",{onClick:this.handleHard,className:"hard-btn btn",id:"Hard"},"Hard"),r.a.createElement("button",{onClick:this.handleEasy,className:"easy-btn btn",id:"Easy"},"Easy"))))):r.a.createElement("div",null)}}]),a}(n.Component)),x=Object(I.d)(Object(p.b)(function(e){return{flashcards:e.firestore.ordered.flashcards,auth:e.firebase.auth,mnemonics:e.firestore.ordered.mnemonics}},function(e){return{addCompletedFlashcards:function(a){return e(R(a))},updateUser:function(a){return e(U(a))},loaduser:function(){return e(function(e,a,t){(0,t.getFirestore)().collection("users").get().then(function(e){e.docs.forEach(function(e){return e.data()})})})},replaceMnemonic:function(a,t,n){return e(M(a,t,n))},addMnemonic:function(a,t){return e(F(a,t))}}}),Object(S.firestoreConnect)([{collection:"flashcards"},{collection:"decks"},{collection:"users"},{collection:"mnemonics"}]),Object(p.b)(function(e,a){return{users:e.firestore.ordered.users}}))(T),B=t(260),P=t.n(B),H=(t(520),function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(o.a)(this,Object(m.a)(a).call(this,e))).handleHard=function(e){var a=t.props,n=a.flashcards,r=a.match.params.id,c=a.auth,i=a.users,l=n.filter(function(e){return e.deckid===r}),s=i.find(function(e){return e.id===c.uid}),o=s.flashcardArray?s.flashcardArray.filter(function(e){return t.findFlashcardById(e).deckid===r}):[];if(o.length!==l.length-1)return t.changeFc(),void(l.filter(function(e){return!o.includes(e.id)})&&(t.setState(function(e){return{isFlipped:!e.isFlipped}}),t.changeFc()));o.length===l.length-1&&(t.setState(function(e){return{isFlipped:!e.isFlipped}}),document.getElementById("but1").style.backgroundColor="white",document.getElementById("but2").style.backgroundColor="white",document.getElementById("but3").style.backgroundColor="white",document.getElementById("but4").style.backgroundColor="white")},t.handleEasy=function(e){var a=t.props,n=a.auth,r=a.users,c=a.flashcards,i=a.match.params.id,l=t.state.currentCard,s=c.filter(function(e){return e.deckid===i}),o=r.find(function(e){return e.id===n.uid}),m=o.flashcardArray?o.flashcardArray.filter(function(e){return t.findFlashcardById(e).deckid===i}):[],d=s.filter(function(e){return!m.includes(e.id)});return m.length===s.length-1&&d[0].id===s[l].id?(t.props.updateUser(s[l].id),void(window.location.href="/")):m.length!==s.length-1||m.length===s.length-1&&!m.includes(d)?(t.props.updateUser(s[l].id),t.setState(function(e){return{isFlipped:!e.isFlipped}}),void setTimeout(t.changeFc,400)):void 0},t.handleMnemonicChange=function(e){e.preventDefault(),t.setState(Object(b.a)({},e.target.id,e.target.value))},t.handleMnemonicSubmit=function(e){var a=t.props,n=a.flashcards,r=a.match.params.id,c=t.props,i=c.mnemonics,l=c.users,s=c.auth,o=t.state.currentCard,m=n.filter(function(e){return e.deckid===r});e.preventDefault();for(var d=l.find(function(e){return e.id===s.uid}),u=m[o],f="",h=0;h<i.length;++h)if(u.id===i[h].fcId&&i[h].userId===d.id){f=i[h];for(var p=0;p<d.mnemonicArr.length;p++)d.mnemonicArr[p]===f.id&&t.props.replaceMnemonic(t.state.mnemonic,f,u.id)}""===f&&t.props.addMnemonic(t.state.mnemonic,m[o].id),document.getElementById("mnemonic").value=""},t.findIndexOfFcId=function(e,a){var t=e.find(function(e){return e.id===a});return e.indexOf(t)},t.findFlashcardById=function(e){return t.props.flashcards.find(function(a){return a.id===e})},t.changeFc=function(e){var a=t.props,n=a.flashcards,r=a.match.params.id,c=a.auth,i=a.users,l=t.state,s=l.currentCard,o=l.bufferfc,m=n.filter(function(e){return e.deckid===r}),d=i.find(function(e){return e.id===c.uid});t.props.loaduser();var u=0;if(o.length>0)u=t.findIndexOfFcId(m,o[0]),o.length>1?t.setState({bufferfc:o.splice(1,o.length-1)}):t.setState({bufferfc:[]});else for(var f=!0;f;)if(u=Math.round(Math.random()*(m.length-1)),!(d.flashcardArray&&d.flashcardArray.includes(m[u].id)||u===s)){var h=m[u].radicals;if(h.length>0){for(var p=[],E=0;E<h.length;E++)d.flashcardArray&&d.flashcardArray.includes(h[E].id)||s===t.findIndexOfFcId(m,h[E].id)||p.push(h[E].id);if(p.length>0){var g=m[u];u=t.findIndexOfFcId(m,p[0]);for(var v=[],b=1;b<p.length;b++)v.push(p[b]);v.push(g.id),t.setState({bufferfc:[].concat(Object(L.a)(o),v)})}}f=!1}t.setState({currentCard:u}),document.getElementById("but1").style.backgroundColor="white",document.getElementById("but2").style.backgroundColor="white",document.getElementById("but3").style.backgroundColor="white",document.getElementById("but4").style.backgroundColor="white",document.getElementById("mnemonic").value=""},t.handleFButton=function(e){var a=t.props,n=a.flashcards,r=a.match.params.id,c=t.state.currentCard,i=n.filter(function(e){return e.deckid===r}),l=e.target.id;e.target.value===i[c].kanji?(t.setState(function(e){return{isFlipped:!e.isFlipped}}),document.getElementById(l).style.backgroundColor="rgb(121,\t196,\t154)"):e.target.value!==i[c].kanji&&(document.getElementById(l).style.backgroundColor="rgb(200,\t67,\t81)")},t.randomKanjiArray=function(){var e,a=t.props,n=a.flashcards,r=a.match.params.id,c=t.state.currentCard,i=[];if(n&&(e=n.filter(function(e){return e.deckid===r}),i.push(e[c].kanji)),e){for(;i.length<4;){var l=Math.round(Math.random()*(e.length-1));i.includes(e[l].kanji)||i.push(e[l].kanji)}return i.sort(function(){return.5-Math.random()}),i}},t.state={currentCard:0,bufferfc:[],isFlipped:!1},t}return Object(d.a)(a,e),Object(s.a)(a,[{key:"componentDidMount",value:function(){this.props.firestore.setListener({collection:"users"})}},{key:"componentWillUnmount",value:function(){this.props.firestore.unsetListener({collection:"users"})}},{key:"render",value:function(){var e=this.props,a=e.flashcards,t=e.match.params.id,n=e.auth,c=e.users,i=this.state.currentCard,l=this.props.mnemonics,s=this.randomKanjiArray();if(!n.uid)return r.a.createElement(N.a,{to:"/signin"});var o,m,d=[];if(a&&(d=a.filter(function(e){return e.deckid===t})),c&&(o=c.find(function(e){return e.id===n.uid})),c&&l){o=c.find(function(e){return e.id===n.uid});for(var u=0;u<l.length;++u)o.mnemonicArr&&d[i].id===l[u].fcId&&o.id===l[u].userId&&(m=l[u].mnemonic)}return d[i]?r.a.createElement("div",{className:"pf-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12"},r.a.createElement(P.a,{isFlipped:this.state.isFlipped,flipDirection:"horizontal"},r.a.createElement("div",{className:"pfc-card center",key:"front"},r.a.createElement("div",null,r.a.createElement("img",{className:"content",src:d[i].pictureUrl,alt:"current kanji",width:"400rem",height:"300rem"})),r.a.createElement("div",{className:"row"},r.a.createElement("button",{className:"pfc-btn",onClick:this.handleFButton,id:"but1",value:s[0]},s[0]),r.a.createElement("button",{className:"pfc-btn",onClick:this.handleFButton,id:"but2",value:s[1]},s[1])),r.a.createElement("div",{className:"row"},r.a.createElement("button",{className:"pfc-btn",onClick:this.handleFButton,id:"but3",value:s[2]},s[2]),r.a.createElement("button",{className:"pfc-btn",onClick:this.handleFButton,id:"but4",value:s[3]},s[3]))),r.a.createElement("div",{className:"pfc-card",key:"back"},r.a.createElement("div",{className:"center"},r.a.createElement("span",{className:"back-kan"}," ",d[i].kanji," "),r.a.createElement("br",null),r.a.createElement("span",{className:"back-eng"}," ",d[i].eng," "),r.a.createElement("br",null)),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col pmnemdiv"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s10 back-h left-align"},"mnemonic")),r.a.createElement("div",{className:"pmnemtext"},r.a.createElement("span",{className:"card-title"},m&&r.a.createElement("span",null,m)),r.a.createElement("span",{className:"card-title"},!m&&r.a.createElement("span",null,d[i].mnemonic))),r.a.createElement("form",{onSubmit:this.handleMnemonicSubmit},r.a.createElement("div",{className:"row center pneminput"},r.a.createElement("div",{className:"col s10 input-field inline"},r.a.createElement("input",{placeholder:"Write new mnemonic",type:"text",id:"mnemonic",onChange:this.handleMnemonicChange})),r.a.createElement("div",{className:"col s2 input-field inline right-align"},r.a.createElement("i",{onClick:this.handleMnemonicSubmit,className:"material-icons addmnembut"},"add_circle")))))),r.a.createElement("div",{className:"center back-buttons"},r.a.createElement("button",{className:"btn back-btn",onClick:this.handleHard,id:"Hard"},"Hard"),r.a.createElement("button",{className:"btn back-btn",onClick:this.handleEasy,id:"Easy"},"Easy"))))))):r.a.createElement("div",null)}}]),a}(n.Component)),G=Object(I.d)(Object(p.b)(function(e){return{flashcards:e.firestore.ordered.flashcards,auth:e.firebase.auth,mnemonics:e.firestore.ordered.mnemonics}},function(e){return{addCompletedFlashcards:function(a){return e(R(a))},updateUser:function(a){return e(U(a))},loaduser:function(){return e(function(e,a,t){(0,t.getFirestore)().collection("users").get().then(function(e){e.docs.forEach(function(e){return e.data()})})})},replaceMnemonic:function(a,t,n){return e(M(a,t,n))},addMnemonic:function(a,t){return e(F(a,t))}}}),Object(S.firestoreConnect)([{collection:"flashcards"},{collection:"decks"},{collection:"users"},{collection:"mnemonics"}]),Object(p.b)(function(e,a){return{users:e.firestore.ordered.users}}))(H),K=function(e){function a(){return Object(l.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return this.props.auth.uid?r.a.createElement(N.a,{to:"/"}):r.a.createElement("div",{className:"startpage center"},r.a.createElement("div",{className:"row tester"},r.a.createElement("div",{className:"col s12"},r.a.createElement("div",{className:"s-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m6 l5"},r.a.createElement("img",{src:"img/memjilogo.png",alt:"logo",width:"800rem"})),r.a.createElement("div",{className:"col s12 m6 l7 "},r.a.createElement("div",{className:"s-title"},"Learn Kanji with flashcards"),r.a.createElement("div",{className:"s-text"},"Memji focuses on learning kanji by learning the radicals that kanjis are built up of before the kanji itself."),r.a.createElement("br",null),r.a.createElement("a",{href:"/signup"},r.a.createElement("button",{className:"btn startpage-btn"},"Sign up")),r.a.createElement("a",{href:"/signin"},r.a.createElement("button",{className:"btn startpage-btn"},"Log in"))))))))}}]),a}(n.Component),W=Object(p.b)(function(e){return{auth:e.firebase.auth}})(K),V=(t(251),function(e){function a(){return Object(l.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"info-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12"},r.a.createElement("div",{className:"info"},r.a.createElement("h4",{className:"center-align"},"Sources and credits"),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",null,"LOGO"),"The Memji Logo is made by Kine Mentzoni."),r.a.createElement("div",{className:"col s12 m6 l6  center-align"},r.a.createElement("img",{className:"activator logoimg",src:"img/LOGO-STOR.png",alt:"Memji logo"})," ")),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",null,"PHOTOFLASHCARDS"),"All images in the photoflashcard deck called 'Fruit' are illustrated by Kine Mentzoni."),r.a.createElement("div",{className:"col s12 m6 l6 center-align"},r.a.createElement("img",{className:"activator fruitimg",src:"img/mandarin.png",alt:"Mandarin illustration"})," ")),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",null,"STROKE ORDER"),r.a.createElement("span",null,"Stroke order gifs used in some flashcards are borrowed from ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/List_of_kanji_by_concept#Numbers,_counting,_sequence",rel:"noopener noreferrer",target:"_blank"},"this website."))),r.a.createElement("div",{className:"col s12 m6 l6 center-align"},r.a.createElement("img",{className:"activator strokeorderimg",src:"img/About-penstroke.png",alt:"Stroke order"})," "))))))}}]),a}(n.Component)),z=function(e){function a(){return Object(l.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"info-content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12"},r.a.createElement("div",{className:"info"},r.a.createElement("h4",{className:"center-align"},"How to use Memji"),r.a.createElement("div",{className:"row howto-row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",{className:""},"DECKS"),"Each deck has a category and a type. The info button in the top corner of each deck shows all radicals and kanji in a deck.",r.a.createElement("br",null),r.a.createElement("b",null," Important! ")," Since the app shows radicals that a kanji are made up of before the kanji itself, the meaning of some radicals in the decks has nothing to do with the category of the deck."),r.a.createElement("div",{className:"col s12 m6 l6  center-align"},r.a.createElement("img",{className:"activator logoimg",src:"img/numdeck.png",alt:"Memji logo"})," ")),r.a.createElement("div",{className:"row howto-row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",{className:""},"FLASHCARDS - KANJI TO ENGLISH"),"On the front of the flashcards is a kanji. When hovering (on desktop) or clicking (mobile) the card will flip and the translation along with other information will be shown."),r.a.createElement("div",{className:"col s12 m6 l6  center-align"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s6 m6 l6"},r.a.createElement("img",{className:"fcimg",src:"img/fcfront.png",alt:"flashcard front"})," "),r.a.createElement("div",{className:"col s6 m6 l6"},r.a.createElement("img",{className:"fcimg",src:"img/fcback.png",alt:"flashcard back"})," ")))),r.a.createElement("div",{className:"row howto-row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",{className:""},"BUTTONS"),"If you click the easy button, the flashcard wont appear again until the deck is restarted. By clicking hard button the flashcard will reappear randomly in the deck until the easy button is clicked."),r.a.createElement("div",{className:"col s12 m6 l6  center-align"},r.a.createElement("img",{className:"activator logoimg",src:"img/buttons.png",alt:"Memji logo"})," ")),r.a.createElement("div",{className:"row howto-row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",{className:""},"MNEMONICS"),"Each flashcard has a mnemonic suggestion. By clicking the pen icon you can make your own personal mnemonic."),r.a.createElement("div",{className:"col s12 m6 l6  center-align"},r.a.createElement("img",{className:"activator logoimg",src:"img/mnembut.png",alt:"Memji logo"})," ")),r.a.createElement("div",{className:"row howto-row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",{className:""},"STROKE ORDER"),"On the back of certain flashcards, there will be a gif of how the kanji is drawn."),r.a.createElement("div",{className:"col s12 m6 l6  center-align"},r.a.createElement("img",{className:"logoimg",src:"img/strokeimg.png",alt:"Memji logo"})," ")),r.a.createElement("div",{className:"row howto-row"},r.a.createElement("div",{className:"col s12 m6 l6"},r.a.createElement("h5",{className:""},"PHOTOFLASHCARDS"),"For photoflashcards an image will appear along with four different kanji. If correct kanji is clicked, the flashcard will flip around where you will see the easy and hard buttons along with information."),r.a.createElement("div",{className:"col s12 m6 l6  center-align"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s6 m6 l6"},r.a.createElement("img",{className:"fcimg",src:"img/pfcapple.png",alt:"photoflashcard front"})," "),r.a.createElement("div",{className:"col s6 m6 l6"},r.a.createElement("img",{className:"fcimg",src:"img/pfcappleback.png",alt:"photoflashcard back"})," ")))),r.a.createElement("br",null),r.a.createElement("div",{className:"row howto-row"},r.a.createElement("div",{className:"col s12 m12 l12 center startlink"},r.a.createElement("button",{className:"btn"},r.a.createElement(g.a,{to:"/",id:"beginlink"},"Start")),r.a.createElement("br",null)))))))}}]),a}(n.Component),J=function(e){function a(){return Object(l.a)(this,a),Object(o.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(d.a)(a,e),Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement(u.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(v,null),r.a.createElement(f.a,null,r.a.createElement(h.a,{exact:!0,path:"/",component:D}),r.a.createElement(h.a,{path:"/howto",component:z}),r.a.createElement(h.a,{path:"/start",component:W}),r.a.createElement(h.a,{path:"/signin",component:w}),r.a.createElement(h.a,{path:"/signup",component:j}),r.a.createElement(h.a,{path:"/about",component:V}),r.a.createElement(h.a,{exact:!0,path:"/:id",component:x}),r.a.createElement(h.a,{exact:!0,path:"/img/:id",component:G}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var X=t(77),q={authError:null},Y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"LOGIN_ERROR":return Object(X.a)({},e,{authError:"Login failed"});case"LOGIN_SUCCESS":return Object(X.a)({},e,{authError:null});case"SIGNOUT_SUCCESS":return e;case"SIGNUP_SUCCESS":return Object(X.a)({},e,{authError:null});case"SIGNUP_ERROR":return Object(X.a)({},e,{authError:a.err.message});default:return e}},Q=t(76),$={flashcards:[],mnemonics:[]},Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$;switch((arguments.length>1?arguments[1]:void 0).type){case"ADD_COMPLETED_FLASHCARDS":case"ADD_COMPLETED_FLASHCARDS_ERROR":case"REPLACE_MNEMONIC":case"REPLACE_MNEMONIC_ERROR":case"UPDATE_MNEMONIC":case"UPDATE_MNEMONIC_ERROR":case"ADD_MNEMONIC_ARR":case"ADD_MNEMONIC_ARR_ERROR":default:return e}},ee={users:[]},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee;switch((arguments.length>1?arguments[1]:void 0).type){case"UPDATE_USER":case"UPDATE_USER_ERROR":case"update_users":case"update_users_error":default:return e}},te=Object(I.c)({auth:Y,flashcard:Z,user:ae,firestore:Q.firestoreReducer,firebase:S.firebaseReducer}),ne=t(261);t(545),t(549);O.a.initializeApp({apiKey:"AIzaSyCDQX_UAYLg44oOF40BGMT14Uk4prHJ5Hk",authDomain:"kanjiapp-8f121.firebaseapp.com",databaseURL:"https://kanjiapp-8f121.firebaseio.com",projectId:"kanjiapp-8f121",storageBucket:"kanjiapp-8f121.appspot.com",messagingSenderId:"623404513654"}),O.a.firestore().settings({});var re=O.a,ce=Object(I.e)(te,Object(I.d)(Object(I.a)(ne.a.withExtraArgument({getFirebase:S.getFirebase,getFirestore:Q.getFirestore})),Object(Q.reduxFirestore)(re),Object(S.reactReduxFirebase)(re,{useFirestoreForProfile:!0,userProfile:"users",attachAuthIsReady:!0}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));ce.firebaseAuthIsReady.then(function(){i.a.render(r.a.createElement(p.a,{store:ce},r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})})}},[[262,1,2]]]);
//# sourceMappingURL=main.a7474b90.chunk.js.map