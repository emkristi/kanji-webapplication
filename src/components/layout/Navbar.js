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
                    <a href="/" class="brand-logo"><i class="material-icons">cloud</i>MEMJI</a>
                    <ul class="right hide-on-med-and-down">
                        <Dropdown trigger={<a class="brand-logo"><i class="material-icons">menu</i></a>}>
                            <a href="#">
                                test
                            </a>
                                <Divider/>
                            <a href="#">
                                test
                            </a>
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