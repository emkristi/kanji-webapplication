import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

class DropdownNavbar extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        }
    }
    render() {
        return (
            <div>
                <button>
                    Show menu
                </button>

                { 
                    this.state.showMenu
                    ? (
                        <div className="menu">
                            <button> Menu item 1 </button>
                            <button> Menu item 2 </button>
                            <button> Menu item 3 </button>
                        </div>
                    )
                    : (
                        null
                    )
                }
                
            </div>
        )
    }
}