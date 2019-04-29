import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { Dropdown, Button, Divider } from 'react-materialize'

const Navbar = (props) => {
    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
        <div>
            <nav class="transparent z-depth-0">
                <div class="nav-wrapper">
                <Link to="/" style={{color: 'white'}} activeStyle={{color: 'red'}}><img class="navlogo" src="img/LOGOLITENNY.jpg" width="70px" alt="logo" /></Link>
                
                    {/*<a href="/" class="brand-logo left"><i class="material-icons">cloud</i>MEMJI</a>*/}
                    <ul class="right">
                        <Dropdown trigger={<a class="brand-logo"><i class="material-icons md-36">menu</i></a>} options={{coverTrigger: false}}>                           
                            {links}
                        </Dropdown>
                    </ul>
                </div>
            </nav>
        </div>       
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)